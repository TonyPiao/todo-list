import "./App.css";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks);
  }, []);

  function addTask(name) {
    setTasks((prev) => {
      return [...prev, { name: name, done: false }];
    });
  }

  function undateTaskDone(taskIndex, newDone) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  function removeTask(indexToRemove) {
    setTasks((prev) => {
      return prev.filter((taskObject, index) => index !== indexToRemove);
    });
  }

  const numberTotal = tasks.length;
  const numberComplete = tasks.filter((t) => t.done).length;

  function getMessage() {
    const percentage = (numberComplete / numberTotal) * 100;
    if (numberTotal === 0) {
      return "Add some tasks 🐱‍🏍";
    }
    if (percentage === 0) {
      return "Try to do one! 🐱‍👤";
    } else if (percentage === 100) {
      return "Nice job for today 🎉";
    } else {
      return "Keep it going 💪";
    }
  }

  function renameTask(index, newName) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }

  return (
    <main>
      <h1>
        <title>To Do List</title>
        {numberComplete}/{numberTotal} Complete
      </h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task, index) => (
        <Task
          {...task}
          onToggle={(done) => undateTaskDone(index, done)}
          onTrash={() => removeTask(index)}
          onRename={(newName) => renameTask(index, newName)}
        />
      ))}
    </main>
  );
}

export default App;
