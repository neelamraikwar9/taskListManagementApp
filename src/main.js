import { createStore } from 'redux';
import taskReducer from './taskReducer.js';

const store = createStore(taskReducer);

store.subscribe(() => {
  console.log(store.getState());

  updateTaskList();
})


const taskName = document.getElementById('taskName');
const taskWork = document.getElementById('taskWork');
const addTaskBtn = document.getElementById('addTaskBtn');

const taskId = document.getElementById('taskId');
const removeTaskBtn = document.getElementById('removeTaskBtn');
const taskList = document.getElementById('taskList');
const totalTask = document.getElementById('totalTask');



const handleAddTask = () => {
  const name = taskName.value; 
  const work = taskWork.value; 

  if(name && work){
    store.dispatch({type: "ADD_TASK", payload: {name: name, work: work}});
  }
}

addTaskBtn.addEventListener("click", handleAddTask);

window.handleTaskToggle = (event) => {
  const taskIndex = event.target.dataset.taskIndex; //dataset.taskIndex
  console.log(taskIndex, "tadjdfjkdf")

  store.dispatch({ type: "TOGGLE_TASK", payload: parseInt(taskIndex)
  })
  
}

const updateTaskList = () => {
  const state = store.getState();
  
  taskList.innerHTML = state.tasks.map((tsk, index) => {
     const strike = tsk.completed ? 'style="text-decoration: line-through"' : '';
     const noStrike = tsk.completed ? 'style="text-decoration: none"' : '';
     const status = tsk.completed ? '<span style="color: green; font-weight: bold;"> ✓ completed</span>' : '';
    return `<li><span ${strike}><input type="checkbox" data-task-index = "${index}" onChange="handleTaskToggle(event)" ${tsk.completed ? 'checked' : ''}/> ${index + 1}. ${tsk.name}: ${tsk.work} </span> <span ${noStrike}>${status}</span></li>`
  }).join("");

}


const handleRemoveTask = () => {
  const taskID = parseInt(taskId.value); 
  console.log(taskID); 

  // if(taskID){
  //   store.dispatch({type: "REMOVE_TASK", payload: taskID});
  // }
  
if (!isNaN(taskID) && taskID > 0) {
  const index = taskID - 1;              // 1 → 0, 2 → 1, ...
  store.dispatch({ type: "REMOVE_TASK", payload: index });
}

}



removeTaskBtn.addEventListener("click", handleRemoveTask);





