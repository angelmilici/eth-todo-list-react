pragma solidity ^0.5.0;

contract TodoList {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }


    mapping(uint => Task) public tasks; // keeps track of number of tasks

    event TaskCreated (
        uint id,
        string content,
        bool completed
    );

    constructor() public {
        createTask("Check out xyz.com");
    }
    
    function createTask(string memory _content) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

}