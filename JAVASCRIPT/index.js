
//getting initial elements
let inptbx = document.getElementById('inputbx');
let submitbtn = document.getElementById('submitbtn');
let left_container = document.getElementById('left-container')
submitbtn.addEventListener('click', addTask);
let count = 1;
let data;

getData();

//  Adding task To DOM
function addTask() {
    let task_value = inptbx.value;
    //validating the input
    inptbx.value = "";
    if(task_value == ""){
        let ele=document.querySelector('.warning-msg');
        ele.classList.remove("visibility");

        setTimeout(() => {
            ele.classList.add("visibility");
        },3000);
        return;
        
    }
    if(localStorage.getItem('counter')){
        count=localStorage.getItem('counter');
    }
    let taskObj = {
        task: task_value,
        task_id: count++,
        is_complete: false
    }
    localStorage.setItem('counter',count);
    createTask(taskObj);
    setData(taskObj);
}

// Creating DOM for Task
function createTask(obj) {
    let todo_div = document.createElement('div');
    todo_div.id = obj.task_id;
    todo_div.classList.add('todo-div')
    let li_itm = document.createElement('li');
    li_itm.classList.add('lists');
    let del_btn = document.createElement('button')
    del_btn.addEventListener('click', deleteTask)
    let edit_btn = document.createElement('button')
    edit_btn.addEventListener('click', editName);
    let chk_box = document.createElement('input');
    chk_box.setAttribute('type', 'checkbox');
    chk_box.checked = obj.is_complete;
    if(obj.is_complete){
        li_itm.classList.add('task-compltd');
    }

    li_itm.innerText = obj.task;
    del_btn.innerText = "Delete";
    edit_btn.innerText = "Edit";
    // add functionality for check box
    // update task status in local storage
    chk_box.addEventListener('change', updateStaus);

    // create and Add edit button 
    // update task value in local storage
    li_itm.addEventListener("blur", updateTaskName);


    todo_div.append(li_itm)
    todo_div.append(del_btn)
    todo_div.append(chk_box)
    todo_div.append(edit_btn)
    left_container.append(todo_div)

}
//editing the task
function editName(event) {
    let element = event.currentTarget;
    let parent_Element = element.parentElement;
    let inx = parent_Element.id;
    for (let index = 0; index < data.length; index++) {
        if (data[index].task_id == inx)
            inx = index;
    }
   let myContent= parent_Element.children[0];
        if (myContent.contentEditable === 'true') {
          myContent.contentEditable = 'false';
        } else {
          myContent.contentEditable = 'true';
          myContent.focus();
        }
      }

//handling the checkbox status

function updateStaus(event) {
    let element = event.currentTarget;
    let parent_Element = element.parentElement;
    // console.log(parent_Element);
    let inx = parent_Element.id;
    // console.log(inx);


    for (let index = 0; index < data.length; index++) {
        if (data[index].task_id == inx)
            inx = index;
    }
    if (element.checked) {
        data[inx].is_complete = true;
        // console.log(parent_Element.children[0]);
        parent_Element.children[0].classList.add('task-compltd');
    }

    else {
        data[inx].is_complete = false;
        parent_Element.children[0].classList.remove('task-compltd');
    }

    localStorage.setItem('tasks', JSON.stringify(data));
}

//changing the task name

function updateTaskName(event) {
    let element = event.currentTarget;
    let parent_Element = element.parentElement;
    let inx = parent_Element.id;
    for (let index = 0; index < data.length; index++) {
        if (data[index].task_id == inx)
            inx = index;
    }
    data[inx].task = element.innerText;
    localStorage.setItem('tasks', JSON.stringify(data))
    // console.log(data);
}
//set data
function setData(obj) {
    data.push(obj);
    localStorage.setItem('tasks', JSON.stringify(data))
}


// get Data
function getData() {
    data = localStorage.getItem('tasks');
    if (data)
        data = JSON.parse(data);
    else
        data = [];

    data.forEach(element => {
        createTask(element)
    });
}

// Deleting task
function deleteTask(event) {
    let element = event.currentTarget;
    // console.log(element)

    let parent_Element = element.parentElement;
    let taskid = parent_Element.id
    // console.log(parent_Element)
    parent_Element.remove();
    let idx;
    for (let index = 0; index < data.length; index++) {
        if (data[index].task_id == taskid)
            idx = index;
    }
    data.splice(idx, 1)

    localStorage.setItem('tasks', JSON.stringify(data));
}


// made by divesh mittal