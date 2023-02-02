import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useTasksContext } from "../hooks/useTasksContext"

const TaskForm = () => {
    const { dispatch } = useTasksContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return
        }

        const task = {title, description, completed}

        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setTitle('')
            setDescription('')
            setCompleted(false)
            setError(null)
            setEmptyFields([])
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    } 


    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new task</h3>

            <label>Task title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Description:</label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <label>Completed:</label>
            <input 
                type="checkbox"
                onChange={(e) => setCompleted(e.target.value)}
                value={completed}
            />

        <button>Add task</button>
        { error && <div className="error">{error}</div> }
        </form>
    )
}

export default TaskForm