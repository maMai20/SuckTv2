'use client'; // บอกว่าไฟล์นี้ทำงานฝั่ง Client (ต้องใช้เพราะมีการใช้ useState)

import { useState } from "react";
import "../globals.css"; // import CSS

// ประเภทข้อมูล Task
type Task = {
  id: number;
  text: string;
  done: boolean;
};

export default function Home() {
  // เก็บค่าข้อความ input
  const [newTask, setNewTask] = useState<string>("");

  // เก็บรายการทั้งหมด
  const [tasks, setTasks] = useState<Task[]>([]);

  // ฟังก์ชันเพิ่มงานใหม่
  const addTask = () => {
    if (newTask.trim() === "") return; // กันไม่ให้เพิ่มค่าว่าง
    const newItem: Task = {
      id: Date.now(), // id ไม่ซ้ำ
      text: newTask,
      done: false
    };
    setTasks([...tasks, newItem]);
    setNewTask("");
  };

  // ฟังก์ชัน toggle ทำเสร็จ/ยังไม่เสร็จ
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // ฟังก์ชันลบงาน
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container">
      <h1>📝 To-Do List</h1>

      {/* กล่องเพิ่มงาน */}
      <div className="input-area">
        <input
          type="text"
          placeholder="เพิ่มงาน..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>เพิ่ม</button>
      </div>

      {/* แสดงรายการงาน */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? "done" : ""}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span>{task.text}</span>
            <button className="delete" onClick={() => deleteTask(task.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
