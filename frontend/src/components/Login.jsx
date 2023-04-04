import React, { useEffect } from 'react'
import { json, useNavigate } from 'react-router-dom';
import { FcGoogle, fcGoogle } from 'react-icons/fc';
import video from '../visuals/Video.mp4';
import BlackLogo from '../visuals/BlackLogo.png';

import { client } from '../client.js';
import { GoogleLogin } from '@react-oauth/google';
const Login = () => {

  const navigate = useNavigate();

  /* {/* GOOGLE AUTHENTICATION START}*/
  const responseGoogle = (response) => {
    console.log(response);

    localStorage.setItem('credential', response.credential) // remebering who logged in
    const jwtParts = response.credential.split('.') // spliting JWT by dot (it has 3 parts) 
    const decodedPublicClaims = atob(jwtParts[1]) // base 64 decoded public claims as a string
    const publicClaims = JSON.parse(decodedPublicClaims) // parsing public claims from string to JSON
    const { name, email, picture } = publicClaims;
    console.log({ name, email, picture })
    //const {name, googleId, ImageUrl} = response.profileObj;

    
    //CREATING A NEW SANITY DOCUMENT OBJ TO STORE THE ABOVE DATA
    const doc = {
      _id:  crypto.randomUUID(),
      _type: 'user',
      username: name,
      image: picture,
      email: email,
    }
    
    client.fetch(`*[_type == "user" && email == "${email}"]`) //Query the backend for users having the given email
      .then(users => {

        //if theres no user with that email -- we create one
        if (!users.length){
          return client.create(doc);


          //if there is one user we will return the one user
        } else if (1 === users.length){
            return users[0];
          
            //if there is more than one user -- throws error
        } else {
          throw new Error('too many users matching this email!!!')
        }
      })
      .then(() =>  navigate('/', { replace: true }), console.error)

   
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
      { theme: "outline", size: "large" }
    );
  }, []);
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


        {/* ADDING A DARK OVERLAY OVER VIDEO AND INSERTING LOGO  */}
 < div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg blackOverlay">
           <div className="p-5 bg-white rounded-lg">
           <img src={BlackLogo} width="400px" alt="BlackLogo" />

            {/* INSERTING GOOGLE SIGNIN BUTTON  */}
            <div id="signInDiv" className='flex justify-center'></div>
          </div> 
          </div> 




        
        </div>
        <div className="shadow-2x1">

        </div>
      </div>
  )
}

export default Login