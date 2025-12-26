const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {...state, tasks : [...state.tasks, action.payload]};

    case 'TOGGLE_TASK':
      return {...state, tasks: state.tasks.map((tsk, index) => index === action.payload ? {...tsk, completed: !tsk.completed} : tsk)}  

  


  case 'REMOVE_TASK':
  console.log('Reducer REMOVE_TASK, payload =', action.payload);
  return {
    ...state,
    tasks: state.tasks.filter((tsk, index) => {
      console.log('  keeping index', index, 'task:', tsk.name);
      return index !== action.payload;
    })
  };


  // case 'REMOVE_TASK':
  // return {
  //   ...state,
  //   tasks: state.tasks.filter((tsk) => tsk.id !== action.payload)
  // };
      

    default:
      return state;
  }
};

export default taskReducer;
