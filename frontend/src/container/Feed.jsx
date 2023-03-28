import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';

import {Navbar, PostFeed, Post, MakePost, Search} from '../components';

const Feed = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<PostFeed/>}/>
          <Route path='/artform/:artformID' element={<PostFeed/>}/>
          <Route path='/post-details/:postID' element={<Post user={user}/>}/>
          <Route path='/make-post' element={<MakePost user={user}/>}/>
          <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Feed