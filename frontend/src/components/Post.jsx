import React from 'react'
import {urlFor} from '../client'

const Post = ({post: {author, image, _id, destination}}) => {
  return (
    <div>
      <img className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(250).url()}/>
    </div>
  )
}

export default Post