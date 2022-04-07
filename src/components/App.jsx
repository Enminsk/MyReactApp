import React from 'react';
import { CheckboxGroup } from './common';
import css from './styles.module.css';
import { FILTER_STATUSES, filterOptions } from './constants';

const filterTask = (filter, task) => {
    if (filter === FILTER_STATUSES.ALL) {
        return true;
    }

    if (filter === FILTER_STATUSES.DONE) {
        return task.isDone;
    }

    return !task.isDone;
}

const generateUniqId = (tasks) => {
    const ids = tasks.map(({ id }) => id);

    return Math.max(...ids) + 1;
}

export class App extends React.Component {
    state = {
        tasks: [
            { id: 1, todo: 'Выучить JS', isDone: true },
            { id: 2, todo: 'Выучить React', isDone: false },
        ],
        todoInput: '',
        filter: FILTER_STATUSES.ALL,
    }

    deleteTaskHandler = (id) => {
        this.setState((prevState) => ({
            tasks: prevState.tasks.filter(({ id: taskID }) => taskID !== id)
        }));
    }

    inputChangeHandler = (e) => {
        this.setState({ todoInput: e.target.value })
    }

    addTaskHandler = () => {
        this.setState((prevState) => ({
            tasks: prevState
                .tasks
                .concat(
                    [{ id: generateUniqId(prevState.tasks), todo: prevState.todoInput, isDone: false }]
                )
        }))
    }

    toggleCheckbox = (id) => {
        this.setState((prevState) => ({
            tasks: prevState.tasks.map((task) => {
                if (task.id !== id) {
                    return task
                }

                return { ...task, isDone: !task.isDone };
            })
        }))
    }

    changeFilterHandler = (e) => {
        this.setState({ filter: e.target.value });
    }

    render () {
        const { tasks, todoInput, filter } = this.state;
        
        return (
            <div className={css.app}>
                <h1 className={css.title}>Todo App</h1>
                <form className={css.header}>
                    <input className={css.todo} value={todoInput} onChange={this.inputChangeHandler}/>
                    <button className={css.btn} type="button" onClick={this.addTaskHandler}>Добавить задачу</button>
                </form>
                <div>
                    <CheckboxGroup options={filterOptions} value={filter} onChange={this.changeFilterHandler} />
                </div>
                <ul className={css.list}>
                    {tasks.filter((task) => filterTask(filter, task)).map(({ todo, id, isDone }) => (
                        <li className={css.item} key={id}>
                            <input className={css.checkbox} type="checkbox" checked={isDone} onChange={() => {
                                this.toggleCheckbox(id)
                            }}/>
                            {todo}
                            {isDone && <button className={css.button} onClick={() => {
                                this.deleteTaskHandler(id)
                                }}>Удалить задачу</button>}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
