import React, { Component } from 'react';
import './App.css'
class App extends Component {
  state = {
    todos: [],
    newTodo: '',
  };

  componentDidMount() {
    console.log("App componentDidMount");
    this.fetchTodos();
  }

  fetchTodos = () => {
    fetch('http://localhost:8000/todos')
      .then(response => response.json())
      .then(data => {
        this.setState({ todos: data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = this.state.newTodo;

    fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newTodo }),
    })
      .then(data => {
        this.setState({ newTodo: '' });
        this.fetchTodos();
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete = (id) => {
    fetch(`http://localhost:8000/todos/${id}`, {
      method: 'DELETE',
    })
      .then(data => {
        this.fetchTodos();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { todos, newTodo } = this.state;
    return (
      <div>
        <h1>Todo List</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={newTodo} onChange={this.handleInputChange} />
          <button type="submit">Add</button>
        </form>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.content}
              <button onClick={() => this.handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
