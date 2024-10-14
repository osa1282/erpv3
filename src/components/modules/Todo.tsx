import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function Todo() {
  const [todos, setTodos] = useState([
    { id: 1, task: "Complete project proposal", completed: false },
    { id: 2, task: "Review client feedback", completed: true },
    { id: 3, task: "Prepare presentation", completed: false },
  ])
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTodos([...todos, { id: Date.now(), task: newTask, completed: false }])
      setNewTask("")
    }
  }

  const toggleTask = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTask = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Todo</h2>
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
          <CardDescription>Enter a new task and click Add</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input 
              placeholder="Enter new task" 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button onClick={addTask}>Add</Button>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-2">
        {todos.map((todo) => (
          <Card key={todo.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={todo.completed}
                  onCheckedChange={() => toggleTask(todo.id)}
                />
                <span className={todo.completed ? "line-through" : ""}>{todo.task}</span>
              </div>
              <Button variant="destructive" size="sm" onClick={() => deleteTask(todo.id)}>Delete</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}