import React, { Component } from "react";

class TodoListComp extends Component {
    render() {
        return (
            // <div id="content">
            //     <form
            //         className="mb-3"
            //         onSubmit={(event) => {
            //             event.preventDefault();
            //             this.props.createTask(this.task.value);
            //         }}
            //     ></form>
            //     <div className="input-group mb-4">
            //         <input
            //             type="text"
            //             // onChange={(event) => {
            //             //     const etherAmount = this.input.value.toString();
            //             //     this.setState({
            //             //         output: etherAmount * 100,
            //             //     });
            //             // }}
            //             ref={(input) => {
            //                 this.input = input;
            //             }}
            //             className="form-control form-control-lg"
            //             placeholder="Add text..."
            //             required
            //         />
            //     </div>
            //     <button
            //         type="submit"
            //         className="btn btn-primary btn-block btn-lg"
            //     >
            //         Enter
            //     </button>
            // </div>

            <div id="content" className="mt-3">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        this.props.createTask(this.task.value);
                    }}
                >
                    <input
                        id="newTask"
                        ref={(input) => (this.task = input)}
                        type="text"
                        className="form-control"
                        placeholder="Add task..."
                        required
                    />
                    <input type="submit" hidden={true} />
                </form>
                <ul id="taskList" className="list-unstyled">
                    {this.props.tasks.map((task, key) => {
                        return (
                            <div
                                className="taskTemplate"
                                className="checkbox"
                                key={key}
                            >
                                <label>
                                    <input type="checkbox" />
                                    <span className="content">
                                        {task.content}
                                    </span>
                                </label>
                            </div>
                        );
                    })}
                </ul>
                <ul id="completedTaskList" className="list-unstyled"></ul>
            </div>
        );
    }
}

export default TodoListComp;
