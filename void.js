document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.cta-button');
    const terminal = document.getElementById('retro-terminal');
    const rebootBtn = document.getElementById('reboot-btn');
    
    // Элементы, которые будем плавно гасить
    const layersToFade = [
        document.querySelector('.ui-wrapper'),
        document.getElementById('matrix-bg'),
        document.getElementById('canvas-container'),
        document.querySelector('.crt-overlay')
    ];

    if (btn && terminal) {
        btn.onclick = () => {
            // 1. Плавно гасим основной контент
            layersToFade.forEach(el => {
                if (el) el.classList.add('fade-out-vibe');
            });

            // 2. С небольшой задержкой проявляем терминал
            setTimeout(() => {
                layersToFade.forEach(el => {
                    if (el) el.style.display = 'none';
                });
                terminal.style.display = 'flex';
                terminal.classList.add('active');

                // 3. Запускаем поочерёдное появление соцсетей
                revealLinks();
            }, 800);
        };
    }

    if (rebootBtn && terminal) {
        rebootBtn.onclick = (e) => {
            e.preventDefault();
            terminal.classList.add('system-fade-out');
            document.body.style.backgroundColor = 'black';
            setTimeout(() => {
                window.location.reload();
            }, 1);
        };
    }
});

function revealLinks() {
    const links = document.querySelectorAll('.social-item');
    
    links.forEach((link, index) => {
        setTimeout(() => {
            link.classList.add('revealed');    
        }, index * 1000); 
    });
}

document.addEventListener('mousemove', (e) => {
    const terminal = document.querySelector('.terminal-box');
    if (terminal && terminal.parentElement.style.display === 'flex') {
        const x = (window.innerWidth / 2 - e.clientX) / 30;
        const y = (window.innerHeight / 2 - e.clientY) / 30;
        terminal.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
    }
});

function updateSystemTime() {
    const timeElement = document.getElementById('system-time');
    const dateElement = document.getElementById('system-date');
    
    if (!timeElement || !dateElement) return;

    const now = new Date();
    
    // Форматируем время
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Форматируем дату
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    dateElement.textContent = `${day}.${month}.${year}`;
}

// Запускаем обновление каждую секунду
setInterval(updateSystemTime, 1000);
updateSystemTime(); // Инициализация сразу


const ghost = document.createElement('div');
ghost.className = 'cursor-ghost';
ghost.innerHTML = '<div class="ghost-point"></div><div class="ghost-coords">0,0</div>';
document.body.appendChild(ghost);

const coordsText = ghost.querySelector('.ghost-coords');

document.addEventListener('mousemove', (e) => {
    // Задержка в 150мс создает эффект "вязкого" сигнала
    setTimeout(() => {
        ghost.style.left = `${e.clientX + 15}px`;
        ghost.style.top = `${e.clientY + 15}px`;
        coordsText.innerText = `${e.clientX},${e.clientY}`;
    }, 1);
});


