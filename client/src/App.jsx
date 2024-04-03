import React, { useState } from 'react';
import "./styles.css";
import { NewTodoForm } from './NewTodoForm';
import { TodoList } from './TodoList';
import { useEffect } from 'react';
import Axios from "axios";

export default function App() {
  const [todos, setTodos] = useState([ ])
  const [newTodo, setNewTodo] = useState("")

  const getTodos = () => {
    Axios.get("http://localhost:3001/getTodos").then((response) => {
      setTodos(response.data)
    })
  }

  const addTodo = () => {
    Axios.post("http://localhost:3001/addTodo", {
      content: newTodo
    }).then((response) => {
      const addedTodo = response.data
      setTodos([...todos, addedTodo])
      setNewTodo("") //clear input
    }).catch((error) => {
      console.error("Failed to add todo:", error)
    })
  }

  useEffect(() => {
    getTodos()
  }, [])

  function toggleTodo(id, completed) {
    Axios.get("http://localhost:3001/updateTodo").then((response) => {
      setTodos(
        response.data.map(todo => {
          if (todo.id === id) {
            return { ...todo, completed }
          }
  
          return todo
        })
      )
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id != id)
    })
  }

  return (
  <>
  <NewTodoForm onSubmit={addTodo}/>
    <h1 className="header">tasks</h1>
    <TodoList 
    todos={todos}
    toggleTodo={toggleTodo}
    deleteTodo={deleteTodo}
    />
  </>
  )
}