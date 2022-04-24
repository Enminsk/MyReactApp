import { TASKS_ACTIONS } from './constants';

export const deleteTask = (id) => ({ type: TASKS_ACTIONS.DELETE_TASK, payload: id })
export const addTask = (task) => ({ type: TASKS_ACTIONS.ADD_TASK, payload: task })
export const toggleTask = (id) => ({ type: TASKS_ACTIONS.TOGGLE_TASK, payload: id })
