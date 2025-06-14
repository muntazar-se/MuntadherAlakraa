import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import AdminDashboard from './Pages/AdminDashboard'
import './App.css'
import axios from "axios";
// axios.defaults.baseURL = "https://myportfolio-api.vercel.app";
// import UploadCV from './Pages/UploadCV'
import Login from './Pages/login'

function App() {
  // Use environment variable for API URL
  const apiURL = import.meta.env.VITE_API_URL;
  if (apiURL) {
    axios.defaults.baseURL = apiURL;
  }
  
  return (
    <Router>
      <div className="px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />}/>

        </Routes>
      </div>
    </Router>
  )
}

export default App
