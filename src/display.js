export default (function () {
  const addItemDialog = document.querySelector(".add-item-dialog");

  function showList(list) {
    const listElement = document.createElement("ul");
    const listHeader = document.createElement("h2");

    listHeader.textContent = list.title;
    listElement.appendChild(listHeader);
    listElement.classList.add("todo-list");

    for (const item of list.todoItems) {
      const itemElement = document.createElement("li");
      const itemHeader = document.createElement("h3");
      const itemParagraph = document.createElement("p");

      itemHeader.textContent = item.title;
      itemParagraph.textContent = item.description;

      itemElement.classList.add("todo-item");
      itemHeader.classList.add("todo-item__title");
      itemParagraph.classList.add("todo-item__description");

      itemElement.appendChild(itemHeader);
      itemElement.appendChild(itemParagraph);
      listElement.appendChild(itemElement);
    }

    const addItemElement = document.createElement("li");
    const addItemButton = document.createElement("button");
    const addItemHeader = document.createElement("h3");

    addItemButton.textContent = "+";
    addItemHeader.textContent = "Add task";

    addItemElement.classList.add("todo-item");
    addItemElement.classList.add("todo-item--add");
    addItemButton.classList.add("todo-item__add-button");
    addItemHeader.classList.add("todo-item__title");
    addItemHeader.classList.add("todo-item__title--add");

    addItemElement.appendChild(addItemButton);
    addItemElement.appendChild(addItemHeader);
    listElement.appendChild(addItemElement);

    const content = document.querySelector(".content");
    content.replaceChildren(listElement);
  }

  function showNewItemDialog() {
    addItemDialog.showModal();
  }

  function closeNewItemDialog() {
    addItemDialog.close();
  }

  return { showList, showNewItemDialog, closeNewItemDialog };
})();
