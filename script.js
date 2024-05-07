const todoList = document.querySelector('.todo-list');
const completedList = document.querySelector('.completed-list');
const newItemForm = document.querySelector('.add-form');
const newItemTitle = newItemForm.querySelector('.add-form-input');
const taskTemplate = document.querySelector('#task-template').content;
const newItemTemplate = taskTemplate.querySelector('.todo-list-item');

dataRestore();

const completedDelBtn = document.querySelector('.delete-completed-button');
completedDelBtn.addEventListener('click', function(){
    let completedListItems = completedList.children; 
    for (let i = 0; i = completedListItems.length;) {
        completedListItems[0].remove(); 
    }
});

function addTaskHandler (item) {
    const checkbox = item.querySelector('.complete-item');
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            let temp = item.cloneNode(true);
            addTaskHandler(temp);
            item.remove();
            completedList.appendChild(temp);
          } else {
            let temp = item.cloneNode(true);
            addTaskHandler(temp);
            item.remove();
            todoList.appendChild(temp);
          }
    });

    const delBtn = item.querySelector('.delete-item');
    delBtn.addEventListener('click', function() {
        item.remove();
    });

    const newListBtn = document.querySelector('.new-list-button');
    newListBtn.addEventListener('click', function() {
        item.remove();
    });
};

function refreshLocalStorage () {
    const myElement = {
        todo: String,
        property: Boolean,
        id: Date()
    };
    const myArray = JSON.parse(localStorage.getItem('key')) === null ? [] : JSON.parse(localStorage.getItem('key'));
    //console.log(JSON.stringify(myArray));
    let myArrayResult = [];
    myElement.todo = newItemTitle.value;
    myElement.property = false;
    myElement.id = Date();
    //console.log(JSON.stringify(myElement));
    myArray.push(myElement);
    //console.log(JSON.stringify(myArray));
    localStorage.setItem('key', JSON.stringify(myArray));
    myArrayResult = JSON.parse(localStorage.getItem('key'));
    //console.log(JSON.stringify(myArrayResult));
    return myArrayResult;
};

function dataRestore () {
    const data = refreshLocalStorage();
    data.forEach(element => {
        const taskText = element.todo;
        const task = newItemTemplate.cloneNode(true);
        const taskDescription = task.querySelector('span');
        taskDescription.textContent = taskText;
        addTaskHandler(task);
        todoList.appendChild(task);
    });
}

newItemForm.addEventListener('submit', function() {
    refreshLocalStorage();
    const taskText = newItemTitle.value;
    const task = newItemTemplate.cloneNode(true);
    const taskDescription = task.querySelector('span');
    taskDescription.textContent = taskText;    
    addTaskHandler(task);
    todoList.appendChild(task);
    newItemTitle.value = '';
});


    


// const todoList = document.querySelector('.todo-list');
// const completedList = document.querySelector('.completed-list');
// const newItemForm = document.querySelector('.add-form');
// const newItemTitle = newItemForm.querySelector('.add-form-input');
// const taskTemplate = document.querySelector('#task-template').content;
// const newItemTemplate = taskTemplate.querySelector('.todo-list-item');

// const addTaskHandler = function(item) {
//     newItemForm.addEventListener('submit', function() {
//         const taskText = newItemTitle.value;
//         const task = newItemTemplate.cloneNode(true);
//         const taskDescription = task.querySelector('span');
//         taskDescription.textContent = taskText;
//         localStorage.setItem('incomplete', task.toString());
//         addTaskHandler(task);
//         todoList.appendChild(task);
//         newItemTitle.value = '';
//     });
// };