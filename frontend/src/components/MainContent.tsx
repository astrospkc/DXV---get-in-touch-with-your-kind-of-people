import React from 'react'
import SearchBar from './SearchBar'
import TweetCard from './TweetCard'



const MainContent = () => {


    return (
        <div className='mt-20 flex flex-col gap-4'>
            {/* <div className='m-3 bg-red-300'> */}
            <SearchBar />
            {/* </div> */}
            {/* <div className='bg-gray-700'> */}
            <TweetCard />
            {/* </div> */}

        </div>
    )
}

export default MainContent
