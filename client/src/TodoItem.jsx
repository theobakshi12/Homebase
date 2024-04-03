export function TodoItem({_id, content, completed, toggleTodo, deleteTodo}) {
    return (
        <li>
          <label>
            <input type="checkbox" checked={completed}
            onChange={e => toggleTodo(_id, e.target.checked)}/>
            {content}
          </label>
          <button onClick={() => deleteTodo(_id)}
          className="btn btn-danger">
            delete
            </button>
        </li>
    )
}