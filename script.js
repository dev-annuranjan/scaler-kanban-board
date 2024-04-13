import data from "./data/data.json" assert { type: "json" };

import createBoard from "./modals/createBoard.js";
import createBoardsModal from "/modals/createNewBoardModal.js";
import createTask from "/modals/createTask.js";
import createTaskModal from "/modals/createNewTaskModal.js";

import { BTN_KEYS, PRESET_COLORS } from "/data/constKeys.js";
import { saveTask, deleteTask } from "/modals/taskOperations.js";

const containerEl = document.querySelector(".boards-container");
const addBoardIcon = document.querySelector(".add-icon-container");
const boardsContainer = document.querySelector(".boards-container");
const overLayEl = document.querySelector(".overlay");
const modal = overLayEl.querySelector(".modal");

const state = {
  appData: { boards: [], tasks: {} },
  selectedBoard: "",
  draggingTask: "",
  draggedOverBoard: "",
  dragging_center: 0,
  insertPosition: {
    before: 0,
    after: 1,
  },
};

addBoardIcon.addEventListener("click", handleAddBoardIcon);

function handleAddBoardIcon() {
  if (modal.children.length === 0) {
    modal.appendChild(
      createBoardsModal(closeModal.bind(this), updateAppData.bind(this))
    );
    overLayEl.style.display = "block";
  }
}

function init() {
  // Hydrating App
  state.appData = data;

  // Setting preset colors in CSS
  const root = document.documentElement;
  for (const color in PRESET_COLORS) {
    root.style.setProperty(color, PRESET_COLORS[color]);
  }

  // Creating Boards
  const { boards } = state.appData;
  const boardsFragment = document.createDocumentFragment();
  for (const board of boards) {
    const boardEl = createBoard(board);

    let taskID = board.startTaskID;
    let task = state.appData.tasks[taskID];
    if (task) {
      const boardBody = boardEl.querySelector("ul");
      while (task) {
        const taskEl = createTask(task);
        boardBody.appendChild(taskEl);
        task = state.appData.tasks[task.next];
      }
    }
    boardsFragment.appendChild(boardEl);
  }

  boardsContainer.appendChild(boardsFragment);
  containerEl.addEventListener("click", handleContainerClick);
}

function handleContainerClick(event) {
  const targetEl = event.target;
  if (targetEl.closest(".add-icon")) {
    const targetBoard = targetEl.closest(".board");
    const boardID = targetBoard.getAttribute("id");

    const boardData = state.appData?.boards?.find(
      (board) => board.id === boardID
    );
    state.selectedBoard = boardData;
    state.selectedBoardEl = targetBoard;

    const taskModal = createTaskModal(boardData, state.appData.boards);
    taskModal.addEventListener("click", handleModalClick);
    const firstInput = taskModal.querySelector("input");
    modal.appendChild(taskModal);
    overLayEl.style.display = "block";
    firstInput.focus();
  } else if (targetEl.closest(".settings-icon")) {
    alert("settings clicked");
  } else if (targetEl.closest(".delete-icon")) {
    const targetTask = targetEl.closest(".task");
    const taskID = targetTask.getAttribute("id");
    targetTask.remove();
    deleteTask.call(state, taskID);
    console.log(state);
    alert("delete clicked");
  } else if (targetEl.closest(".lock-icon")) {
    const targetTask = targetEl.closest(".task");
    targetTask.setAttribute("draggable", "true");

    const lockIcon = targetTask.querySelector(".lock-icon");
    const iconContainer = lockIcon.parentElement;
    lockIcon.remove();
    iconContainer.appendChild(
      document.querySelector(".hidden .unlock-icon")?.cloneNode(true)
    );
    alert("task unlocked");
  } else if (targetEl.closest(".unlock-icon")) {
    const targetTask = targetEl.closest(".task");
    targetTask.setAttribute("draggable", "false");

    const lockIcon = targetTask.querySelector(".unlock-icon");
    const iconContainer = lockIcon.parentElement;
    lockIcon.remove();
    iconContainer.appendChild(
      document.querySelector(".hidden .lock-icon")?.cloneNode(true)
    );
    alert("task locked");
  }
}

function handleModalClick(event) {
  const targetEl = event.target;
  if (targetEl.id) {
    switch (targetEl.id) {
      case BTN_KEYS.saveTask:
        handleSaveTask(event);
        break;
      case BTN_KEYS.saveBoard:
        handleCancelTask(event);
        break;
      case BTN_KEYS.cancelTask:
      case BTN_KEYS.cancelBoard:
        closeModal();
        break;
      default:
    }
  }
}

function handleSaveTask() {
  saveTask.call(state, modal);
  cleanUpAfterModal();
  closeModal();
}

function handleCancelTask() {
  closeModal();
}

function cleanUpAfterModal() {
  state.selectedBoardEl = "";
  state.selectedBoard = "";
}

function closeModal() {
  modal.innerHTML = "";
  overLayEl.style.display = "none";
}

function updateAppData(appData) {
  state.appData = appData;
}

init();

// function handleAddTaskIcon() {
//     const head = document.querySelector('head');
//     head.append(getStyleSheetElement('/assets/stylesheets/newTaskModal.css'));
//
//     overLayEl.style.display = 'block';
//     modal.append(createTaskModal());
// }

// #region Add Task Item
// addTaskBtnEl.addEventListener("click", () => {
//     console.log(crypto.randomUUID())
//     const taskItemText = prompt("Enter the task: ");
//     if (taskItemText) {
//         const p = document.createElement("p");
//         p.classList.add("task");
//         p.setAttribute("draggable", true);
//         const textNode = document.createTextNode(taskItemText);
//
//         const icon = settingIcon.cloneNode(true);
//         icon.classList.add('myCustomStyle');
//
//         p.append(textNode, icon);
//         todoBoardEl.appendChild(p);
//     }
// });

// #endregion

// containerEl.addEventListener("dragover", handleDragOver);
// containerEl.addEventListener("drop", handleDropOver);
// containerEl.addEventListener("drag", handleDrag);
// addEventListener("drag", (event) => {
// });
// containerEl.addEventListener("dragstart", handleDragStartTask);
// containerEl.addEventListener("dragend", handleDragEndTask);

// function handleDragOver(e) {
//     console.log('dragged over&&&&&&&&')
//     state.draggedOverBoard = e.target;
//     console.log(e.target)
//     e.preventDefault();
// }

// function handleDropOver(e) {
//     console.log("dropped");
//
//     if (e.target.classList.contains('board')) {
//         let {draggingTask, draggedOverBoard} = state;
//         const targetBoard = e.target;
//         draggingTask.classList.remove("draggedTask");
//         const closestElement = getClosestElement(targetBoard, draggingTask);
//         console.log(`**** closest element ****`);
//         console.log(closestElement)
//         if (closestElement) {
//             closestElement.element.insertAdjacentElement(
//                 closestElement.position === state.insertPosition.before ?
//                     "beforebegin" : "afterend", draggingTask
//             );
//         } else {
//             targetBoard.appendChild(draggingTask)
//         }
//
//         draggingTask = "";
//         draggedOverBoard = "";
//     }
//
// }

// function handleDrag(e) {
//     state.dragging_center = e.clientTop + (e.clientHeight >> 1);
// }

// function handleDragStartTask(e) {
//     if (e.target.className === "task") {
//         console.log("start draggingTask");
//         state.draggingTask = e.target;
//         e.target.classList.add("draggedTask");
//         state.startBoard = e.target.parentElement;
//     }
// }

// function handleDragEndTask(e) {
//     console.log("drag end");
//
//     console.log(state);
// }

//#endregion

// function getClosestElement(board, droppedTask) {
//     const dropped_y = state.dragging_center;
//     // console.log(`dropped_y ${dropped_y}`);
//
//     const boardTasks = board.querySelectorAll('.task');
//     if (boardTasks.length === 0) {
//         return "";
//     }
//
//     let closest = Number.MAX_VALUE;
//     let closestElement = undefined;
//     let closest_y;
//
//     for (const task of boardTasks) {
//         const task_y = getMidPointOfElement(task);
//         console.log("#########################")
//         console.log(task)
//         console.log(`task_y ${task_y}`);
//         const distance = Math.abs(dropped_y - task_y);
//         console.log(`distance: ${distance}`);
//         if (distance < closest) {
//
//             closest = distance;
//             closestElement = task;
//             closest_y = task_y;
//         }
//     }
//
//     return {
//         element: closestElement,
//         position: closest_y > dropped_y ? state.insertPosition.before : state.insertPosition.after
//     }
// }

// function getMidPointOfElement(element) {
//     const rect = element.getBoundingClientRect();
//     return Math.floor((rect.top + rect.bottom) / 2);
// }

// function createBoard() {
//     <div id="todo-board" className="board">
//     </div>
// }
