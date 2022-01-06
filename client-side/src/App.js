import React, { Component } from "react";
import Web3 from "web3";
import TodoList from "../../contracts/build/contracts/TodoList.json";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoListComp from "./TodoListComp";

class App extends Component {
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadBlockchainData() {
        const web3 = window.web3;

        const accounts = await web3.eth.getAccounts();
        console.log("Accounts: ", accounts);
        this.setState({ account: accounts[0] });
        const networkId = await web3.eth.net.getId();

        // load todolist contract
        const todoListData = TodoList.networks[networkId];

        if (todoListData) {
            const todoList = new web3.eth.Contract(
                TodoList.abi,
                todoListData.address
            );
            console.log("data: ", todoList);
            this.setState({ todoList });
            let taskCount = await todoList.methods.taskCount().call();
            console.log("Task count: " + taskCount);
            this.setState({ taskCount: parseInt(String(taskCount)) });
            for (var i = 1; i <= taskCount; i++) {
                const task = await todoList.methods.tasks(i).call();
                this.setState({
                    tasks: [...this.state.tasks, task],
                });
            }
        } else {
            window.alert("Token contract not deployed to detected network.");
        }

        this.setState({ loading: false });
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            account: "",
            taskCount: 0,
            tasks: [],
            loading: true,
        };

        this.createTask = this.createTask.bind(this);
    }

    createTask = (content) => {
        this.setState({ loading: true });
        this.state.todoList.methods
            .createTask(content)
            .send({ from: this.state.account })
            .once("receipt", (receipt) => {
                this.setState({ loading: true });
            });
    };

    render() {
        let content;
        if (this.state.loading) {
            content = (
                <p id="loader" className="text-center">
                    Loading...
                </p>
            );
        } else {
            content = (
                <TodoListComp
                    tasks={this.state.tasks}
                    createTask={this.createTask}
                />
            );
        }
        return (
            <div>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <a
                        className="navbar-brand col-sm-3 col-md-2 mr-0"
                        href="http://www.dappuniversity.com/free-download"
                        target="_blank"
                    >
                        Reactjs | Todo List
                    </a>
                    <ul className="navbar-nav px-3">
                        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                            <small>
                                <a className="nav-link" href="#">
                                    <span id="account">
                                        {this.state.account}
                                    </span>
                                </a>
                            </small>
                        </li>
                    </ul>
                </nav>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <main
                            role="main"
                            className="col-lg-12 ml-auto mr-auto"
                            style={{ maxWidth: "600px" }}
                        >
                            <div className="content mr-auto ml-auto">
                                <a
                                    href="http://www.dappuniversity.com/bootcamp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    123
                                </a>

                                {content}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
