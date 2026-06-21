document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.cta-button');
    const terminal = document.getElementById('retro-terminal');
    const rebootBtn = document.getElementById('reboot-btn');
    
    const layersToFade = [
        document.querySelector('.ui-wrapper'),
        document.getElementById('matrix-bg'),
        document.getElementById('canvas-container'),
        document.querySelector('.crt-overlay')
    ];

    if (btn && terminal) {
        btn.onclick = () => {
            layersToFade.forEach(el => {
                if (el) el.classList.add('fade-out-vibe');
            });

            setTimeout(() => {
                layersToFade.forEach(el => {
                    if (el) el.style.display = 'none';
                });
                terminal.style.display = 'flex';
                terminal.classList.add('active');
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

// ========== КУРСОР-ПРИЗРАК (ПК + ТЕЛЕФОН) ==========

const ghost = document.createElement('div');
ghost.className = 'cursor-ghost';
ghost.innerHTML = '<div class="ghost-point"></div><div class="ghost-coords">0,0</div>';
document.body.appendChild(ghost);

const coordsText = ghost.querySelector('.ghost-coords');

// ПК — мышь
document.addEventListener('mousemove', (e) => {
    ghost.style.left = `${e.clientX + 15}px`;
    ghost.style.top = `${e.clientY + 15}px`;
    coordsText.innerText = `${e.clientX},${e.clientY}`;
});

// Телефон — касание
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    ghost.style.left = `${touch.clientX + 15}px`;
    ghost.style.top = `${touch.clientY + 15}px`;
    coordsText.innerText = `${Math.round(touch.clientX)},${Math.round(touch.clientY)}`;
}, { passive: true });

document.addEventListener('touchstart', () => {
    ghost.style.opacity = '1';
}, { passive: true });

document.addEventListener('touchend', () => {
    ghost.style.opacity = '0';
}, { passive: true });

// На ПК ghost виден всегда
ghost.style.opacity = '1';

// ========== ЧАСЫ ==========

function updateSystemTime() {
    const timeElement = document.getElementById('system-time');
    const dateElement = document.getElementById('system-date');
    
    if (!timeElement || !dateElement) return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    dateElement.textContent = `${day}.${month}.${year}`;
}

setInterval(updateSystemTime, 1000);
updateSystemTime();