const hiddenContainer = document.querySelector('.hidden');
const lockIcon = hiddenContainer.querySelector('.hidden .lock-icon');
const deleteIcon = hiddenContainer.querySelector('.hidden .delete-icon');

function createTask(task) {
    const taskContainer = document.createElement("li");
    taskContainer.setAttribute('id', task.id);
    taskContainer.classList.add("task");
    taskContainer.setAttribute("draggable", false);

    const taskTextContainer = document.createElement('span');
    taskTextContainer.classList.add('task-text');
    const taskText = document.createTextNode(task.text);
    taskTextContainer.appendChild(taskText);

    const iconsContainer = document.createElement('span');
    iconsContainer.classList.add('task-icons');

    const taskLockIcon = lockIcon.cloneNode(true);
    const taskDeleteIcon = deleteIcon.cloneNode(true);

    iconsContainer.append(taskDeleteIcon, taskLockIcon);
    taskContainer.append(taskTextContainer, iconsContainer);

    return taskContainer;
}

export default createTask;