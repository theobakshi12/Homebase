import React, { useState } from 'react';
import { useEffect } from 'react';
import Axios from "axios";
import { TodoItem } from './TodoItem';
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState([ ])
  const [newContent, setNewContent] = useState("")

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = () => {
    Axios.get("http://localhost:3001/getTodos").then((response) => {
      setTodos(response.data)
    })
  }

  const addTodo = (e) => {
    e.preventDefault()
    const tempId = Date.now()
    const newTodo = { _id: tempId, content: newContent, completetd: false }
    
    setTodos([...todos, newTodo])

    Axios.post("http://localhost:3001/addTodo", {content: newContent, completed: false })
      .then((response) => {
        setTodos((currentTodos) =>
        currentTodos.map((todo) => (todo.id === tempId ? response.data : todo))
        )
      })
      .catch((error) => {
        console.error("Failed to add todo: ", error)

        setTodos((currentTodos) => currentTodos.filter((todo) => todo._id !== tempId))
      })
  }

  function toggleTodo(id) {
    const currentTodo = todos.find(todo => todo._id === id);
    if (!currentTodo) {
      console.error("Todo not found");
      return;
    }

    const completedStatus = currentTodo.completed;

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo._id === id ? { ...todo, completed: !completedStatus } : todo
      )
    )

    Axios.patch("http://localhost:3001/updateTodo/" + id, { completed: !completedStatus })
    .catch((error) => {
      // Revert if there's an error
      console.error("Failed to update todo:", error);
      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
    })
  }

  function deleteTodo(id) {
    const removedTodo = todos.find((todo) => todo._id === id)

    setTodos((currentTodos) => currentTodos.filter((todo) => todo._id !== id))

    Axios.delete("http://localhost:3001/deleteTodo/" + id)
      .catch((error) => {
        console.error("Failed to delete todo: ", error)

        setTodos((currentTodos) => [...currentTodos, removedTodo])
    })
  }

  return (
  <>
  <form onSubmit={addTodo} className="new-item-form">
    <div className="form-row">
      <label htmlFor="item">new item</label>
      <input 
        value={newContent} 
        onChange={e => setNewContent(e.target.value)} 
        type="text" 
        id="item"
      />
    </div>
    <button className="btn">add</button>
  </form>
    <h1 className="header">tasks</h1>
    <ul className="list">
      {todos.length === 0 && "nothing to do"}
      {todos.map(todo => {
        return (
        <TodoItem 
        {...todo} 
        key={todo._id} 
        toggleTodo={toggleTodo} 
        deleteTodo={deleteTodo}
        />
        )
      })}
    </ul>
  </>
  )
}