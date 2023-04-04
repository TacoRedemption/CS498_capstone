import React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {client} from '../client';

import WaterfallLayout from './WaterfallLayout';
import Loadbars from './Loadbars';
import { feedQuery, searchQuery } from '../utils/data';

// waterfall feed component containing posts
// displayed on feed container
const PostFeed = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const { artformID } = useParams();

  // get posts - either all or based on artform search
  useEffect(() => {
    setLoading(true);
    // get posts by artformID
    if (artformID) {
      const query = searchQuery(artformID);
      client.fetch(query).then((data) => {
        setPosts(data);
        setLoading(false);
      })
    } else { // get all posts
      client.fetch(feedQuery).then((data) => {
        setPosts(data);
        setLoading(false);
      })
    }
  }, [artformID])


  // show loading message when fetching more posts
  if (loading) return <Loadbars message="Gathering new ideas..." />

  // show posts in waterfall layout
  return (
    <div>
      {posts && <WaterfallLayout posts={posts} />}
    </div>
  )
}

export default PostFeed