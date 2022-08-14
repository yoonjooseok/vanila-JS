const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const  TODOS_KEY = "todos";

let toDos = [];


function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}

function deleteTodo(event){
    const li = event.target.parentElement;
    toDos = toDos.filter(item => item.id !== parseInt(li.id));
    li.remove();
    saveToDos();
}

function paintToDo(newTodoObj){
    const li = document.createElement("li");
    li.id = newTodoObj.id;
    const span = document.createElement("span");
    li.appendChild(span);
    console.log(li);
    span.innerText = newTodoObj.text;
    const button = document.createElement("button");
    button.innerText ="❌";
    button.addEventListener("click",deleteTodo);
    li.appendChild(button);
    toDoList.appendChild(li);
}


function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text:newTodo,
        id:Date.now(),
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const getSavedToDos = localStorage.getItem(TODOS_KEY);

if(getSavedToDos !== null){
    const parsedToDos = JSON.parse(getSavedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}