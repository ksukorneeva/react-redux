import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { titleChanged, taskDeleted, compliteTask, getTasks, loadTasks, getTasksLoadingStatus, taskCreated} from './store/task'
import configureStore from './store/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';

const store = configureStore()

const App = (params) => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch()

useEffect(() => {
  dispatch(loadTasks())
}, [])

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId))
  }
  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId))
  }
  const createTask = () => {
    dispatch(taskCreated())
  }
  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(error){
    return <p>{error}</p>
  }
  return (<>
  <button onClick={()=> dispatch(createTask())}>Create Task</button>
  <h1>App</h1>
  <ul>
    {state.map(el => <li key={el.id}>
      <p>{el.title}</p>
      <p>{`Completed: ${el.completed}`}</p>
      <button onClick = {()=>dispatch(compliteTask(el.id))}>Complete</button>
      <button onClick={()=> changeTitle(el.id)}>Change title</button>
      <button onClick={()=> deleteTask(el.id)}>Delete Task</button>
      <hr/>
      </li>)}
  </ul>
  </>)
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

