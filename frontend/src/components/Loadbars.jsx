import React from 'react'
import {Bars} from 'react-loader-spinner'

// show loadbars & loading message when reached end of feed
const Loadbars = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
        {/* display loading bars */}
        <Bars
            color='#03FCD3'
            height={50}
            width={200}
            className='m-5'
        />

        {/* display loading message */}
        <p className='text-lg text-center px-2'>
            {message}
        </p>
    </div>
  )
}

export default Loadbars