import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/User/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import RequestEvent from './pages/User/RequestEvent';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/user/dashboard' element={<Dashboard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/user/request-event" element={<RequestEvent />} />
        </Routes>
      </Router>
  )
}

export default App
