import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {v4 as uuid4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete, AITwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'

import {client, urlFor} from '../client'
import {fetchUser} from '../utils/fetchUser'

// component for individual post display
const Post = ({post: {author, image, _id, destination, save}}) => {
  const [postHover, setPostHover] = useState(false);
  const [toSavePost, setToSavePost] = useState(false);
  const navigate = useNavigate();

  const userInfo = fetchUser();
  // check if user has saved a given post
  const saved = (save?.filter((item) => item.author._id === userInfo.googleId))?.length;
  
  // function for a user to save a post
  const savePost = (id) => {
    if (!saved) {
      setToSavePost(true);

      client.patch(id).setIfMissing({save: []}).insert('after', 'save[-1]', [{
        key: uuid4(),
        userID: userInfo.googleId,
        author: {
          _type: 'author',
          _ref: userInfo.googleId,
        }
      }]).commit().then(() => {
        window.location.reload();
        setToSavePost(false);
      })
    }
  }

  // delete a post from the database
  const deletePost = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    })
  }

  return (
    <div className='m-2'>
      {/* div containing post images with hover functionality */}
      <div
        onMouseEnter={() => setPostHover(true)}
        onMouseLeave={() => setPostHover(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'>

        <img className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(250).url()}/>
        {/* show icons if hovering over post */}
        {postHover && (
          <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                {/* link for downloading image */}
                <a href={`${image?.asset?.url}?dl=`} 
                  download 
                  // onClick={(e) => e.stopPropagation()}
                  className='bg-white w-9 h-9 rounded flex items-center justify-center text-xl opacity-85 hover:opacity-100 hover:shadow-md'>
                  
                  <MdDownloadForOffline/> {/* download icon */}
                </a>
              </div>
              {/* check if user has already saved this post */}
              {saved ? (
                // show if saved & how many have saved
                <button type='button' className='bg-cyan opacity-85 hover:opacity-100 text-white font-bold px-3 py-1 text-base rounded hover:shadow-md'>
                  {save?.length} Saved
                </button>
              ) : (
                // show if not saved
                <button onClick={(e) => {
                  // e.stopPropagation();
                  savePost(_id);
                }}
                  type='button' className='bg-cyan opacity-85 hover:opacity-100 text-white font-bold px-3 py-1 text-base rounded hover:shadow-md'>
                  {toSavePost ? 'Saving...' : 'Save'}
                </button>
              )}
            </div>
            <div className='flex justify-between items-center gap-2 w-full'>
                {/* show image link destination if hosted on another website */}
                {destination && (
                  <a href={destination} target='_blank' rel='noreferrer' className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'>
                    <BsFillArrowUpRightCircleFill/>
                    {destination.slice(8, 30)}
                  </a>
                )}
                {/* show delete button for author to delete own posts */}
                {author?._id === userInfo.googleId && (
                  <button type='button'
                    className='text-white opacity-85 hover:opacity-100 text-dark font-bold px-3 py-1 text-base rounded hover:shadow-md'
                    onClick={(e) => {
                      // e.stopPropagation();
                      deletePost(_id);
                    }}
                  >
                    <AiTwotoneDelete/>
                  </button>
                )}
            </div>
          </div>
        )}
      </div>
      {/* show author name/picture & link to author's profile underneath */}
      <Link to={`user-profile/${userInfo?._id}`} className='flex gap-2 mt-2 items-center'>
        <img className='w-8 h-8 rounded-full object-cover' src={author?.image} alt='user profile'/>
        <p className='font-semibold capitalize'>{author?.username}</p>
      </Link>
    </div>
  )
}

export default Post