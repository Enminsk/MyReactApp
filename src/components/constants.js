export const tasks = [
    { id: 1, task: 'Выучить JS', isDone: true },
    { id: 2, task: 'Выучить React', isDone: false },
];

export const FILTER_STATUSES = {
    ALL: 'all',
    MAKE: 'make',
    DONE: 'done',
}

export const filterOptions = [
    { value: FILTER_STATUSES.ALL, label: 'Все' },
    { value: FILTER_STATUSES.DONE, label: 'Сделано' },
    { value: FILTER_STATUSES.MAKE, label: 'Сделать' },
];
