import React from 'react'
import Masonry from 'react-masonry-css'
import Post from './Post'

// screen_pixels_in_width: num_columns_displayed
const breakptObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
}

// form waterfall layout for posts using columns settings in breakptObj
const WaterfallLayout = ({posts}) => {
  return (
    <Masonry className='flex animate-slide-fwd' breakpointCols={breakptObj}>
        {posts?.map((post) => <Post key={post._id} post={post} className='w-max'/>)}
    </Masonry>
  )
}

export default WaterfallLayout