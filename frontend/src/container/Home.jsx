import React, {useState, useRef, useEffect} from 'react';
import {HiMenu} from 'react-icons/hi';
import {AiFillCloseCircle} from 'react-icons/ai';
import {Link, Route, Routes} from 'react-router-dom';

import Feed from './Feed';
import {Sidebar, Profile} from '../components';
import {client} from '../client';
import {userQueryEmail, fetchGoogleUser, fetchUser} from '../utils/data';
import BlackLogo from '../visuals/BlackLogo.png';

const Home = () => {
  // const [user, setUser] = useState(null);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const scrollRef = useRef(null);

  // get current user from local storage
  const user = fetchUser();
  
  // start scroll at top of page
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, [])

  // get sanity user info from google user email in local storage  
  // const userInfo = fetchGoogleUser();
  // useEffect(() => {
  //   const query = userQueryEmail(userInfo?.email);
  //   client.fetch(query).then((data) => {
  //     setUser(data[0]);
  //   })
  // }, [])

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
        {/* always show sidebar if not on small screen */}
        <div className="hidden md:flex h-screen flex-initial">
          <Sidebar user={user && user}/>
        </div>
        {/* only show small shadowed sidebar on top if on small screen */}
        <div className="flex md:hidden flex-row">
          <div className="p-2 w-full flex flex-row justify-between items-center shadow-md"> {/*Shadowed navbar at top - mobile*/}
            <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)}/>
            <Link to="/">
              <img src={BlackLogo} alt="logo" className="h-12"/>
            </Link>
            <Link to={`user-profile/${user?._id}`}>
              <img src={user?.image} alt="user profile" className="w-12 h-12 rounded-full object-cover"/>
            </Link>
          </div>
          {/* show full sidebar if toggled in */}
          {toggleSidebar && (
          <div className="fixed w-2/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)}/>
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar}/>
          </div>
        )}
        </div>
        <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
          <Routes>
            <Route path="/user/profile/:userId" element={<Profile/>}/>
            <Route path="/*" element={<Feed user={user && user}/>}/>
          </Routes>
        </div>
    </div>
  )
}

export default Home