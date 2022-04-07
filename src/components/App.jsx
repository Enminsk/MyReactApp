import { CheckboxGroup } from './common';
import css from './styles.module.css';
import { FILTER_STATUSES, filterOptions, tasks } from './constants';

const filter = FILTER_STATUSES.ALL;

const filterTask = (filter, task) => {
    if (filter === FILTER_STATUSES.ALL) {
        return true;
    }

    if (filter === FILTER_STATUSES.MAKE) {
        return task.isDone;
    }

    return !task.isDone;
}

export function App() {
    return (
        <div className={css.app}>
            <h1 className={css.header}>Todo App</h1>
            <form className={css.header__add}>
                <input />
                <button type="button">Добавить задачу</button>
            </form>
            <div>
                <CheckboxGroup options={filterOptions} value={FILTER_STATUSES.ALL} />
            </div>
            <ul>
                {tasks.filter((task) => filterTask(filter, task)).map(({ task, id, isDone }) => (
                    <li key={id}>
                        <input type="checkbox" checked={isDone} />
                        {task}
                        {isDone && <button className={css.main__button}>удалить задачу</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
