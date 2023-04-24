import React, { useEffect, useState } from 'react'
import { client } from '../client';
import WaterfallLayout from './WaterfallLayout';


// Define a functional component named "Search" 
//takes a single prop "searchTerm"
const Search = (props) => {

// Define two states, "posts" and "handle", using the useState hook
  const [posts, setPosts] = useState([]);
  const [handle, setHandle] = useState();

    // Use the useEffect hook to fetch data from the server based on changes to the "searchTerm" prop
  useEffect(() => {
    clearTimeout(handle);  // Clear the timeout before setting a new one to avoid sending too many requests to the server
    setHandle(setTimeout(() => {  // Set a new timeout to call the server after 700 milliseconds of inactivity from the user's search input
      client.fetch(`*[_type == 'post' && (artform match $searchTerm || title match $searchTerm || description match $searchTerm)]{
        ..., 
        "author": author->
      }`, {
        searchTerm: `*${props.searchTerm}*`
      })
        .then(setPosts);  // Store the retrieved data in the "posts" state using the "setPosts" function
    }, 700));
  }, [props.searchTerm]);

  return <WaterfallLayout posts={posts} />    // Return a "WaterfallLayout" component with the "posts" state passed as a prop
}

export default Search