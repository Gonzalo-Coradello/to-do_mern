import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import { CssBaseline } from '@mui/material'


function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <CssBaseline />
        <Box minHeight='85vh' display="flex" flexDirection="column" justifyContent='center' pt={10} bgcolor='whiteSmoke'>
          <Container maxWidth='lg'>
            <Routes>
              <Route 
                path='/'
                element={user ? <Home /> : <Navigate to='/login' />}
              />
              <Route 
                path='/login'
                element={!user ? <Login /> : <Navigate to='/' />}
              />
              <Route 
                path='/signup'
                element={!user ? <Signup /> : <Navigate to='/' />}
              />
            </Routes>
          </Container>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
