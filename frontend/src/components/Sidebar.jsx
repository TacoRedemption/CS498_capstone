import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {RiHomeFill} from 'react-icons/ri';
import {IoIosArrowForward} from 'react-icons/io';

import BlackLogo from '../visuals/BlackLogo.png';

// styles for current & non-current artform selections
const isActiveStyle = "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";
const isNotActiveStyle = "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";

// list of artform categories to browse by
const artforms = [
  {name: "Abstract"},
  {name: "Modern"},
  {name: "Impressionism"},
  {name: "Pop"},
  {name: "Cubism"},
  {name: "Surrealism"},
  {name: "Realism"},
  {name: "Other"},
]

// navigation sidebar
const Sidebar = ({user, closeToggle}) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  }

  return (
    // sidebar
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar" onClick={handleCloseSidebar}>
      <div className="flex flex-col">
        {/* show logo */}
        <Link to="/" className="flex px-5 gap-2 my-6 pt-1 w-190 items-center">
          <img src={BlackLogo} alt="logo" className="w-full"/>
        </Link>
        {/* show links */}
        <div className="flex flex-col gap-5">
          {/* link to home */}
          <NavLink to="/" className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle} onClick={handleCloseSidebar}>
            <RiHomeFill/>
            Home
          </NavLink>
          {/* show artform links section */}
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover by artform
          </h3>
          {/* show all artform links (exclude other) */}
          {artforms.slice(0, artforms.length - 1).map((artform) => (
            <NavLink to={`/artform/${artform.name}`} className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle} onClick={handleCloseSidebar}
            key={artform.name}>
              {artform.name}
            </NavLink>
          ))}
        </div>
      </div>
      {/* if logged in show user profile at bottom */}
      {user && (
        <Link to={`user-profile/${user._id}`} className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3" onClick={handleCloseSidebar}>
          <img src={user.image} className="w-10 h-10 rounded-full" alt="user profile"/>
          <p>{user.username}</p>
        </Link>
      )}
    </div>
  )
}

export default Sidebar