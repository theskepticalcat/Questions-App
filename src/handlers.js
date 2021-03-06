//Вспомогательные методы:

export function isValid(value) {
    return value.length >= 10;
}

//Метод создания модального окна:
export function createModal(title, content) {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('overlay');
    
    document.body.append(modalOverlay);

    const modal = modalOverlay.appendChild(document.createElement('div'));
    modal.classList.add('modal');
    document.body.classList.add('no-scroll');

    const modalHtml = `
    <h1>${title}</h1>
    <div class="modal-content">${content}</div>
    `;
    modal.innerHTML = modalHtml;

    //Убираем маску:
    modalOverlay.addEventListener('click', event => {
        if (event.target.classList.contains('overlay')) {
            document.body.removeChild(modalOverlay);
            document.querySelector('.allBtn').classList.remove('allBtnFocus');
        }
    })
}