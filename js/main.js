const buttonAuth = document.querySelector('.button-auth');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const buttonCart = document.querySelector('.button-cart');

let login = localStorage.getItem('user');

function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}

function authorized() {
    buttonAuth.style.display = 'none';
    buttonOut.style.display = 'flex';
    userName.style.display = 'flex';
    userName.textContent = login;
    buttonCart.style.display = 'flex';

    buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
    buttonAuth.style.display = 'flex';
    buttonOut.style.display = 'none';
    userName.style.display = 'none';
    userName.textContent = '';
    buttonCart.style.display = 'none';

    buttonAuth.addEventListener('click', openModal);
}

function openModal() {
    modalAuth.classList.add('is-open');
    // Прибираємо смугу прокрутки при відкритті модального вікна
    document.body.style.overflow = 'hidden';
    // Скидаємо колір рамки при відкритті
    loginInput.style.borderColor = '';
    passwordInput.style.borderColor = '';
}

function closeModal() {
    modalAuth.classList.remove('is-open');
    // Відновлюємо смугу прокрутки при закритті модального вікна
    document.body.style.overflow = '';
    logInForm.reset();
    // Скидаємо колір рамки при закритті
    loginInput.style.borderColor = '';
    passwordInput.style.borderColor = '';
}

function logIn(event) {
    event.preventDefault();
    
    let isValid = true;
    
    // Перевірка полів на заповненість
    if (!loginInput.value.trim()) {
        loginInput.style.borderColor = '#ff0000';
        isValid = false;
    } else {
        loginInput.style.borderColor = '';
    }
    
    if (!passwordInput.value.trim()) {
        passwordInput.style.borderColor = '#ff0000';
        isValid = false;
    } else {
        passwordInput.style.borderColor = '';
    }
    
    if (isValid) {
        login = loginInput.value;
        localStorage.setItem('user', login);
        closeModal();
        authorized();
    }
}

function logOut() {
    login = null;
    localStorage.removeItem('user');
    notAuthorized();
}

// Закриття модального вікна при кліку поза ним
function handleModalClick(event) {
    const modalDialog = event.target.closest('.modal-dialog-auth');
    const closeAuthButton = event.target.closest('.close-auth');
    if (!modalDialog && !closeAuthButton && modalAuth.classList.contains('is-open')) {
        closeModal();
    }
}

buttonAuth.addEventListener('click', openModal);
closeAuth.addEventListener('click', closeModal);
logInForm.addEventListener('submit', logIn);
modalAuth.addEventListener('click', handleModalClick);

checkAuth();