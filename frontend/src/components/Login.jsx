import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { fcGoogle } from 'react-icons/fc';
import video from '../visuals/Video.mp4';
import BlackLogo from '../visuals/BlackLogo.png';
const Login = () => {

/* {/* GOOGLE AUTHENTICATION START}*/
  const responseGoogle = (response) => {
    console.log(response.credential);
  }
  //NOTES:
  //useEffect HOOK: asyronous runs a function every render of the component -- is a way to run code on every render
  //The component renders initially, and also when the state changes (re-renders to update)
  //runs first but doesnt execute function until AFTRER render gets inserted to the browser. 
  //Then after rendering is done, useEffect determines what needs to be exicuted.
  
  useEffect(() => {
    //NOTES:
    //global google says that varible google is a "global variable" -- even though it's not declared anywhere in the program -- so it doesnt cause issues
    //the script pasted in index.html (on line 29) deals with how the google variable behaves.

    /*global google */
    google.accounts.id.initialize({
      client_id: "715016977346-6n4tjhdbi2kl65cd84er276e6u4ev71s.apps.googleusercontent.com",
      callback: responseGoogle
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
  },[]); 
  //,[]); <--- NOTES:
         //the array is a Dependency:Having an empty array allows for the useEffect to only run once. a an error occurs
         //If a variable if the dependency changes then it will reload the function
         //useEffect with NO Dependenceies: will run at every time a component

/* {/* GOOGLE AUTHENTICATION END}*/
  
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">

        {/* VIDEO SETTING FOR APP HOMEPAGE */}
        <video
          src={video}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        {/* ADDING A DARK OVERLAY OVER VIDEO AND INSERTING LOGO */}
        < div className="absolute flex flex-col justify-center top-0 right-0 left-0 bottom-0 bg blackOverlay">
          <div className="p-5">
            <img src={BlackLogo} width="400px" alt="BlackLogo" /> 

            {/* INSERTING GOOGLE SIGNIN BUTTON */}
            <div id="signInDiv"></div>
          </div>
        </div>
        <div className="shadow-2x1">

        </div>
      </div>
    </div>
  )
}

export default Login