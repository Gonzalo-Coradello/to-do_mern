import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useTasksContext } from "../hooks/useTasksContext"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"

const TaskForm = () => {
    const { dispatch } = useTasksContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return
        }

        const task = {title, description}

        const response = await fetch('https://to-do-backend-v1k0.onrender.com/api/tasks', {
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
            setError(null)
            setEmptyFields([])
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    }     

    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <Typography variant="h4" gutterBottom align="center">Add a new task</Typography>
                {/* <label>Task title:</label> */}
                <TextField
                    label='Title'
                    variant="outlined"
                    value={title}
                    color={emptyFields.includes('title') ? 'error' : 'info'}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ display: 'block' }}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />
            
                <TextField
                    label='Description'
                    variant="outlined"
                    value={description}
                    color={emptyFields.includes('description') ? 'error' : 'info'}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ display: 'block', mt: 1 }}
                    className={emptyFields.includes('description') ? 'error' : ''}
                />
            <Button variant='contained' type="submit" sx={{ display: 'block', mt: 2}}><Typography variant="body1">Add task</Typography></Button>
            { error && <Paper sx={{border: '1px solid #FF1111', padding: 1, mt: 2}}><Typography variant="body2" align="center" sx={{color: '#FF1111'}}>{error}</Typography></Paper> }
            </FormControl>
        </form>
    )
}

export default TaskForm