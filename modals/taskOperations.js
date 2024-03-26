import createTask from "./createTask.js";

function saveTask(modalEl) {
    // Get the FIRST input element
    const taskName = modalEl.querySelector('.add-task-input input').value;
    if (taskName) {
        const boardID = modalEl.querySelector('select').value;
        const board = this.appData.boards.find(board => board.id === boardID);

        const newTaskObject = {
            id: crypto.randomUUID(),
            text: taskName,
            boardID,
            prev: null,
            next: null
        }

        if (!board.startTaskID && !board.endTaskID) {
            board.startTaskID = newTaskObject.id;
            board.endTaskID = newTaskObject.id;
        } else if (board.startTaskID === board.endTaskID) {
            board.endTaskID = newTaskObject.id;
            const firstTask = this.appData.tasks[board.startTaskID];
            firstTask.next = newTaskObject.id;
            newTaskObject.prev = firstTask.id;
        } else {
            const lastTask = this.appData.tasks[board.endTaskID];
            lastTask.next = newTaskObject.id;
            board.endTaskID = newTaskObject.id;
            newTaskObject.prev = lastTask.id;
        }

        this.appData.tasks[newTaskObject.id] = newTaskObject;

        const taskEl = createTask(newTaskObject);
        const targetBoard = this.selectedBoard.id === boardID ?
            this.selectedBoardEl : document.getElementById(boardID);
        const targetBoardBody = targetBoard.querySelector('ul');
        targetBoardBody.appendChild(taskEl);
    }
}

function deleteTask(taskID) {
    const task = this.appData.tasks[taskID];
    const board = this.appData.boards.find(board => board.id === task.boardID);
    debugger;
    if (board.startTaskID === task.id && board.endTaskID === task.id) {
        board.startTaskID = null;
        board.endTaskID = null;
    } else if (board.startTaskID === task.id) {
        board.startTaskID = task.next;
        const nextTask = this.appData.tasks[task.next];
        nextTask.prev = null;
        task.next = null;
    } else if (board.endTaskID === task.id) {
        board.endTaskID = task.prev;
        const prevTask = this.appData.tasks[task.prev];
        prevTask.next = null;
        task.prev = null;
    } else {
        const prevTask = this.appData.tasks[task.prev];
        const nextTask = this.appData.tasks[task.next];
        prevTask.next = task.next;
        nextTask.prev = task.prev;
        task.prev = null;
        task.next = null;
    }
    delete this.appData.tasks[taskID];
}

export {
    saveTask,
    deleteTask
}