//Сущности и логика вопросов:


export class Question {
    //Формирование вопроса и запись в БД:
    static create(question) {
        fetch('https://ask-me-a-question-app-default-rtdb.asia-southeast1.firebasedatabase.app/name.json', { //name.json - название бд
            method: 'POST', //создание об-кта
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
    <div class="/">
    ${new Date(question.date).toLocaleDateString()}
    ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>${question.text}</div>
    <br>`
}