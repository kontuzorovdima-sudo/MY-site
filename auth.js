// Управление кнопкой авторизации на всех страницах
document.addEventListener('DOMContentLoaded', () => {
    const authLink = document.getElementById('authLink');
    if (!authLink) return;

    const currentUser = localStorage.getItem('dkvaCurrentUser');

    if (currentUser) {
        authLink.textContent = 'ВЫХОД';
        authLink.href = '#';
        authLink.onclick = (e) => {
            e.preventDefault();
            if (confirm('ВЫ УВЕРЕНЫ, ЧТО ХОТИТЕ ВЫЙТИ?')) {
                localStorage.removeItem('dkvaCurrentUser');
                window.location.reload();
            }
        };
    } else {
        authLink.textContent = 'ВОЙТИ';
        authLink.href = 'auth.html';
    }
});