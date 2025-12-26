import { createStore } from 'redux';
import taskReducer from './taskReducer.js';

const store = createStore(taskReducer);

store.subscribe(() => {
  console.log(store.getState());

  updateTaskList();
  handleTotalTask();
})


const taskName = document.getElementById('taskName');
const taskWork = document.getElementById('taskWork');
const addTaskBtn = document.getElementById('addTaskBtn');

const taskId = document.getElementById('taskId');
const removeTaskBtn = document.getElementById('removeTaskBtn');
const taskList = document.getElementById('taskList');
const totalTask = document.getElementById('totalTask');


// let nextId = 1;

const handleAddTask = () => {
  const name = taskName.value; 
  const work = taskWork.value; 

  if(name && work){
    store.dispatch({type: "ADD_TASK", payload: { 
      // id: nextId++, 
      name: name, work: work}});
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
    return `<li><span ${strike}><input type="checkbox" 

    data-task-index = "${index}"
    // // data-task-id = "${tsk.id}"


     onChange="handleTaskToggle(event)" ${tsk.completed ? 'checked' : ''}/> ${index + 1}. ${tsk.name}: ${tsk.work} </span> <span ${noStrike}>${status}</span></li>`
  }).join("");

}



// const handleRemoveTask = () => {
//   const id = parseInt(taskId.value, 10);   // user types 3 → id 3
//   if (!isNaN(id) && id > 0) {
//     store.dispatch({ type: 'REMOVE_TASK', payload: id });
//     taskId.value = '';
//   }
// };


const handleRemoveTask = () => {
  const id = parseInt(taskId.value, 10);
  console.log('User typed ID:', id);

  if (!isNaN(id) && id > 0) {
    const index = id - 1;
    console.log('Dispatching REMOVE_TASK with index:', index);
    store.dispatch({ type: 'REMOVE_TASK', payload: index });
    taskId.value = '';
  }
};

removeTaskBtn.addEventListener("click", handleRemoveTask);

const handleTotalTask = () => {
  const state = store.getState();

  const taskCount = state.tasks.length; 
  console.log(taskCount, "taskbcoutn")

  totalTask.innerHTML = `<strong>Total Tasks:  </strong> ${taskCount}`
}

handleTotalTask();







