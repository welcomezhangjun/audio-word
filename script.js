let recognition;
let isRecording = false;

// 初始化语音识别
function initSpeechRecognition() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'zh-CN';
    recognition.continuous = true;  // 持续识别
    recognition.interimResults = true;  // 实时返回结果
    
    // 当有识别结果时
    recognition.onresult = (event) => {
        const output = document.getElementById('output');
        let interimTranscript = '';
        let finalTranscript = '';

        // 处理所有识别结果
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                // 对最终结果添加标点符号
                finalTranscript += addPunctuation(transcript);
            } else {
                interimTranscript += transcript;
            }
        }

        // 更新显示内容
        if (finalTranscript) {
            if (output.innerText) {
                output.innerText += ' ' + finalTranscript;
            } else {
                output.innerText = finalTranscript;
            }
        }
        
        // 显示临时结果
        const tempOutput = document.getElementById('tempOutput');
        if (tempOutput) {
            tempOutput.innerText = interimTranscript;
        }
    };

    // 错误处理
    recognition.onerror = (event) => {
        console.error('语音识别错误:', event.error);
        updateStatus('发生错误: ' + event.error);
    };
}

// 添加标点符号的函数
function addPunctuation(text) {
    // 简单的标点规则
    let result = text.trim();
    
    // 在句子结尾添加句号
    if (!/[。！？，：；]$/.test(result)) {
        result += '。';
    }
    
    // 在停顿处添加逗号（这里使用简单的规则，实际应用中可能需要更复杂的算法）
    result = result.replace(/([，。！？])\s*/g, '$1 ');
    
    return result;
}

// 更新状态显示
function updateStatus(message) {
    const status = document.getElementById('status');
    status.textContent = message;
}

// 开始/停止录音
function toggleRecording() {
    if (!recognition) {
        initSpeechRecognition();
    }

    const startBtn = document.getElementById('startBtn');
    
    if (!isRecording) {
        // 开始录音
        recognition.start();
        isRecording = true;
        startBtn.innerHTML = `
            <svg class="mic-icon recording" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
            停止录音
        `;
        updateStatus('正在录音...');
    } else {
        // 停止录音
        recognition.stop();
        isRecording = false;
        startBtn.innerHTML = `
            <svg class="mic-icon" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
            开始录音
        `;
        updateStatus('录音已停止');
    }
}

// 复制文字
function copyText() {
    const output = document.getElementById('output');
    if (output.innerText) {
        navigator.clipboard.writeText(output.innerText)
            .then(() => {
                updateStatus('文字已复制到剪贴板');
                setTimeout(() => updateStatus(isRecording ? '正在录音...' : '准备就绪'), 2000);
            })
            .catch(err => {
                console.error('复制失败:', err);
                updateStatus('复制失败');
            });
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 添加临时结果显示区域
    const textContainer = document.querySelector('.text-container');
    const tempOutput = document.createElement('div');
    tempOutput.id = 'tempOutput';
    tempOutput.className = 'temp-output';
    textContainer.appendChild(tempOutput);

    // 绑定按钮事件
    document.getElementById('startBtn').addEventListener('click', toggleRecording);
    document.getElementById('copyBtn').addEventListener('click', copyText);
}); 