import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todos from "./components/Todos";
import './App.css';
import Header from "./components/layout/header";
import About from "./components/pages/About";
import AddTodo from "./components/AddTodo";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

class App extends Component {

  state = {
    todos: []
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10").then(res => this.setState({todos: res.data }));
  }

  //Mark complete
  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => { if(todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
    })})
  }

  //!DeleteTodo
  delTodo = id => {

    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}));
  };

  //!AddTodo
  AddTodo = title => {

    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
  }).then(res => this.setState({todos: [...this.state.todos, res.data] }));
    // this.setState({todos: [...this.state.todos, newTodo] });
  };

  render(){
    console.log(this.state.todos);
    return (
      <Router>
      <div className="App">
        <Header/>
        <Routes>
        <Route exact path="/ReactApp" element={<React.Fragment>
            <div className="container">
            <AddTodo AddTodo={this.AddTodo}/>
        <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
            </div>
          </React.Fragment>
        }
       />
       <Route path="/about" element={<About/>} />
       </Routes>
        </div>
        </Router>
    );
  }

}

export default App;
