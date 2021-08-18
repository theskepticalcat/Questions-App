//Сущности и логика вопросов:


export class Question {

    static create(question) {  //формирование вопроса и запись в БД:
        return fetch('https://ask-me-a-queastions-app-default-rtdb.firebaseio.com/questions.json', { //name.json - название бд
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            question.id = response.name;
            return question;
        })
        .then(addToLocalStorage) //Добавляем в LS
        .then(Question.renderList) //Рендерим вопрос
    }

    //Получить список всех вопросов:
    static renderList() {
        const questions = getQuestionsFromLS();

        const html = questions.length 
        ? questions.map(toCard).join('') //Каждый об-кт трансформируем
        : `<div class="/">You didn't ask anything</div>`;

        const list = document.getElementById('list');
        list.innerHTML = html;
    }

    static fetch(token) {  //получаем список всех вопросов:
        if(!token) {  //когда токена нет
            return Promise.resolve('<p class="error">У Вас нет авторизации</p>');
        }

        return fetch(`https://ask-me-a-question-app-default-rtdb.asia-southeast1.firebasedatabase.app/questions.json?auth=${token}`)
        .then(response => response.json())
        .then(response => {
            if(response && response.error) {  //если в ответе error
                return `<p class="error">${response.error}</p>`;
            }

            return response ? Object.keys(response).map(key => ({  //трансформируем массив в новый массив
                ...response[key],
                id: key
            })) : [];  //если в response null -> пустой массив
        })
    }

    //Рендер списка вопросов:
    static listToHTML(questions) {
        return questions.length
        ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
        : '<p>Вопросов пока нет</p>'
    }
}


//Добавление вопросов в Local Storage:
function addToLocalStorage(question) {
    const all = getQuestionsFromLS();
    all.push(question);
    localStorage.setItem('questions', JSON.stringify(all));
}

//Получение вопросов из Local Storage:
function getQuestionsFromLS() {
    return JSON.parse(localStorage.getItem('questions') || '[]');
}

//Метод для трансформации блока с фопросом:
function toCard(question) {
    return `
    <div class="card">
    <div class="card-time">
    ${new Date(question.date).toLocaleDateString()}
    ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>${question.text}</div>
    </div>
    <br>`
}