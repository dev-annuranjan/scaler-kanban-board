import {BTN_KEYS} from "/data/constKeys.js";

function createTaskModal(board, boards) {
    const article = document.createElement('article');
    article.classList.add('task-modal');

    article.append(
        createTaskTitleSection(),
        createTaskNameSection(),
        createTaskBoardSection(board, boards),
        createButtonSection()
    );
    return article;
}

function createTaskTitleSection() {
    const section = document.createElement('section');
    const h1 = document.createElement('h1');
    h1.classList.add('add-task-title');
    h1.append(document.createTextNode('Add Task'));
    section.appendChild(h1);
    return section;
}

function createTaskNameSection() {
    const section = document.createElement('section');
    section.classList.add('add-task-input');

    const label = document.createElement('label');
    label.append(document.createTextNode('Task'));
    const input = document.createElement('input');

    section.append(label, input);
    return section;
}

function createTaskBoardSection(selectedBoard, boards) {
    const section = document.createElement('section');
    section.classList.add('add-task-input');

    const label = document.createElement('label');
    label.append(document.createTextNode('Board'));
    const select = document.createElement('select');

    for (const board of boards) {
        const option = document.createElement('option');
        option.setAttribute('value', board.id);
        if (board.id === selectedBoard.id) option.setAttribute('selected', '');
        option.append(document.createTextNode(board.name));
        select.append(option);
    }

    section.append(label, select);
    return section;
}

function createButtonSection() {
    const section = document.createElement('section');
    section.classList.add('add-task-btns');

    section.append(
        createButton('save', BTN_KEYS.saveTask),
        createButton('cancel', BTN_KEYS.cancelTask)
    );
    return section;
}

function createButton(btnLabel, btnId) {
    const span = document.createElement('span');
    const button = document.createElement('button');
    button.setAttribute('id', btnId);
    button.appendChild(document.createTextNode(btnLabel));
    span.appendChild(button);
    return span;
}

export default createTaskModal;