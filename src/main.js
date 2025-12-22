import { createStore } from 'redux';
import cookieReducer from './cookieReducer.js';

const store = createStore(cookieReducer);

store.subscribe(() => {
  // console.log(store.getState()));
  updateCookieCount();
});

// store.dispatch({ type: 'cookies/added' });
// store.dispatch({ type: 'cookies/added' });
// store.dispatch({ type: 'cookies/removed' });

const cookieCount = document.getElementById('cookieCount');
const addCookie = document.getElementById('addCookie');
const removeCookie = document.getElementById('removeCookie');

const addCookieHandler = () => {
  store.dispatch({ type: 'cookies/added' });
};
const removeCookieHandler = () => {
  store.dispatch({ type: 'cookies/removed' });
};

addCookie.addEventListener('click', addCookieHandler);
removeCookie.addEventListener('click', removeCookieHandler);

function updateCookieCount() {
  const state = store.getState();
  cookieCount.textContent = state.value;
}
