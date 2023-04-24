import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Profile } from './components';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <GoogleOAuthProvider client_id={process.env.REACT_APP_GOOGLE_AUTH_ID}>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="profile/:userID" element={<Profile />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </GoogleOAuthProvider>
  )
}

export default App