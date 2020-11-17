import React from 'react';
import './styles/ToDoItem.css';

export interface ItemProps {
    done: boolean;
    text: string;
}

interface State {
    done: boolean
}

class ToDoItem extends React.Component<ItemProps, State> {
    state: State = {
        done: false
    };

    constructor(props: ItemProps) {
        super(props);
    }

    componentDidMount(): void {
        this.setState({
            done: this.props.done
        })
    }

    toggleDone = () => {
        let itemList: Array<ItemProps> = [];
        itemList = JSON.parse(localStorage.getItem('todo') as string);
        itemList.forEach(item => {
            if (item.text === this.props.text) {
                item.done = !this.state.done
            }
        });

        localStorage.clear();
        localStorage.setItem('todo', JSON.stringify(itemList));

        this.setState({
            done: !this.state.done
        })
    };

    render() {
        const {text} = this.props;
        const {done} = this.state;

        return (
            <div
                className={`item ${done ? 'color-text' : ''}`}
                onClick={this.toggleDone}
            >
                <p>{text}</p>
            </div>
        );

    }
}

export default ToDoItem;