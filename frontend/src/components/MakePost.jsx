import React, {useState} from 'react';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import {MdDelete} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';

import {client} from '../client';
import Loadbars from './Loadbars';
import {artforms} from '../utils/data';

// page for users to create a post
const MakePost = ({user}) => {
  // setup states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [artform, setArtform] = useState(null);
  const [image, setImage] = useState(null);
  const [badImageType, setBadImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (event) => {
    const file = event.target.files[0];
    // if file type is of the proper format
    if (['image/png', 'image/svg', 'image/jpg', 'image/gif', 'image/tiff'].includes(file.type)) {
      setBadImageType(false);
      setLoading(true);

      // upload the image to sanity client
      client.assets.upload('image', file, {contentType: file.type, filename: file.name})
        .then((document) => {
          setImage(document);
          setLoading(false);
        }) // catch any errors
        .catch((err) =>{
          console.log('Image upload failed ', err);
        })
    } else { // bad file type
      setBadImageType(true);
    }
  }

  // function to save post to sanity database
  const makePost = () => {
    // check all fields filled
    if (title && description && destination && image?._id && artform) {
      // create sanity document
      const doc = {
        _type: 'post',
        title,
        description,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: image?._id,
          },
        },
        uid: user._id,
        author: {
          _type: 'author',
          _ref: user._id,
        },
        artform,
      }

      // upload document to sanity & return to homepage
      client.create(doc).then(() => {
        navigate('/');
      })
    } else { // not all fields filled, display error for 4 seconds
      setFields(true);
      setTimeout(() => setFields(false), 4000);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      <p className='justify-left text-3xl lg:w-4/5 w-full'>
        Create Post</p>
      <div className=' flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        {/* make post div */}
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
          <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
            {loading && <Loadbars/>}
            {badImageType && <p>Wrong image type!</p>}
            {/* display image upload area */}
            {!image ? (
              <label>
                <div className='flex flex-col items-center justify-center h-full'>
                  <div className='flex flex-col justify-center items-center'>
                    {/* show upload icon */}
                    <p className='font-bold text-2xl'>
                      <AiOutlineCloudUpload/>
                    </p>
                    <p className='text-lg'>
                      Click to upload
                    </p>
                  </div>
                  <p className='mt-32 text-gray-400 text-center'>
                    Accepts JPG, SVG, PNG, GIF, and TIFF files under 20 MB
                  </p>
                </div>
                {/* input tag for uploading file */}
                <input type='file' name='imageUpload' onChange={uploadImage} className='w-0 h-0'/>
              </label>
            ) : (
              // display uploaded image in stage
              <div className='relative h-full'>
                <img src={image?.url} alt='uploaded image' className='h-full w-full'/>
                {/* show delete button to remove image */}
                <button type='button' 
                  className='absolute bottom-3 right-3 p-3 rounded bg-cyan text-xl cursor-pointer opacity-85 hover:opacity-100 hover:shadow-md'
                  onClick={() => setImage(null)}
                >
                  <MdDelete/>
                </button>
              </div>
            )}
          </div>
        </div>
        {/* post field entry form */}
        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
          {/* title field input */}
          <input type='text' value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Add title'
            className='text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'          
          />
          {/* description field input */}
          <input type='text' value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Describe your post'
            className='text-base sm:text-lg border-b-2 border-gray-200 p-2'          
          />
          {/* destination field input */}
          <input type='text' value={destination} 
            onChange={(e) => setDestination(e.target.value)}
            placeholder='Add a destination link'
            className='text-base sm:text-lg border-b-2 border-gray-200 p-2'          
          />
          {/* artform field input */}
          <div className='flex flex-col'>
            <div>
              <p className='mb-2 font-semibold text-lg sm:text-xl'>
                Select post artform
              </p>
              {/* artform selection dropdown */}
              <select onChange={(e) => setArtform(e.target.value)}
                className='w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
              >
                <option value='other' className='bg-white'>Select Artform</option>
                {/* get all artforms from data.js */}
                {artforms.map((artform) => (
                  <option className='text-base border-0 capitalize bg-white text-black' value={artform.name}>
                    {artform.name}
                  </option>
                ))}
              </select>
            {/* if all fields not filled, display error message */}
            {fields && (
              <div className='flex flex-col justify-center items-center mt-5'>
                <p className='text-red-500 mb-5 text-lg transition-all duration-150 ease-in'>Please fill all fields</p>
              </div>
            )}
            </div>
            {/* show user profile pic and username */}
            {user && (
              <div className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
                <img src={user.image} className='w-10 h-10 rounded-full object-cover' alt='user profile'/>
                <p className='font-bold'>{user.username}</p>
              </div>
            )}
            {/* create post button */}
            <div className='flex justify-end items-end mt-5'>
              <button type='button' onClick={makePost} className='bg-cyan text-white font-bold p-2 rounded w-28 hover:shadow-lg'>
                Create Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MakePost