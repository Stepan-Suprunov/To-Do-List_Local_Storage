const todoList = document.querySelector('.todo-list');
const completedList = document.querySelector('.completed-list');
const newItemForm = document.querySelector('.add-form');
const newItemTitle = newItemForm.querySelector('.add-form-input');
const taskTemplate = document.querySelector('#task-template').content;
const newItemTemplate = taskTemplate.querySelector('.todo-list-item');

let todoListArray = JSON.parse(localStorage.getItem('key')) === null ? [] : JSON.parse(localStorage.getItem('key'));

dataRestore();


function addTaskHandler (item) {
    const checkbox = item.querySelector('.complete-item');
    checkbox.addEventListener('change', function () {
        if (this.checked) {          
            todoListArray.forEach(element => {
                if (element.id === item.querySelector('p').textContent) {
                    element.property = true;
                };
            });
        } else {
            todoListArray.forEach(element => {
                if (element.id === item.querySelector('p').textContent) {
                    element.property = false;
                };
            });
        };

        refreshLocalStorage ();
    });

    const delBtn = item.querySelector('.delete-item');
    delBtn.addEventListener('click', function() {
        todoListArray.forEach(element => {

            let temp = [];
            todoListArray.forEach(element => {
                if (element.id !== item.querySelector('p').textContent) {
                    temp.push(element);
                }

                todoListArray = temp;                                              
            });
        });

        refreshLocalStorage ();
    });
};


function addElement () {
    const myElement = {
        todo: String,
        property: Boolean,
        id: Date()                                                    
    };

    myElement.todo = newItemTitle.value;
    myElement.property = false;
    myElement.id = Date();

    todoListArray.push(myElement);

    refreshLocalStorage ();

    return myElement;
};


function refreshLocalStorage () {
    localStorage.setItem('key', JSON.stringify(todoListArray));
    location.reload ();
};


function dataRestore () {
    todoListArray.forEach(element => {
        const task = newItemTemplate.cloneNode(true);
        task.querySelector('span').textContent = element.todo;
        task.querySelector('p').textContent = element.id;
        
        if (element.property === false) {
            todoList.appendChild(task);
        } else {
            task.querySelector('.complete-item').checked = true;
            completedList.appendChild(task);
        }
        
        addTaskHandler(task);
    });
}


newItemForm.addEventListener('submit', function() {
    const element = addElement ();
    const task = newItemTemplate.cloneNode(true);
    task.querySelector('span').textContent = element.todo; 
    task.querySelector('p').textContent = element.id;                             
    addTaskHandler(task);
    todoList.appendChild(task);
    newItemTitle.value = '';
});


const newListBtn = document.querySelector('.new-list-button');
newListBtn.addEventListener('click', function() {
    todoListArray.length = 0;
    refreshLocalStorage ();
});


const completedDelBtn = document.querySelector('.delete-completed-button');
completedDelBtn.addEventListener('click', function(){


    let temp = [];
    todoListArray.forEach(element => {
        if (!element.property) {
            temp.push(element);
        }

        todoListArray = temp;                                                 
    });

    refreshLocalStorage ();
});
