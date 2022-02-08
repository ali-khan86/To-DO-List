import ToDoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

const todoList=new ToDoList();

document.addEventListener('readystatechange',e=>{
    if(e.target.readyState==="complete"){
        initApp();
    }
});

const initApp=()=>{
    const todoForm=document.getElementById('elementEntryForm');
    todoForm.addEventListener('submit',submitHandler);
    const clearButton=document.querySelector('.btnClear');
    clearButton.addEventListener('click',clearToDoList);
    loadItemsFromStorage();
    refreshPage();
    
}
const submitHandler=(e)=>{
 e.preventDefault();
 const enteredItem=document.getElementById('elementEntryForm__text').value.trim();
 if(!enteredItem) return;
 const senetizedInput=senetizInput(enteredItem);
 const newItem=createNewItem(senetizedInput);
 todoList.addListItem(newItem);
 updateStorage(todoList.getList());
 updateScreanReaderAnnouncement(senetizedInput,'added')
 refreshPage();

}

const senetizInput=(text)=>{
 const regex=/[ ]{2,}/g;
 text=text.replaceAll(regex,'');
 const el=document.createElement('div');
 el.textContent=text;
 return el.innerHTML;
}
const createNewItem=(item)=>{
    const id=createNewItemId(item);
    const todoItem=new ToDoItem();
    todoItem.setItemId(id);
    todoItem.setItem(item);
    return todoItem;
}
const createNewItemId=()=>{
 let newId=1;
 const items=todoList.getList();
 if(items.length>0){
     const lastItem=items[items.length-1];
     newId=lastItem.id+1;
 }
 return newId;
}
const refreshPage=()=>{
    
    clearListItems();
    renderListItem();
    cleartInputText();
    setInputFocus();
}
const clearListItems=()=>{
    const parentElement=document.getElementById('listItems');
    let child=parentElement.lastElementChild;
    while(child){
        parentElement.removeChild(child);
        child=parentElement.lastElementChild;
    }
}
const renderListItem=()=>{
    const listItmes=todoList.getList();
    
    if(listItmes.length>0){
        listItmes.forEach(item=>{
            buildListItem(item);
        })
    }
}
const buildListItem=(item)=>{
    const div=document.createElement('div');
    div.classList.add('item');
    const check=document.createElement('input');
    check.type='checkbox';
    check.id=item.getItemId();
    addEventListener(check);
    const label=document.createElement('label');
    label.htmlFor=item.id;
    label.textContent=item.getItem();
    div.appendChild(check);
    div.appendChild(label);
    const listItemsElement=document.getElementById('listItems');
    listItemsElement.appendChild(div);
}
const addEventListener=(input)=>{
    input.addEventListener('click',()=>{
        console.log(input.id)
        todoList.removeListItem(input.id);
        updateStorage(todoList.getList());
        const checkbox=document.getElementById(input.id);
        const element=checkbox.nextElementSibling.textContent;
        updateScreanReaderAnnouncement(element,'deleted');
        setTimeout(() => {
            refreshPage();
        }, 1000);
    })
}

const clearToDoList=(e)=>{
    const listItems=todoList.getList();
    if(listItems.length>0){
        const confirmDelete=confirm('Are you sure to delete all To Do List Items?')
        if(confirmDelete){
            todoList.clearList();
            refreshPage();
            //updateStorage(todoList.getList());
            updateScreanReaderAnnouncement('All List Items','deleted')
        }
    }
}

const updateStorage=(listArray)=>{
    console.log('Update storage',listArray);
    if(listArray.length>0){

        localStorage.setItem('toToItems',JSON.stringify(listArray));
    }
}
const loadItemsFromStorage=()=>{
    const toDoJson=localStorage.getItem('toToItems');
    if(typeof toDoJson !=='string')return;
    const parsedToDo=JSON.parse(toDoJson);
    console.log('TO DO From LS',parsedToDo);
    
    parsedToDo.forEach(i=>{
        const item=new ToDoItem();
        item.setItemId(i.id);
        item.setItem(i.item);
        todoList.addListItem(item);
    });
    console.log(todoList)
}
const updateScreanReaderAnnouncement=(item,actionVerb)=>{
    const sRA=document.getElementById('screenReaderAnnoucement');
    sRA.textContent=`${item} ${actionVerb}`;
}
function cleartInputText(){
    document.getElementById('elementEntryForm__text').value='';
}
function setInputFocus(){
    document.getElementById('elementEntryForm__text').focus();
}