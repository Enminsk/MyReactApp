import React from 'react';
import { connect } from 'react-redux';

import { CheckboxGroup } from './common';
import css from './styles.module.css';
import { FILTER_STATUSES, filterOptions } from './constants';
import { TasksSelectors, TasksActionCreators } from '../store';

const filterTask = (filter, task) => {
    if (filter === FILTER_STATUSES.ALL) {
        return true;
    }

    if (filter === FILTER_STATUSES.DONE) {
        return task.isDone;
    }

    return !task.isDone;
}

class AppOriginal extends React.Component {
    state = {
        todoInput: '',
        filter: FILTER_STATUSES.ALL,
    }

    inputChangeHandler = (e) => {
        this.setState({ todoInput: e.target.value })
    }

    addTaskHandler = () => {
        this.props.addTask({ todo: this.state.todoInput, isDone: false });
        }

    toggleCheckbox = () => {
        this.props.toggleTask({ tasks: this.state.isDone})
    }

    changeFilterHandler = (e) => {
        this.setState({ filter: e.target.value });
    }

    render () {
        const { tasks } = this.props;
        const { todoInput, filter } = this.state;
        
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
                                this.props.toggleTask(id)
                            }}/>
                            {todo}
                            {isDone && <button className={css.button} onClick={() => {
                                this.props.deleteTask(id)
                                }}>Удалить задачу</button>}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    tasks: TasksSelectors.getTasks(state)
});

const mapDispatchToProps = (dispatch) => ({
    deleteTask: (id) => dispatch(TasksActionCreators.deleteTask(id)),
    addTask: (task) => dispatch(TasksActionCreators.addTask(task)),
    toggleTask: (task) => dispatch(TasksActionCreators.toggleTask(task)),
})

export const App = connect(mapStateToProps, mapDispatchToProps)(AppOriginal)
