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

// Функція для перевірки авторизації при завантаженні сторінки
function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}

// Функція для авторизованого користувача
function authorized() {
    buttonAuth.style.display = 'none';
    buttonOut.style.display = 'flex';
    userName.style.display = 'flex';
    userName.textContent = login;
    buttonCart.style.display = 'flex';

    buttonOut.addEventListener('click', logOut);
}

// Функція для неавторизованого користувача
function notAuthorized() {
    buttonAuth.style.display = 'flex';
    buttonOut.style.display = 'none';
    userName.style.display = 'none';
    userName.textContent = '';
    buttonCart.style.display = 'none';

    buttonAuth.addEventListener('click', openModal);
}

// Функція відкриття модального вікна
function openModal() {
    modalAuth.classList.add('is-open');
    loginInput.style.borderColor = ''; 
    passwordInput.style.borderColor = '';
}

// Функція закриття модального вікна
function closeModal() {
    modalAuth.classList.remove('is-open');
    logInForm.reset(); 
    loginInput.style.borderColor = ''; 
    passwordInput.style.borderColor = '';
}

// Функція авторизації
function logIn(event) {
    event.preventDefault();
    
    let isValid = true;
    
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

// Функція виходу
function logOut() {
    login = null;
    localStorage.removeItem('user');
    notAuthorized();
}

buttonAuth.addEventListener('click', openModal);
closeAuth.addEventListener('click', closeModal);
logInForm.addEventListener('submit', logIn);

checkAuth();