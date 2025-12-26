document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.cta-button');
    const terminal = document.getElementById('retro-terminal');
    
    // Элементы, которые будем плавно гасить
    const layersToFade = [
        document.querySelector('.ui-wrapper'),
        document.getElementById('matrix-bg'),
        document.getElementById('canvas-container'),
        document.querySelector('.crt-overlay') // если есть слой с полосками
    ];

    if (btn && terminal) {
        btn.onclick = () => {
            // 1. Плавно гасим основной контент
            layersToFade.forEach(el => {
                if (el) el.classList.add('fade-out-vibe');
            });

            // 2. С небольшой задержкой проявляем соцсети
            setTimeout(() => {
                terminal.classList.add('active');
            }, 300); // Начинаем проявлять, пока старое еще затухает

            // 3. Полностью отключаем старое через секунду (для оптимизации)
            setTimeout(() => {
                layersToFade.forEach(el => {
                    if (el) el.style.display = 'none';
                });
            }, 1100);
        };
    }
});

    const rebootBtn = document.getElementById('reboot-btn');
    const terminal = document.getElementById('retro-terminal');

    if (rebootBtn && terminal) 
    {
        rebootBtn.onclick = (e) => {
            e.preventDefault();

            terminal.classList.add('system-fade-out');
            document.body.style.backgroundColor = 'black';
            setTimeout(() => {
                window.location.reload();
            }, 1);
        };
    }

    document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.cta-button');
    const terminal = document.getElementById('retro-terminal');
    const mainContent = [
        document.querySelector('.ui-wrapper'),
        document.getElementById('matrix-bg'),
        document.getElementById('canvas-container')
    ];

    if (btn) {
        btn.onclick = () => {
            // 1. Уводим основной контент в блюр и тьму
            mainContent.forEach(el => { if(el) el.classList.add('fade-out-vibe'); });

            setTimeout(() => {
                // 2. Скрываем старое и показываем терминал
                mainContent.forEach(el => { if(el) el.style.display = 'none'; });
                terminal.style.display = 'flex';
                terminal.classList.add('active');

                // 3. ЗАПУСК ПООЧЕРЕДНОГО ПОЯВЛЕНИЯ
                revealLinks();
            }, 800);
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


