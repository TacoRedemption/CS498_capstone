import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from '../client';
import { fetchGoogleUser, fetchUser } from '../utils/data';

// component for individual post display
const Post = ({ post: { author, image, _id, destination, save } }) => {
  const [postHover, setPostHover] = useState(false);
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(0);
  const [toSavePost, setToSavePost] = useState(false);
  const navigate = useNavigate();

  // get current user info from local storage
  //const user = fetchUser();
  useEffect(() => {
    setUser(fetchUser());
  }, []);

  useEffect(() => {
  // check if user has saved a given post
    setSaved((save?.filter((item) => item.author?._id === user?._id))?.length);
  }, [user]);

  // function for a user to save a post
  const savePost = (id) => {
    if (!saved) {
      setToSavePost(true);

      client.patch(id).setIfMissing({ save: [] }).insert('after', 'save[-1]', [{
        _key: uuid4(),
        uid: user?._id,
        author: {
          _type: 'author',
          _ref: user?._id,
        }
      }]).commit().then(() => {
        setToSavePost(false);
        window.location.reload();
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
        onClick={() => navigate(`/post-details/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'>

        <img className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(250).url()} />
        {/* show icons if hovering over post */}
        {postHover && (
          <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'>
            {/* top corner icons */}
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                {/* link for downloading image */}
                <a href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className='bg-white w-9 h-9 rounded flex items-center justify-center text-xl opacity-85 hover:opacity-100 hover:shadow-md'>

                  <MdDownloadForOffline /> {/* download icon */}
                </a>
              </div>
              {/* check if user has already saved this post */}
              {saved ? (
                // show if saved & how many have saved
                <button type='button' className='bg-cyan opacity-85 hover:opacity-100 text-white hover:text-black font-bold px-3 py-1 text-base rounded hover:shadow-md'>
                  ({save?.length}) Saved
                </button>
              ) : (
                // show save button if not saved
                <button onClick={(e) => {
                  e.stopPropagation();
                  savePost(_id);
                }}
                  type='button' className='bg-cyan opacity-85 hover:opacity-100 text-white hover:text-black font-bold px-3 py-1 text-base rounded hover:shadow-md'>
                  {save?.length}  {toSavePost ? 'Saving...' : 'Save'}
                </button>
              )}
            </div>
            {/* bottom corner icons */}
            <div className='flex justify-between items-center gap-2 w-full'>
              {/* show image link destination if hosted on another website */}
              {destination ? (
                <a href={destination} target='_blank' rel='noreferrer' className='bg-white flex items-center gap-2 text-black font-bold p-1 pl-3 pr-4 rounded-full opacity-85 hover:opacity-100 hover:shadow-md'>
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 18 ? `${destination.slice(0, 18)}...` : destination}
                </a>
              ) : <div />}  {/* empty div if no link to ensure trash can stays on right side */}
              {/* show delete button for author to delete own posts */}
              {author?.email === user.email && (
                <button type='button'
                  className='bg-white w-7 h-7 rounded flex items-center justify-center text-xl opacity-85 hover:opacity-100 hover:shadow-md'
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePost(_id);
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {/* show author name/picture & link to author's profile underneath */}
      <Link to={`/profile/${author?._id}`} className='flex gap-2 mt-2 items-center'>
        <img className='w-8 h-8 rounded-full object-cover' src={author?.image} alt='user profile' />
        <p className='font-semibold capitalize'>{author?.username}</p>
      </Link>
    </div>
  )
}

export default Post