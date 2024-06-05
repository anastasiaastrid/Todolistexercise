import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

interface Task {
  id: number;
  name: string | number;
  completed: boolean;
}

const Todolist: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputTask, setinputTask] = useState<string | number>("");

  const taskNames = [
    "Create Guest Experience mobile check-in",
    "Document current CI/CD process",
    "Perform Code Review for final Pillow-Talk release",
    "Implement new Color Palette from Design Team",
    "Fix image uploading process for guest check-in",
    "Provide on-boarding documentation",
  ];

  useEffect(() => {
    const screenTasks: Task[] = taskNames.map((element, index) => ({
      id: Date.now() + index,
      name: element,
      completed: false,
    }));
    setTasks(screenTasks);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputTask(e.target.value);
  };

  const handleAddTask = () => {
    if (inputTask !== "") {
      const newTask: Task = {
        id: Date.now(),
        name: inputTask,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setinputTask("");
    }
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleToggleCheck = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="--OUTER-- px-[300px] pt-[50px] min-h-screen bg-customGrey">
      <h1 className="text-center text-white text-2xl font-semibold pb-8">Chores ToDo List</h1>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center">
            {task.completed ? (
              <MdCheckBox
                className="pb-[5px] mr-2 cursor-pointer font-bold"
                style={{ color: "#2D735D", fontSize: "20px" }}
                onClick={() => handleToggleCheck(task.id)}
              />
            ) : (
              <MdCheckBoxOutlineBlank
                className="pb-[5px] mr-2 cursor-pointer font-bold"
                style={{ color: "#2D735D", fontSize: "20px" }}
                onClick={() => handleToggleCheck(task.id)}
              />
            )}
            <p className={`text-white pl-[20px] pb-[5px] ${task.completed ? "line-through" : ""}`}>{task.name}</p>

            <button onClick={() => handleDeleteTask(task.id)} className="ml-auto rounded-md">
              <RiDeleteBin6Line
                style={{
                  color: "pink",
                  fontSize: "25px",
                  padding: "5px",
                  borderRadius: "3px",
                  border: "1px solid pink",
                }}
              />
            </button>
          </div>
        ))}
      </div>
      <hr className="mt-10 border-t-[1.5px] border-gray-200 shadow-sm" />

      <div className="mt-4 text-center">
        <p className="text-white font-semibold text-2xl">Done: {tasks.filter((task) => task.completed).length}</p>
      </div>
      <div className="mt-4 flex flex-col">
        <h1 className="text-white mb-[10px]">Add todo</h1>
        <input
          type="text"
          value={inputTask}
          onChange={handleChange}
          onKeyPress={handleKeyEnter}
          className="mb-[15px] border-[0.5px] rounded-md p-2 text-white bg-transparent outline-none focus:outline"
          placeholder=""
        />
      </div>
      <div className="pb-20">
        <button onClick={handleAddTask} className="px-3 py-2 bg-customBlue text-white rounded-md">
          <h1 className="text-customGrey font-bold text-center ">ADD TASK</h1>
        </button>
      </div>
    </div>
  );
};

export default Todolist;
