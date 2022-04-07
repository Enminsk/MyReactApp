export const FILTER_STATUSES = {
    ALL: 'all',
    ACTIVE: 'active',
    DONE: 'done',
}

export const filterOptions = [
    { value: FILTER_STATUSES.ALL, label: 'Все' },
    { value: FILTER_STATUSES.DONE, label: 'Сделано' },
    { value: FILTER_STATUSES.ACTIVE, label: 'Сделать' },
];
