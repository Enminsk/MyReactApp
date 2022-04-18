/* import { combineReducers } from 'redux'; */
import { TASKS_ACTIONS } from './constants';

const INITIAL_STATE_TASK = {
    tasks: [
        { id: 1, todo: 'Выучить JS', isDone: true },
        { id: 2, todo: 'Выучить React', isDone: false },
    ],
};

/* const INITIAL_STATE_FILTER = {
    filter: '',
}; */

const generateUniqId = (tasks) => {
    const ids = tasks.map(({ id }) => id);

    return Math.max(...ids) + 1;
}

export const taskReducer = (state = INITIAL_STATE_TASK, action) => {
    switch (action.type) {
        case TASKS_ACTIONS.DELETE_TASK: {
            return {
                tasks: state.tasks.filter(({ id: taskID }) => taskID !== action.payload)
            };
        }
        case TASKS_ACTIONS.ADD_TASK: {
            const id = generateUniqId(state.tasks)
            return {
                tasks: state.tasks.concat({ ...action.payload, id})
            };
        }
        case TASKS_ACTIONS.TOGGLE_TASK: {
            return {
                tasks: state.tasks.map((task) => {
                    if (task.id !== action.payload) {
                        return action.payload
                    }

                    return { ...action.payload, task: !task.isDone };
                })
            };
        }
        default:
            return state;
    }
}

/* export const filterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TASKS_ACTIONS.DELETE_TASK: {
            return {
                tasks: state.tasks.filter(({ id: taskID }) => taskID !== action.payload)
            };
        }
        case TASKS_ACTIONS.ADD_TASK: {
            const id = generateUniqId(state.tasks)
            return {
                tasks: state.tasks.concat({ ...action.payload, id })
            };
        }
        default:
            return state;
    }
} */
