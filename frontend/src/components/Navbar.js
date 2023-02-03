import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <AppBar color='primary' position='static'>
                <Toolbar>
                    <Grid container direction={{xs: 'column', md: 'row'}} justifyContent='space-between' alignItems='center' py={3}>
                        <Button>
                            <Link to='/' style={{textDecoration: 'none'}}><Typography variant='h4' component='h1' color='white'>To-do app</Typography></Link>
                        </Button>
                        <nav>
                            <Grid container alignItems='center' spacing={2}>
                                { user && (
                                    <>
                                        <Grid item><Typography variant='body1'>{user.email}</Typography></Grid>
                                        <Grid item><Button color='inherit' variant='outlined' onClick={handleClick}>Log out</Button></Grid>
                                    </>
                                )}
                                {!user && (
                                    <>
                                        <Grid item><Link to='/login' style={{textDecoration: 'none', color: '#FFF'}}>
                                            <Button color='inherit' variant='outlined'>Login</Button>
                                        </Link></Grid>
                                        <Grid item><Link to='/signup' style={{textDecoration: 'none', color: '#FFF'}}>
                                            <Button color='inherit' variant='outlined'>Sign up</Button>
                                        </Link></Grid>
                                    </>
                                )}
                            </Grid>
                        </nav>
                    </Grid>
                </Toolbar>
            </AppBar>
        </header>
    )
}

export default Navbar