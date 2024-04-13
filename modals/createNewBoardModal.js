function createBoardsModal(closeModal, state) {
    const modalContainer = document.createElement("article");
    modalContainer.setAttribute("class", "board-modal");

    modalContainer.append(
        createBoardTitleSection(),
        createBoardInputSection("Board Name"),
        createBoardInputSection("Description"),
        createColorSelectionSection(["red", "blue", "green", "yellow", "cyan"]),
        createButtonSection(closeModal, state)
    );
    return modalContainer;
}

function createBoardTitleSection() {
    const section = document.createElement("section");
    const h1 = document.createElement("h1");
    h1.classList.add("add-board-title");
    h1.append(document.createTextNode("Add Board"));
    section.appendChild(h1);
    return section;
}

function createBoardInputSection(inputLabel) {
    const section = document.createElement("section");
    section.classList.add("add-board-input");

    const label = document.createElement("label");
    label.append(document.createTextNode(inputLabel));
    const input = document.createElement("input");

    section.append(label, input);
    return section;
}

function createColorSelectionSection(colorOptions) {
    const colorSectionElement = document.createElement("section");
    colorSectionElement.classList.add("add-board-color");

    const title = document.createElement("h2");
    title.append(document.createTextNode("Choose Board Color"));

    const colorOptionsContainer = document.createElement("div");
    colorOptionsContainer.classList.add("board-color-options");

    for (const color of colorOptions) {
        colorOptionsContainer.appendChild(createColorOptionButton(color));
    }

    const customColorContainer = document.createElement("span");
    customColorContainer.setAttribute("id", "custom-color");
    const customColorInput = document.createElement("input");
    customColorInput.setAttribute("type", "color");
    customColorContainer.append(customColorInput);
    colorOptionsContainer.append(customColorContainer);

    colorSectionElement.append(title, colorOptionsContainer);
    return colorSectionElement;
}

function createColorOptionButton(color) {
    const colorOuterSpan = document.createElement("span");
    colorOuterSpan.classList.add("color-option");
    const colorSpan = document.createElement("span");
    colorSpan.style.backgroundColor = color;
    colorOuterSpan.appendChild(colorSpan);
    return colorOuterSpan;
}

function createButtonSection(closeModal, state) {
    const btnContainer = document.createElement("section");
    btnContainer.classList.add("add-board-buttons");

    btnContainer.append(
        createBtn("save", () => saveBoard(closeModal, state)),
        createBtn("cancel", () => cancelHandler(closeModal))
    );
    return btnContainer;
}

function createBtn(text, clickHandler) {
    const btn = document.createElement("button");
    btn.setAttribute("id", text);
    btn.addEventListener("click", clickHandler);
    btn.append(document.createTextNode(text));
    return btn;
}

function createCustomBtn() {}

function saveBoard(closeModal, state) {
    debugger;
    const boardModalEl = document.querySelector("article.board-modal");
    if (boardModalEl) {
        const inputEls = boardModalEl.querySelectorAll(
            "section.add-board-input input"
        );
        if (inputEls[0]) {
            const boardObject = {
                id: crypto.randomUUID(),
                name: inputEls[0].value,
                description: inputEls[1].value,
                color: "--opt1",
                startTaskID: null,
                endTaskID: null,
            };
        }

        closeModal();
    }
}

function cancelHandler(closeModal) {
    closeModal();
}

export default createBoardsModal;
