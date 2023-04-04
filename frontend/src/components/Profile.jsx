import React, { useState, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
//import { GoogleLogout } from 'react-google-login'

import { userCreatedPostsQuery, userQuery, userSavedPostsQuery } from '../utils/data.js'
import { client } from '../client.js'
import WaterfallLayout from './WaterfallLayout.jsx';
import Loadbars from './Loadbars.jsx';
import Sidebar from './Sidebar.jsx';

const randomImage = 'http://source.unsplash.com/1600x900/?art,photography'

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [text, setText] = useState('Created'); //created or saved
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userID } = useParams();

  //Fetteching user data
  useEffect(() => {
    const query = userQuery(userID);

    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      }, [userID])


  })
  if (!user)
    return <Loadbars message="Loading Profile..." />


  return (
    
    <div className="justify-left h-full">

      {/* SIDEBAR */}
      <div className="hidden md:flex h-screen flex-initial"> {/*hide on all devices except mobile*/}
        <Sidebar user={user && user}/> 
        </div>

    <div className='relative pb-2 h-full justify-center items-center'>
    <Sidebar user={user && user}/> 

      <div className='flez flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>


          <div className='flex flex-col justify-center items-center'>

            {/* FETCHES RANDOM IMAGES from unsplash.com */}
            <img
              src={randomImage}
              className="w-full g-370 2xl:h-510 shadow-lg object-cover"
              alt="banner-pic"
            />

            {/* RENDER USER PHOTO */}
            <img
              className="rounded-full w-60 h-60 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="user-pic"
            />

            <h1 className="font-bold text-3xl text-center mt-3">
              {/* RENDER USER NAME */}
              {user.username}
            </h1>


<button
type="button"
>

</button>

            {/* <div className="absolute top-o z-1 right-0 p-2">
              {userID=user._id && (
                <GoogleLogout>

                </GoogleLogout>
              )}

             </div> */}
            {/* 
<img 
            referrerPolicy="no-referrer" 
            className="w-full g-370 2xl:h-510 shadow-lg object-cover"
            alt= "banner-pic"
            /> */}

          </div>

        </div>

      </div>

    </div>
    //  </div>
  )
}

export default Profile