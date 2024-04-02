import React, { useState } from 'react';
import "./styles.css";
import { NewTodoForm } from './NewTodoForm';
import { TodoList } from './TodoList';
import { useEffect } from 'react';
import Axios from "axios";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  const [listOfUsers, setListOfUsers] = useState([ ])
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [username, setUsername] = useState("")


  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      name, 
      age, 
      username
    }).then((response) => {
      setListOfUsers([...listOfUsers, {name, age, username}])
    })
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data)
    })

    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos((currentTodos => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title,
          completed: false
        }
      ]
    }))
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id != id)
    })
  }

  return (
  <>
    <div className="usersDisplay">
      {listOfUsers.map((user) => {
        return <div>
          Name: {user.name}
          Age: {user.age}
          Username: {user.username}
        </div>
      })
      }
    </div>

    <div>
      <input 
        type="text" 
        placeholder="Name..." 
        onChange={(event) => {setName(event.target.value)
        }}
      />
      <input 
        type="number" 
        placeholder="Age..." 
        onChange={(event) => {setAge(event.target.value)
        }}
      />
      <input 
        type="text" 
        placeholder="Username..." 
        onChange={(event) => {setUsername(event.target.value)
        }}
      />
      <button onClick={createUser}>Create User</button>
    </div>

  <NewTodoForm onSubmit={addTodo}/>
    <h1 className="header">tasks</h1>
    <TodoList 
    todos={todos}
    toggleTodo={toggleTodo}
    deleteTodo={deleteTodo}/>
  </>
  )
}