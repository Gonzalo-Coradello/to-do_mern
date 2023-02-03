import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, loading, error} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <Grid container spacing={8} justifyContent='center'>
            <Grid item>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <Typography variant='h4' gutterBottom align='center'>Sign up</Typography>
                        <TextField
                            label='Email'
                            variant='outlined'
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ display: 'block' }}
                            value={email}
                            color={error ? 'error' : 'info'}
                        />
                        <TextField
                            label='Password'
                            variant='outlined'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ display: 'block', mt: 1 }}
                            value={password}
                            color={error ? 'error' : 'info'}
                        />
                        <Button variant='contained' type='submit' disabled={loading} sx={{ display: 'block', mt: 2}}><Typography variant='body1'>Sign up</Typography></Button>
                        { error && <Paper sx={{border: '1px solid #FF1111', padding: 1, mt: 2}}><Typography variant="body2" align="center" sx={{color: '#FF1111'}}>{error}</Typography></Paper> }
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}

export default Signup