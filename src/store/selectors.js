import { FILTER_STATUSES } from "./constants"; 

const filterTask = (filter, task) => {
    if (filter === FILTER_STATUSES.ALL) {
        return true;
    }

    if (filter === FILTER_STATUSES.DONE) {
        return task.isDone;
    }

    return !task.isDone;
};

export const getTasksOriginal = (state) => state.taskReducer.tasks;
export const getFilters = (state) => state.filterReducer.filter;

export const getTasks = (state) => {
    const tasks = getTasksOriginal(state);
    const filter = getFilters(state);
    return tasks.filter((task) => filterTask(filter, task));
};
