document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const copyBtn = document.getElementById('copyBtn');
    const output = document.getElementById('output');
    const status = document.getElementById('status');
    
    let recognition = null;
    let isRecording = false;

    // 检查浏览器支持
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'zh-CN'; // 设置语言为中文
    } else {
        status.textContent = '您的浏览器不支持语音识别功能';
        startBtn.disabled = true;
        return;
    }

    // 处理语音识别结果
    recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        if (finalTranscript) {
            const p = document.createElement('p');
            p.textContent = finalTranscript;
            output.appendChild(p);
            output.scrollTop = output.scrollHeight;
        }
    };

    // 错误处理
    recognition.onerror = (event) => {
        status.textContent = `错误: ${event.error}`;
    };

    // 开始/停止录音
    startBtn.addEventListener('click', () => {
        if (!isRecording) {
            recognition.start();
            isRecording = true;
            startBtn.classList.add('recording');
            startBtn.innerHTML = `
                <svg class="mic-icon" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
                停止录音
            `;
            status.textContent = '正在录音...';
        } else {
            recognition.stop();
            isRecording = false;
            startBtn.classList.remove('recording');
            startBtn.innerHTML = `
                <svg class="mic-icon" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
                开始录音
            `;
            status.textContent = '录音已停止';
        }
    });

    // 复制文字功能
    copyBtn.addEventListener('click', () => {
        const text = output.innerText;
        navigator.clipboard.writeText(text).then(() => {
            copyBtn.classList.add('copy-success');
            copyBtn.innerHTML = `
                <svg class="copy-icon" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
                已复制
            `;
            setTimeout(() => {
                copyBtn.classList.remove('copy-success');
                copyBtn.innerHTML = `
                    <svg class="copy-icon" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                    </svg>
                    复制文字
                `;
            }, 2000);
        });
    });
}); 