import { useTasksContext } from '../hooks/useTasksContext'
import formateDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'

const TaskDetails = ({ task }) => {
    const { dispatch } = useTasksContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if(!user) {
            return
        }

        const response = await fetch('https://to-do-backend-v1k0.onrender.com/api/tasks/' + task._id, {
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

   return (
    <div className="task-details">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <p>{formateDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</p>
        <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
   )
}

export default TaskDetails