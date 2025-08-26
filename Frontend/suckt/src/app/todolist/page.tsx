"use client"

import { useState, useEffect } from "react"
import styles from '../styles/Todolist.css';


type Task = {
  id: number
  text: string
  done: boolean
  category: string
  createdAt: Date
  dueDate?: Date
  priority: "low" | "medium" | "high"
}

export default function Home() {
  const [newTask, setNewTask] = useState<string>("")
  const [newTaskDueDate, setNewTaskDueDate] = useState<string>("")
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high">("medium")
  const [tasks, setTasks] = useState<Task[]>([])
  const [categories, setCategories] = useState<string[]>(["การเรียน", "งานบ้าน", "อื่น ๆ"])
  const [selectedCategory, setSelectedCategory] = useState<string>("การเรียน")
  const [newCategory, setNewCategory] = useState<string>("")
  const [editingTask, setEditingTask] = useState<number | null>(null)
  const [editText, setEditText] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    const savedTasks = localStorage.getItem("todolist-tasks")
    const savedCategories = localStorage.getItem("todolist-categories")
    const savedSelectedCategory = localStorage.getItem("todolist-selected-category")

    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      }))
      setTasks(parsedTasks)
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    }

    if (savedSelectedCategory) {
      setSelectedCategory(savedSelectedCategory)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todolist-tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("todolist-categories", JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    localStorage.setItem("todolist-selected-category", selectedCategory)
  }, [selectedCategory])

  const addTask = () => {
    if (newTask.trim() === "") return
    const newItem: Task = {
      id: Date.now(),
      text: newTask.trim(),
      done: false,
      category: selectedCategory,
      createdAt: new Date(),
      dueDate: newTaskDueDate ? new Date(newTaskDueDate) : undefined,
      priority: newTaskPriority,
    }
    setTasks([...tasks, newItem])
    setNewTask("")
    setNewTaskDueDate("")
    setNewTaskPriority("medium")
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const addCategory = () => {
    const cat = newCategory.trim()
    if (!cat || categories.includes(cat)) return
    setCategories([...categories, cat])
    setNewCategory("")
  }

  const deleteCategory = (cat: string) => {
    if (categories.length === 1) return
    if (!confirm(`ต้องการลบหมวดหมู่ "${cat}" และงานทั้งหมดหรือไม่?`)) return
    setCategories(categories.filter((c) => c !== cat))
    setTasks(tasks.filter((task) => task.category !== cat))
    if (selectedCategory === cat) {
      setSelectedCategory(categories.find((c) => c !== cat) || "")
    }
  }

  const startEditTask = (id: number, currentText: string) => {
    setEditingTask(id)
    setEditText(currentText)
  }

  const saveEditTask = (id: number) => {
    if (editText.trim() === "") return
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: editText.trim() } : task)))
    setEditingTask(null)
    setEditText("")
  }

  const cancelEdit = () => {
    setEditingTask(null)
    setEditText("")
  }

  const getFilteredTasks = () => {
    let filteredTasks = tasks.filter((task) => task.category === selectedCategory)

    if (searchTerm.trim()) {
      filteredTasks = filteredTasks.filter((task) => task.text.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    return filteredTasks.sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }

  const getStats = () => {
    const categoryTasks = tasks.filter((task) => task.category === selectedCategory)
    const completed = categoryTasks.filter((task) => task.done).length
    const total = categoryTasks.length
    return { completed, total }
  }

  const stats = getStats()
  const filteredTasks = getFilteredTasks()

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return "🔴"
      case "medium":
        return "🟡"
      case "low":
        return "🟢"
      default:
        return "⚪"
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="w-80 bg-sidebar border-r border-sidebar-border p-6 flex flex-col gap-6 flex-shrink-0">
        <div>
          <h2 className="text-lg font-semibold text-sidebar-foreground mb-4 flex items-center gap-2">📂 หมวดหมู่</h2>
          <ul className="space-y-2">
            {categories.map((cat) => {
              const catTasks = tasks.filter((task) => task.category === cat)
              const completedCount = catTasks.filter((task) => task.done).length
              return (
                <li
                  key={cat}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : "hover:bg-sidebar-accent/10 text-sidebar-foreground"
                  }`}
                >
                  <span onClick={() => setSelectedCategory(cat)} className="flex-1 text-sm font-medium">
                    {cat} ({completedCount}/{catTasks.length})
                  </span>
                  {categories.length > 1 && (
                    <button
                      className="text-sidebar-accent hover:scale-110 transition-transform ml-2 flex-shrink-0"
                      onClick={() => deleteCategory(cat)}
                    >
                      ✕
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="เพิ่มหมวดหมู่..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={addCategory}
            className="w-full px-4 py-2 bg-sidebar-primary text-sidebar-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            เพิ่มหมวดหมู่
          </button>
        </div>

        <div className="bg-card rounded-lg p-4 border border-border">
          <h3 className="text-sm font-semibold text-card-foreground mb-2">📊 สถิติ</h3>
          <div className="text-sm text-muted-foreground">
            เสร็จแล้ว: {stats.completed}/{stats.total}
          </div>
          <div className="mt-2 bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 min-w-0">
        <h1 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">📝 {selectedCategory}</h1>

        <div className="bg-card rounded-xl p-6 border border-border mb-6 shadow-sm">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="เพิ่มงานใหม่..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                className="flex-1 px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring min-w-0"
              />
              <button
                onClick={addTask}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex-shrink-0"
              >
                เพิ่ม
              </button>
            </div>
            <div className="flex gap-3">
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as "low" | "medium" | "high")}
                className="flex-1 px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              >
                <option value="low">🟢 ความสำคัญต่ำ</option>
                <option value="medium">🟡 ความสำคัญปานกลาง</option>
                <option value="high">🔴 ความสำคัญสูง</option>
              </select>
              <input
                type="date"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                className="flex-1 px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 ค้นหางาน..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-card rounded-lg p-4 border border-border shadow-sm transition-all duration-200 hover:shadow-md ${
                task.done ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-ring"
                />

                <div className="flex-1">
                  {editingTask === task.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEditTask(task.id)
                          if (e.key === "Escape") cancelEdit()
                        }}
                        className="flex-1 px-3 py-1 bg-input border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
                        autoFocus
                      />
                      <button onClick={() => saveEditTask(task.id)} className="text-primary hover:opacity-70">
                        ✓
                      </button>
                      <button onClick={cancelEdit} className="text-destructive hover:opacity-70">
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span
                        className={`text-card-foreground ${task.done ? "line-through" : ""} cursor-pointer`}
                        onDoubleClick={() => startEditTask(task.id, task.text)}
                      >
                        {task.text}
                      </span>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs">{getPriorityIcon(task.priority)}</span>
                        {task.dueDate && (
                          <span className="text-xs text-muted-foreground">
                            📅 {task.dueDate.toLocaleDateString("th-TH")}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {editingTask !== task.id && (
                    <button
                      onClick={() => startEditTask(task.id, task.text)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ✏️
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-destructive hover:opacity-70 transition-opacity"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              {searchTerm ? "ไม่พบงานที่ค้นหา" : "ยังไม่มีงานในหมวดหมู่นี้"}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
