"use client"

import { useState, useEffect } from "react"
import styles from '../styles/todo.module.css';


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
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div>
          <h2 className={styles.categoryTitle}>📂 หมวดหมู่</h2>
          <ul className={styles.categoryList}>
            {categories.map((cat) => {
              const catTasks = tasks.filter((task) => task.category === cat)
              const completedCount = catTasks.filter((task) => task.done).length
              return (
                <li
                  key={cat}
                  className={`${styles.categoryItem} ${
                    selectedCategory === cat ? styles.categoryItemSelected : ""
                  }`}
                >
                  <span onClick={() => setSelectedCategory(cat)} className={styles.categoryItemText}>
                    {cat} ({completedCount}/{catTasks.length})
                  </span>
                  {categories.length > 1 && (
                    <button
                      className={styles.deleteCategoryBtn}
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

        <div className={styles.addCategoryContainer}>
          <input
            type="text"
            placeholder="เพิ่มหมวดหมู่..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
            className={styles.categoryInput}
          />
          <button
            onClick={addCategory}
            className={styles.secondaryButton}
          >
            เพิ่มหมวดหมู่
          </button>
        </div>

        <div className={styles.statsCard}>
          <h3 className={styles.statsTitle}>📊 สถิติ</h3>
          <div className={styles.statsText}>
            เสร็จแล้ว: {stats.completed}/{stats.total}
          </div>
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <h1 className={styles.mainTitle}>📝 {selectedCategory}</h1>

        <div className={styles.addTaskCard}>
          <div className={styles.addTaskForm}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="เพิ่มงานใหม่..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                className={styles.textInput}
              />
              <button
                onClick={addTask}
                className={styles.primaryButton}
              >
                เพิ่ม
              </button>
            </div>
            <div className={styles.inputGroup}>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as "low" | "medium" | "high")}
                className={styles.selectInput}
              >
                <option value="low">🟢 ความสำคัญต่ำ</option>
                <option value="medium">🟡 ความสำคัญปานกลาง</option>
                <option value="high">🔴 ความสำคัญสูง</option>
              </select>
              <input
                type="date"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                className={styles.dateInput}
              />
            </div>
          </div>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="🔍 ค้นหางาน..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.taskList}>
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`${styles.taskItem} ${task.done ? styles.taskItemDone : ""}`}
            >
              <div className={styles.taskItemContent}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className={styles.taskCheckbox}
                />

                <div className={styles.taskTextContainer}>
                  {editingTask === task.id ? (
                    <div className={styles.editTaskContainer}>
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEditTask(task.id)
                          if (e.key === "Escape") cancelEdit()
                        }}
                        className={styles.editInput}
                        autoFocus
                      />
                      <button onClick={() => saveEditTask(task.id)} className={`${styles.iconButton} ${styles.saveButton}`}>
                        ✓
                      </button>
                      <button onClick={cancelEdit} className={`${styles.iconButton} ${styles.cancelButton}`}>
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span
                        className={`${styles.taskText} ${task.done ? styles.taskTextDone : ""}`}
                        onDoubleClick={() => startEditTask(task.id, task.text)}
                      >
                        {task.text}
                      </span>
                      <div className={styles.taskMeta}>
                        <span className={styles.taskMetaText}>{getPriorityIcon(task.priority)}</span>
                        {task.dueDate && (
                          <span className={styles.taskMetaText}>
                            📅 {task.dueDate.toLocaleDateString("th-TH")}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.taskActions}>
                  {editingTask !== task.id && (
                    <button
                      onClick={() => startEditTask(task.id, task.text)}
                      className={`${styles.iconButton} ${styles.editButton}`}
                    >
                      ✏️
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className={`${styles.iconButton} ${styles.deleteButton}`}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className={styles.noTasksMessage}>
              {searchTerm ? "ไม่พบงานที่ค้นหา" : "ยังไม่มีงานในหมวดหมู่นี้"}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}