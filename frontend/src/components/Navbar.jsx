import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {IoMdAdd, IoMdSearch} from 'react-icons/io';

const Navbar = ({user, searchTerm, setSearchTerm}) => {
  const navigate = useNavigate();

  // don't show navbar if user doesn't exist
  if (!user) return null;

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
        {/* search bar */}
        <IoMdSearch fontSize={21} className='ml-1'/>
        <input 
          type='text' 
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search'
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className='p-2 w-full bg-white outline-none'
        />
      </div>
      <div className='flex gap-3'>
        {/* show user profile next to search on large screens */}
        <Link to={`profile/${user?._id}`} className='hidden md:block'>
          <img src={user.image}  referrerPolicy="no-referrer" alt='user' className='w-12 h-12 rounded-full object-cover'/>
        </Link>
        {/* make post button */}
        <Link to='make-post' className='bg-cyan text-black rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
          <IoMdAdd/>
        </Link>
      </div>
    </div>
  )
}

export default Navbar