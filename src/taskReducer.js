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
      return {...state, tasks: state.tasks.filter((tsk, index) => index  !== action.payload)};

    default:
      return state;
  }
};

export default taskReducer;
