function saveBoard() {
    const overlayEl = document.querySelector('.overlay');
    const boardModalEl = document.querySelector('article.board-modal');
    if (boardModalEl) {
        const inputEls = boardModalEl.querySelectorAll('section.add-board-input input');
        if (inputEls[0]) {
            const boardObject = {
                "id": crypto.randomUUID(),
                "name": inputEls[0].value,
                "description": inputEls[1].value,
                "color": "--opt1",
                "startTaskID": null,
                "endTaskID": null
            }
        }
        overlayEl.style.display = 'none';
    }
}

function cancelHandler() {
    const overlayEl = document.querySelector('.overlay');
    overlayEl.style.display = 'none'
}

export {
    saveBoard,
    cancelHandler
}