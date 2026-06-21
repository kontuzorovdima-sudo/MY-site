// Функция дешифровки (убедись, что она одна в void.js)
function decryptText(element) {
    const originalText = element.innerText;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#&$%@";
    let iterations = 0;
    
    const interval = setInterval(() => {
        element.innerText = originalText.split("")
            .map((char, index) => {
                if(index < iterations) return originalText[index];
                return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("");
        
        if(iterations >= originalText.length) clearInterval(interval);
        iterations += 1/3;
    }, 30);
}



// Данные бренда
const brandHistory = [
    { 
        date: "2021.11.08", 
        title: "ИНЦИДЕНТ_00: ПЕРВЫЙ_БИТ", 
        text: "В закрытом сегменте сети зафиксирован первый сигнал DKVA. Это не был проект. Это была ошибка в коде рендеринга, которая начала самовоспроизводиться. Мы поняли: хаос обладает собственной эстетикой, более честной, чем идеальные интерфейсы." 
    },
    { 
        date: "2022.05.20", 
        title: "ИНЦИДЕНТ_01: АРХИТЕКТУРНОЕ_ОТТОРЖЕНИЕ", 
        text: "Попытка встроить DKVA в стандартные дизайн-системы провалилась. Сетки ломались, цвета инвертировались. Вместо того чтобы исправлять баги, мы сделали их фундаментом. Так родилась концепция 'Брутального цифровизма'." 
    },
    { 
        date: "2023.01.12", 
        title: "ИНЦИДЕНТ_02: ИСКАЖЕНИЕ_СИГНАЛА", 
        text: "Запуск первых визуальных манифестов. Публика назвала это глитч-артом, мы назвали это 'цифровой эрозией'. Мы начали разрушать изображения, чтобы увидеть, что находится за ними. Оказалось — там только шум." 
    },
    { 
        date: "2024.09.30", 
        title: "ИНЦИДЕНТ_03: ПРАВИЛА_ЧЕЛОВЕЧЕСКОГО_ИНТЕРФЕЙСА", 
        text: "DKVA выходит за пределы мониторов. Одежда, физические артефакты, зашифрованные послания в офлайне. Мы учим материю глючить так же красиво, как это делает софт. Граница между кодом и плотью истончается." 
    },
    { 
        date: "2025.12.26", 
        title: "ИНЦИДЕНТ_04: ПОЛНАЯ_СИНХРОНИЗАЦИЯ", 
        text: "Вы здесь. ARCHIVE_01 — это не склад файлов, это зеркало. Система DKVA полностью интегрирована в ваше восприятие. Теперь каждый сбой в вашей ленте — это наше присутствие. Мы — это шум в вашей голове." 
    },
    
    { 
    date: "2025.12.26", 
    title: "ФИНАЛЬНЫЙ_ЛОГ: ОБНАРУЖЕНИЕ_ПОЛЬЗОВАТЕЛЯ", 
    text: "Обнаружено внешнее подключение. Сессия мониторится. Локация и IP-адрес синхронизированы с архивом. Поздравляем, вы стали частью DKVA. Выхода нет." 
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('history-container');
    
    if (container) {
        brandHistory.forEach((item, index) => {
            setTimeout(() => {
                const entry = document.createElement('div');
                entry.className = 'history-item';
                entry.innerHTML = `
                    <span class="history-date">[${item.date}]</span>
                    <h2 class="history-title">${item.title}</h2>
                    <p class="history-text">${item.text}</p>
                `;
                container.appendChild(entry);
                
                // Эффект появления
                setTimeout(() => entry.classList.add('visible'), 50);
                
                // Дешифровка заголовка
                const title = entry.querySelector('.history-title');
                decryptText(title);

                
                
            }, index * 1200); // Интервал между записями
        });
    }
    
    
    // Обновление системного времени
    setInterval(() => {
        const timeEl = document.getElementById('system-time');
        if(timeEl) {
            const now = new Date();
            timeEl.innerText = now.toTimeString().split(' ')[0];
        }
    }, 1000);
});

document.addEventListener('mousemove', (e) => {
    const archive = document.querySelector('.archive-main');
    if (!archive) return;

    

    // Находим центр экрана
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Вычисляем отклонение мыши от центра (от -1 до 1)
    const mouseX = (e.clientX - centerX) / centerX;
    const mouseY = (e.clientY - centerY) / centerY;

    // Настройки интенсивности наклона
    const maxRotation = 15; // Максимальный угол в градусах

    const rotateX = -mouseY * maxRotation; // Инвертируем Y для естественности
    const rotateY = mouseX * maxRotation;

    // Применяем трансформацию
    archive.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    // Дополнительный эффект: легкое смещение тени (глубина)
    archive.style.boxShadow = `
        ${-rotateY * 2}px ${rotateX * 2}px 30px rgba(139, 0, 0, 0.3),
        0 0 15px rgba(139, 0, 0, 0.2)
    `;

    // Находим заголовок или контент внутри
    const content = archive.querySelector('.archive-history');
    if (content) {
        // Смещаем контент внутри окна в противоположную сторону
        const moveX = mouseX * 10; 
        const moveY = mouseY * 10;
        content.style.transform = `translateZ(20px) translateX(${-moveX}px) translateY(${-moveY}px)`;
    }
});

    function bootArchiveSequence() {
    const container = document.getElementById('history-container');
    if (!container) return;

    // Сначала выводим техническую плашку
    const bootLog = document.createElement('div');
    bootLog.className = 'boot-log';
    bootLog.innerHTML = `> ИЗВЛЕЧЕНИЕ_ДАННЫХ_АРХИВА... <br> > ОБХОД_ШИФРОВАНИЯ... ГОТОВО.`;
    container.appendChild(bootLog);

    // Запускаем основную историю через 1 секунду
    setTimeout(() => {
        renderHistory(); // Твоя функция отрисовки истории из прошлых шагов
    }, 1000);
}

function renderHistory() {
    const container = document.getElementById('history-container');
    if (!container) return;

    brandHistory.forEach((item, index) => {
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = 'history-item visible';
            div.innerHTML = `
                <span class="history-date">[${item.date}]</span>
                <h3 class="history-title">${item.title}</h3>
                <p class="history-text">${item.text}</p>
            `;
            container.appendChild(div);
            
            // 1. Дешифровка заголовка
            const titleEl = div.querySelector('.history-title');
            decryptText(titleEl);

            // 2. Сразу вешаем эффект "Глубокого сканирования" на текст
            const textEl = div.querySelector('.history-text');
            if (textEl) {
                textEl.addEventListener('mouseenter', () => {
                    textEl.style.textShadow = '0 0 8px rgba(139,0,0,0.6)';
                });
                textEl.addEventListener('mouseleave', () => {
                    textEl.style.textShadow = 'none';
                });
            }

        }, index * 800);
    });
}



