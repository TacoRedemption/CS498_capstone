import React from 'react'
import { useNavigate } from 'react-router-dom';
import {fcGoogle } from 'react-icons/fc';
import {GoogleOAuthProvider} from '@react-oauth/google';

import video from '../visuals/Video.mp4';
import BlackLogo from '../visuals/BlackLogo.png';


const Login = () => {
  const responseGoogle=(response) =>{
    
  }
  return (
    <div className= "flex justify-start items-center flex-col h-screen">
      <div className= "relative w-full h-full">
      {/* VIDEO SETTING FOR APP HOMEPAGE */}
        <video
        src={video}
        type="video/mp4"
        Loop
        controls={false}
        muted
        autoPlay
        className="w-full h-full object-cover"
        />

        {/* ADDING A DARK OVERLAY OVER VIDEO AND INSERTING LOGO */}
        < div className= "absolute flex flex-col justify-center top-0 right-0 left-0 bottom-0 bg blackOverlay">
          <div className="p-5">
          <img src={BlackLogo} width ="400px" alt="BlackLogo"/>
          </div>     
        </div>

      {/* GOOGLE AUTHENTICATION */}
        <div className="shadow-2xl">
          <GoogleOAuthProvider
          clientId='process.env.REACT_APP_GOOGLE_API_TOKEN'

          //call back functions 
          render={(renderProps) =>(

            <button 
               type="button" 
               className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
               onClick={renderProps.onClick}
               disabled={renderProps.disabled}
              >
               <fcGoogle className="mr-4"/> Sign in with Google
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
          />
        </div>
        
        
      <div className="shadow-2x1">

      </div>
       </div> 
    </div>
  )
}

export default Login