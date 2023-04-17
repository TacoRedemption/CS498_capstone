import React, {useState, useEffect} from 'react';
import {MdDownloadForOffline} from 'react-icons/md';
import {Link, useParams} from 'react-router-dom';
import {v4 as uuid4} from 'uuid';

import {client, urlFor} from '../client';
import WaterfallLayout from './WaterfallLayout';
import {getSimilarPostsQuery, postDetailsQuery} from '../utils/data';
import Loadbars from './Loadbars';

// page for looking at more info/details about a post
const PostDetails = ({user}) => {
  // set up states
  const [posts, setPosts] = useState(null);
  const [postDetails, setPostDetails] = useState(null);
  const [comment, setComment] = useState('');
  const [addComment, setAddComment] = useState(false);
  const {postID} = useParams(); // get post ID from url address

  // get the details for the given post & get similar posts to recommend
  const fetchPostDetails = () => {
    let query = postDetailsQuery(postID);
    if (query) {
        // query sanity DB for post details
        client.fetch(query).then((data) => {
            setPostDetails(data[0]);

            // if post details gotten, show more posts like it
            if (data[0]) {
                query = getSimilarPostsQuery(data[0]);
                client.fetch(query).then((reply) => {
                    setPosts(reply);
                })
            }
        })
    }
  }

  // function for adding a comment to a post
  const postComment = () => {
    if (comment) {
        setAddComment(true);

        // post comment
        client.patch(postID).setIfMissing({comments: []}).insert('after', 'comments[-1]', [{
            comment,
            _key: uuid4(),
            author: {
                _type: 'author',
                _ref: user._id,
            }
        }]).commit().then(() => {
            // comment posted, reset
            fetchPostDetails();
            setComment('');
            setAddComment(false);
            window.location.reload();
        })
    }
  }

  // useEffect to get the post details
  useEffect(() => {
    fetchPostDetails();
  }, [postID])
  
  // show loading bars if we don't have the post details yet
  if (!postDetails) return <Loadbars message='Loading post...'/>;
  
  return (
    <> {/* need to wrap whole thing so showing more posts at the end works */} 
    <div className='flex xl:flex-row flex-col m-auto bg-white' style={{maxWidth: '1500px', borderRadius: '32px'}}>
        <div className='flex justify-center items-center md:items-start flex-initial'>
            {/* get post image */}
            <img className='rounded-xl' alt='user post' src={postDetails?.image && urlFor(postDetails.image).url()}/> 
        </div>
        <div className='w-full p-5 flex-1 xl:min-w-620'>
            {/* div for download button & destination link */}
            <div className='flex items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <a href={`${postDetails.image?.asset?.url}?dl=`} 
                        download 
                        onClick={(e) => e.stopPropagation()}
                        className='bg-cyan w-9 h-9 rounded flex items-center justify-center text-xl opacity-85 hover:opacity-100 hover:shadow-md'
                    >
                        <MdDownloadForOffline/> {/* download icon */}
                    </a>
                </div>
                <a href={postDetails.destination} target='_blank' rel='noreferrer' className='bg-cyan rounded px-3 py-1.5 opacity-85 hover:opacity-100 hover:shadow-md'>
                    {postDetails.destination?.length > 50 ? `${postDetails.destination.slice(0,50)}...` : postDetails.destination}
                </a>
            </div>
            {/* div for title & description */}
            <div>
                <h1 className='text-4xl font-bold break-words mt-3'>
                    {postDetails.title}
                </h1>
                <p className='mt-3'>
                    {postDetails.description}
                </p>
            </div>
            <Link to={`profile/${postDetails.author?._id}`} className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
                <img className='w-8 h-8 rounded-full object-cover' src={postDetails.author?.image} alt='user profile'/>
                <p className='font-semibold capitalize'>{postDetails.author?.username}</p>
            </Link>
            <h2 className='mt-5 text-2xl'>
                Comments
            </h2>
            {/* comments div */}
            <div className='max-h-370 overflow-y-auto'>
                {/* loop through and get all comments */}
                {postDetails?.comments?.map((comment, i) => (
                    // comment div
                    <div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={i}>
                        {/* comment author profile picture */}
                        <img src={comment.author.image} alt='user profile' className='w-10 h-10 rounded-full object-cover cursor-pointer'/>
                        {/* comment author username and comment content */}
                        <div className='flex flex-col'>
                            <p className='font-bold'>{comment.author.username}</p>
                            <p>{comment.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* create comment div */}
            <div className='flex flex-wrap mt-6 gap-3'>
                <Link to={`profile/${postDetails.author?._id}`}>
                    <img className='w-8 h-8 rounded-full object-cover' src={postDetails.author?.image} alt='user profile'/>
                </Link>
                {/* comment entry box */}
                <input type='text' placeholder='Add a comment' value={comment} 
                    className='flex-1 border-gray-100 outline-none border-2 p-2 rounded focus:border-gray-200'
                    onChange={(e) => setComment(e.target.value)}                    
                />
                {/* add comment button */}
                <button type='button' onClick={postComment} className='bg-cyan text-white hover:text-black rounded px-4 py-2 font-semibold text-base'>
                    {addComment ? 'Posting comment...' : 'Post'}
                </button>
            </div>
        </div>
    </div>
    {/* if we have posts like this let's show them */}
    {posts?.length > 0 ? (
        <>
        <h2 className='text-center font-bold text-2x mt-8 mb-4'>
            More like this
        </h2>
        {/* show the pins */}
        <WaterfallLayout posts={posts}/>
        </>
    ) : (
        <Loadbars message='Loading more posts...'/>
    )}
    </>
  )
}

export default PostDetails