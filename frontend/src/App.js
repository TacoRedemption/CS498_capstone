import React from 'react'
import {Routes, Route, useNavigate }from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import {GoogleOAuthProvider} from '@react-oauth/google';

 
const App = () => {
  return (
    <GoogleOAuthProvider client_id='715016977346-6n4tjhdbi2kl65cd84er276e6u4ev71s.apps.googleusercontent.com'>
    <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="/*" element={<Home/>}/>
    </Routes>
    </GoogleOAuthProvider>
    
  )
}

export default App