import { useEffect } from "react"
import { useTasksContext } from '../hooks/useTasksContext'
import { useAuthContext } from '../hooks/useAuthContext'
import Grid from "@mui/material/Grid"

// components
import TaskDetails from '../components/TaskDetails'
import TaskForm from '../components/TaskForm'

const Home = () => {

    const { tasks, dispatch } = useTasksContext()
    const {user} =  useAuthContext()

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('https://to-do-backend-v1k0.onrender.com/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok) {
                dispatch({type: 'SET_TASKS', payload: json})
            }
        }

        if(user) fetchTasks()

    }, [dispatch, user])

    return (
        <Grid container spacing={8} justifyContent='space-between' direction={{xs: 'column-reverse', md: 'row'}}>
            <Grid item xs={12} md={8}>
                { tasks && tasks.map(task => (
                    <TaskDetails key={task._id} task={task} />
                ))}
            </Grid>
            <Grid container item xs={12} md={4} justifyContent='center' >
                <TaskForm />
            </Grid>
        </Grid>
    )
}

export default Home