import { TASKS_ACTIONS, FILTER_STATUSES } from './constants';
import { combineReducers } from 'redux';

const INITIAL_STATE_TASK = {
    tasks: [
        { id: 1, todo: 'Выучить JS', isDone: true },
        { id: 2, todo: 'Выучить React', isDone: false },
    ],
};

const INITIAL_STATE_FILTER = {
    filter: FILTER_STATUSES.ALL,
};

const generateUniqId = (tasks) => {
    const ids = tasks.map(({ id }) => id);

    return Math.max(...ids) + 1;
}

const taskReducer = (state = INITIAL_STATE_TASK, action) => {
    switch (action.type) {
        case TASKS_ACTIONS.DELETE_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter(({ id: taskID }) => taskID !== action.payload)
            };
        }
        case TASKS_ACTIONS.ADD_TASK: {
            const id = generateUniqId(state.tasks)
            return {
                ...state,
                tasks: state.tasks.concat({ ...action.payload, id })
            };
        }
        case TASKS_ACTIONS.TOGGLE_TASK: {
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id !== action.payload) {
                        return task
                    } else {
                        return { ...task, isDone: !task.isDone }
                    }
                })
            };
            
        }
        default:
            return state;
    }
};

const filterReducer = (state = INITIAL_STATE_FILTER, action) => {
    switch (action.type) {
        case TASKS_ACTIONS.CHANGE_FILTER: {
            return {
                ...state,
                filter: action.payload
            };
        }
        default:
            return state;
    }
};

export const rootReducer = combineReducers({ taskReducer, filterReducer });


