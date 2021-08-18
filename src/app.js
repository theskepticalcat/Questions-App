import { createModal, isValid } from './handlers';
import { Question } from './question';
import { getAuthForm, authWithEmailAndPass } from './authentification';
import './style.scss';

//Элементы формы:
const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn');
const label = document.querySelector('.askme');


//Добавление стиля для плэйсхолдэра в инпуте:
input.addEventListener('click', () => {
    label.classList.add('askmeHover');
})

//Обрабатываем форму:
form.addEventListener('submit', submitFormHandler);

input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value); //если поле не валидно -> кнопка заблокирована
});

//Приложение готово -> рендерится список из LocalStorage:
window.addEventListener('load', Question.renderList);

//Открытие модалки по кнопке ВСЕ:
modalBtn.addEventListener('click', openModal);


//Обработчик сабмита в форме:
function submitFormHandler(event) {
    event.preventDefault();

    if(isValid(input.value)) {
        const question = {  //формируем об-кт вопроса
            text: input.value.trim(),
            date: new Date().toJSON()
        };

        submitBtn.disabled = true; //блокируем кнопку
        
        //Асинхронный запрос на сервер для сохранения вопроса:
        setTimeout(() => {
            Question.create(question);
            setTimeout(() => {  //когда запрос выполнен ->
                input.value = '';
                submitBtn.disabled = false;
                label.classList.remove('askmeHover');
            }, 2000);
        }, 2000);
    }
}


//Создание модального окна:
function openModal() {
    createModal('Autorization', getAuthForm());
    modalBtn.classList.add('allBtnFocus');

    document.getElementById('auth-form') 
    .addEventListener('submit', authFormHandler, {once: true});  //событие для кнопки
}


//Логика по авторизации:
function authFormHandler(event) {
    event.preventDefault();

    const btn = event.target.querySelector('button');

    //Получаем email и password из инпутов:
    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;
    btn.disabled = true;  //чтобы не спамить

    authWithEmailAndPass(email, password)  //ф-ция авторизации -> получает idToken польз-ля
    .then(Question.fetch)  //-> получаем список вопросов из базы
    .then(renderModalAfterAuth)  //рендер модалки
    .then(() => btn.disabled = false)  //если ошибка -> разблокируем кнопку
}


//Рендер модального окна после авторизации:
function renderModalAfterAuth(content) {
    if (typeof content === 'string') {  //если некорректные данные -> строчка, а когда корректные -> массив
        createModal('Ошибка!', content);
        
    } else {
        createModal('Список вопросов:', Question.listToHTML(content)); //контент спривести к списку -> listToHTML()
    }
}