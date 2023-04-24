import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useRoutes } from 'react-router-dom';
import { userCreatedPostsQuery, userQuery, userSavedPostsQuery } from '../utils/data.js'
import { client } from '../client.js'
import WaterfallLayout from './WaterfallLayout.jsx';
import Loadbars from './Loadbars.jsx';
import Sidebar from './Sidebar.jsx';


const randomImage = 'http://source.unsplash.com/1600x900/?art,photography'

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

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
      })
  }, [userID])

  // FETCHING THE SAVED POSTS AND CREATED POSTS
  useEffect(() => {

    //IF TEXT IS EQUALT TO CREATED WE SEARCH THE CREATED PINS
    if (text === 'Created') {
      const createdPostsQuery = userCreatedPostsQuery(userID);

      client.fetch(createdPostsQuery).then((data) => {
        setPosts(data);
      });
    } else {
      //SEARCH FOR SAVED POSTS
      const savedPostsQuery = userSavedPostsQuery(userID);

      client.fetch(savedPostsQuery).then((data) => {
        setPosts(data);
      });
    }
  }, [text, userID]);


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
                referrerPolicy="no-referrer"
                alt="user-pic"
              />

              <h1 className="font-bold text-3xl text-center mt-3">
                {/* RENDER USER NAME */}
                {user.username}
              </h1>

              <div>
              </div>

              <div className="text-center mb-7">

                {/* CREATE POST BUTTON */}
                <button
                  type="button"
                  onClick={(e) => {
                    setText(e.target.textContent);
                    setActiveBtn('created');
                  }}
                  className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
                >
                  Created
                </button>

                {/* SAVE POST BUTTON */}
                <button
                  type="button"
                  onClick={(e) => {
                    setText(e.target.textContent);
                    setActiveBtn('saved');
                  }}
                  className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
                >
                  Saved
                </button>

                {/* LOGOUT BUTTON */}
                <button
                  type="button"
                  className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"

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

              {/* PULLING POST ONTO PROFILE PAGE */}
              <div className="px-2">
                <WaterfallLayout posts={posts} />
              </div>

              {posts?.length === 0 && (
                <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
                  No Posts Found!
                </div>
              )};

            </div>
          </div>
        </div>

      </div>
    //  </div>
  )
}

export default Profile