import React, { useState, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate, useRoutes } from 'react-router-dom';
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

  const logout = () => {
    localStorage.clear();
    navigate('../login');
  }
  if (!user)
    return <Loadbars message="Loading Profile..." />


  return (

    <div className="justify-left h-full">

      <div className='relative pb-2 h-full justify-center items-center'>
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

              <div>

                <button
                type="button"
                

                  onClick={async () => {
                    /*global google */
                    await google.accounts.id.initialize({
                      client_id: "715016977346-6n4tjhdbi2kl65cd84er276e6u4ev71s.apps.googleusercontent.com",

                    });
                    await google.accounts.id.revoke(user.email);
                    localStorage.clear();
                    window.location = window.location.origin + "/login" // window.location.origin is the scheme+thehost+port

                  }}

                >
                  Logout

                </button>

              </div>
            </div>

          </div>

        </div>

      </div>
    //  </div>
  )
}

export default Profile