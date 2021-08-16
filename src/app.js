import { isValid } from './handlers';
import { Question } from './question';
import './style.scss';

//Элементы формы:
const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn');
const label = document.querySelector('.askme');


//Изменения стилей в кнопке All:
modalBtn.addEventListener('click', () => {
    modalBtn.classList.add('allBtnFocus');
})
modalBtn.addEventListener('mouseout', () => {
    modalBtn.classList.remove('allBtnFocus');
})
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