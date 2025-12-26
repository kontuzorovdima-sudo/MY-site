const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Подгоняем размер под экран
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const letters = "1234567890";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
    // Полупрозрачный фон для эффекта "шлейфа"
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(89, 18, 18, 1)"; // Цвет символов
    ctx.font = fontSize + "px Zpix";

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 70);

document.addEventListener('DOMContentLoaded', () => {
    const text = "DKVA"; // Текст, который будет напечатан
    const container = document.getElementById('typewriter'); // ID твоего h1
    let index = 0;

    function type() {
        if (index < text.length) {
            // Просто добавляем следующую букву
            container.innerHTML = text.slice(0, index + 1);
            index++;
            setTimeout(type, 750); // Скорость печати (250мс)
        }
    }

    // Запуск через полсекунды после загрузки страницы
    setTimeout(type, 200);
});


let lastX = 0;
document.addEventListener('mousemove', (e) => {
    let speed = Math.abs(e.clientX - lastX);
    if (speed > 100) { // Если мышь движется быстро
        document.body.style.filter = `hue-rotate(${speed}deg) contrast(1.2)`;
        setTimeout(() => document.body.style.filter = 'none', 50);
    }
    lastX = e.clientX;
});
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

