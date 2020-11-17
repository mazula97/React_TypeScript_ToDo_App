import React from "react";

import ToDoItem, {ItemProps} from './ToDoItem';
import './styles/ToDoList.css';
import {mockTasks} from "../mocks";

interface Props {
}

interface State {
    tasks: Array<ItemProps>,
    draft: string
}

class ToDoList extends React.Component<Props, State> {
    state: State = {
        draft: "",
        tasks: [] as ItemProps[]
    };

    constructor(props: Props) {
        super(props);

        this.updateDraft = this.updateDraft.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    componentDidMount(): void {

        this.setState({
            ...this.state,
            tasks: this.getTasks()
        })
    }

    getTasks = () => {
        if (localStorage.length === 0) {
            localStorage.setItem('todo', JSON.stringify(mockTasks));
            return mockTasks;
        } else {
            return JSON.parse(localStorage.getItem('todo') as string);
        }
    };

    updateDraft = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue: string = event.target.value;

        this.setState({
            ...this.state,
            draft: inputValue
        })
    };

    addTodo = () => {
        const {tasks, draft} = this.state;

        if (draft.length) {

            tasks.push({
                text: draft, done: false
            });

            localStorage.clear();
            localStorage.setItem('todo', JSON.stringify(tasks));

            this.setState({
                tasks,
                draft: ''
            })
        }
    };

    deleteTask = () => {
        localStorage.clear();

        this.setState({
            tasks: [],
            draft: ''
        })
    };

    render() {
        const {tasks, draft} = this.state;

        return (
            <div className='appPage'>
                <h1>ToDo List</h1>
                {tasks.map(task => <ToDoItem text={task.text} done={task.done}/>)}
                <div className='inputItems'>
                    <input
                        className='inputText'
                        type='text'
                        onChange={this.updateDraft}
                        value={draft}
                    />
                    <button className='addButton' onClick={this.addTodo}>+</button>
                </div>
                <div className='buttonItems'>
                    <button className='deleteButton' onClick={this.deleteTask}>Delete all tasks</button>
                </div>
            </div>
        );
    }
}

export default ToDoList;
