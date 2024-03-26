const hiddenContainer = document.querySelector('.hidden');
const addIcon = hiddenContainer.querySelector('.hidden .add-icon');
const settingsIcon = hiddenContainer.querySelector('.hidden .settings-icon');
const root = document.documentElement;
const style = getComputedStyle(root);

function createBoard(board) {
    const boardContainer = document.createElement('article');
    boardContainer.classList.add('board');
    boardContainer.setAttribute('id', board.id);
    const boardColor = style.getPropertyValue(board.color);
    if (boardColor) boardContainer.style.backgroundColor = boardColor;

    const boardTasks = document.createElement('ul');
    boardTasks.classList.add('tasks');

    boardContainer.append(createBoardHeader(board), boardTasks);
    return boardContainer;
}

function createBoardHeader(board) {
    const boardHeaderContainer = document.createElement('section');
    boardHeaderContainer.classList.add('board-header');
    boardHeaderContainer.style.backgroundColor = `darken(red, 20%)`;

    const boardTitle = document.createElement('h1');
    boardTitle.classList.add('board-title');
    boardTitle.appendChild(document.createTextNode(board.name));

    const iconsContainer = document.createElement('span');
    iconsContainer.classList.add('board-icons');
    const boardAddIcon = addIcon.cloneNode(true);
    const boardSettingsIcon = settingsIcon.cloneNode(true);

    iconsContainer.append(boardAddIcon, boardSettingsIcon);
    boardHeaderContainer.append(boardTitle, iconsContainer);

    return boardHeaderContainer;
}

export default createBoard;