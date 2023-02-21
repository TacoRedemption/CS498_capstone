import React, {useState, useRef, useEffect} from 'react';
import {HiMenu} from 'react-icons/hi';
import {AiFillCloseCircle} from 'react-icons/ai';
import {Link, Route, Routes} from 'react-router-dom';

import Feed from './Feed';
import {Sidebar, Profile} from '../components';
//import {client} from '../client';
import {userQuery} from '../utils/data';

import BlackLogo from '../visuals/BlackLogo.png';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  //const scrollRef = userRef(null);

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  
  // start scroll at top of page
  // useEffect(() => {
  //   scrollRef.current.scrollTo(0, 0);
  // }, [])

  // fetch data of current user
  // useEffect(() => {
  //   const query = userQuery(userInfo?.googleID);
  //   client.fetch(query).then((data) => {
  //     setUser(data[0]);
  //   })
  // }, [])

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
        <div className="hidden md:flex h-screen flex-initial"> {/*hide on all devices except mobile*/}
          <Sidebar user={user && user}/>
        </div>
        <div className="flex md:hidden flex-row"> {/*show on all devices except mobile*/}
          <div className="p-2 w-full flex flex-row justify-between items-center shadow-md"> {/*Shadowed navbar at top - mobile*/}
            <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)}/>
            <Link to="/">
              <img src={BlackLogo} alt="logo" className="h-12"/>
            </Link>
            <Link to={`user-profile/${user?._id}`}>
              <img src={user?.image} alt="profile picture" className="h-12"/>
            </Link>
          </div>
          {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)}/>
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar}/>
          </div>
        )}
        </div>
        <div className="pb-2 flex-1 h-screen overflow-y-scroll" > {/*ref={scrollRef}*/}
          <Routes>
            {/*<Route path="/user/profile/:userId" element={<UserProfile/>}/>*/}
            <Route path="/*" element={<Feed user={user && user}/>}/>
          </Routes>
        </div>
    </div>
  )
}

export default Home