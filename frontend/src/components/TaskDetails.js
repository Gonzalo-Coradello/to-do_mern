import { useTasksContext } from '../hooks/useTasksContext'
import formateDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import DeleteIcon from '@mui/icons-material/Delete'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'

const TaskDetails = ({ task }) => {
    const [completed, setCompleted] = useState(task.completed)
    const { dispatch } = useTasksContext()
    const { user } = useAuthContext()

    const handleDelete = async () => {
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

    const handleCheck = async () => {
        if(!user) {
            return
        }

        const response = await fetch('https://to-do-backend-v1k0.onrender.com/api/tasks/' + task._id, {
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
    <Card sx={completed ? {my: 2, backgroundColor: 'whitesmoke', color: 'lightslategray', textDecoration: 'line-through'} : {my: 2}}>
        <Grid container justifyContent={{xs: 'center', md: 'space-between'}} alignItems='center' direction={{xs: "column", md: "row"}} paddingX={4}>
            <Grid item>
                <CardContent sx={{textAlign: {xs: 'center', md: 'left'}}}>
                    <Typography variant='h5' gutterBottom>{task.title}</Typography>
                    <Typography variant='body1' paragraph>{task.description}</Typography>
                    <Typography variant='body2'>{formateDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</Typography>
                </CardContent>
            </Grid>
            <Grid item>
                <Grid container justifyContent='center'>
                    <CardActions>
                        {completed ?
                            <IconButton onClick={handleCheck}><CancelOutlinedIcon fontSize='medium' /></IconButton> :
                            <IconButton onClick={handleCheck}><CheckCircleOutlinedIcon fontSize='medium' /></IconButton>
                        }
                        <IconButton onClick={handleDelete}><DeleteIcon fontSize='medium' /></IconButton>
                    </CardActions>
                </Grid>
            </Grid>
        </Grid>
    </Card>
   )
}

export default TaskDetails