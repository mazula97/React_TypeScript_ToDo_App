import React, {Component} from 'react';
import './App.css';
import ToDoList from './components/ToDoList';

class App extends Component<any, any> {
  render() {
    return (
        <div>
          <ToDoList />
        </div>
    );
  }
}

export default App;
