import { createSlice } from "@reduxjs/toolkit"
import todosService from "../services/todos.service";
import { setError } from "./errors";
const initialState = {entities:[], isLoading: true};

 const taskSlice = createSlice({name: "task", initialState, reducers: {
    update(state, action) {
        const elementIndex = state.entities.findIndex(el => el.id===action.payload.id)
        state.entities[elementIndex] = { ...state.entities[elementIndex], ...action.payload}
    },
    remove(state, action) {
        const elementIndex = state.entities.findIndex(el => el.id===action.payload.id)
        state.entities.splice(elementIndex, 1)
    },
    recived(state, action){
        state.entities = action.payload
        state.isLoading = false
    },
    taskRequested(state){
        state.isLoading = true
    },
    taskRequestFailed(state){
        state.isLoading = false
    },
    create(state,action) {
        state.entities.push(action.payload)
        state.isLoading = false
    }
 }})
const {actions, reducer: taskReducer} = taskSlice
const {update,remove, recived, taskRequested, taskRequestFailed, create } = actions


export const loadTasks =()=> async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(recived(data))
        console.log(data)
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export const compliteTask=(id) => (dispatch, getState) => {
    dispatch(update({id, completed: true}))
}
export function titleChanged(id) {
    return update({id, title: `New title for ${id}`})
}
export function taskDeleted(id) {
    return remove({id})
}
export const taskCreated = () => async (dispatch) => {
        try {
            const data = await todosService.post()
            console.log(data)
            dispatch(create(data))
        } catch (error) {
            dispatch(setError(error.message))
        }
}

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer;