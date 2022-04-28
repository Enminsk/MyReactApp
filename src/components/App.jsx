import React from 'react';
import { connect } from 'react-redux';

import { CheckboxGroup } from './common';
import css from './styles.module.css';
import { filterOptions } from './constants';
import { TasksSelectors, TasksActionCreators } from '../store';


class AppOriginal extends React.Component {
    state = {
        todoInput: '',
    }

    inputChangeHandler = (e) => {
        this.setState({ todoInput: e.target.value })
    }

    addTaskHandler = () => {
        this.props.addTask({ todo: this.state.todoInput, isDone: false });
        }

    toggleCheckbox = (id) => {
        this.props.toggleTask(id)
    }

    changeFilterHandler = (e) => {
        this.props.changeFilter(e.target.value);
    }

    render () {
        const { tasks, filter } = this.props;
        const { todoInput } = this.state;
        
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
                    {tasks.map(({ todo, id, isDone }) => (
                        <li className={css.item} key={id}>
                            <input className={css.checkbox} type="checkbox" checked={isDone} onChange={() => {
                                this.toggleCheckbox(id)
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
    tasks: TasksSelectors.getTasks(state),
    filter: TasksSelectors.getFilters(state),
});

const mapDispatchToProps = (dispatch) => ({
    deleteTask: (id) => dispatch(TasksActionCreators.deleteTask(id)),
    addTask: (task) => dispatch(TasksActionCreators.addTask(task)),
    toggleTask: (id) => dispatch(TasksActionCreators.toggleTask(id)),
    changeFilter: (event) => dispatch(TasksActionCreators.changeFilter(event)),
})

export const App = connect(mapStateToProps, mapDispatchToProps)(AppOriginal)
