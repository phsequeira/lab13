import React, { Component } from 'react'
import { getAllTodos, addTodo, finishedTodo } from '../APIutils.js';
export default class TodosListPage extends Component {
    state = {
        todos: [],
        todo: ''
    }

    componentDidMount = async () => {
        await this.fetchTodos();
    }

    fetchTodos = async () => {
        const todos = await getAllTodos(this.props.user.token);

        this.setState({ todos });
    }

    handleSubmit = async e => {
        e.preventDefault();

        await addTodo(this.state.todo, this.props.token);

        await this.fetchTodos();

        this.setState({ todo: '' });
    }

    handleTodoChange = e => this.setState({ todo: e.target.value })

    handleFinished = async(todoId) => {
        await finishedTodo(todoId, this.props.user.token);

        this.fetchTodos();
    }

    render() {        
        console.log(this.props);
        console.log(this.state.todo);
        return (
            <div>
                <h3>Welcome to the ToDo Page</h3>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.todo} onChange={this.handleTodoChange} />
                    <button>Add todo</button>
                </form>
                {!this.state.todos.length && <p>Add to your Todo List!</p>}
                {this.state.todos.map(todo => 
                    <p 
                        key={`${todo.todo}-${todo.id}`} 
                        onClick={() => this.handleFinished(todo.id)}
                        className={`
                            todo ${todo.completed 
                                ? 'completed' 
                                : ''}`
                            }>    
                        {todo.todo}
                    </p>)}
            </div>
        )
    }
}