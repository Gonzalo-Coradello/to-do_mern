import { useTasksContext } from '../hooks/useTasksContext'
import formateDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'

const TaskDetails = ({ task }) => {
    const [completed, setCompleted] = useState(task.completed)
    const { dispatch } = useTasksContext()
    const { user } = useAuthContext()

    const handleDelete = async () => {
        if(!user) {
            return
        }

        const response = await fetch('http://localhost:4000/api/tasks/' + task._id, {
        // const response = await fetch('https://to-do-backend-v1k0.onrender.com/api/tasks/' + task._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_TASK', payload: json})
        }
    }

    const handleCheck = async () => {
        if(!user) {
            return
        }

        const response = await fetch('http://localhost:4000/api/tasks/' + task._id, {
        // const response = await fetch('https://to-do-backend-v1k0.onrender.com/api/tasks/' + task._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                completed: !completed
            })
        })
        const json = await response.json()

        if(response.ok) {
            setCompleted(!completed)
            dispatch({type: 'UPDATE_TASK', payload: json})
        }
    }

   return (
    <div className="task-details">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <p>{formateDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</p>
        {completed ? 
            <span className='material-symbols-outlined' onClick={handleCheck}>cancel</span> :
            <span className='material-symbols-outlined' onClick={handleCheck}>check_circle</span>
        }
        
        <span className='material-symbols-outlined' onClick={handleDelete}>delete</span>
    </div>
   )
}

export default TaskDetails