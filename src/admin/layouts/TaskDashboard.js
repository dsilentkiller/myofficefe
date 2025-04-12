import React, { useState } from "react";
import TaskForm from "../container/task/Task";
import TaskTable from "../container/task/TaskTable";
// import Task

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="container">
      <TaskForm onSubmit={addTask} />
      <TaskTable tasks={tasks} />
    </div>
  );
};

export default TaskDashboard;
