import React from 'react'
import SearchBar from './SearchBar'
import TweetCard from './TweetCard'



const MainContent = () => {
    return (
        <div className='mt-20'>
            <div className='m-3'>
                <SearchBar />
            </div>
            <div>
                <TweetCard />
            </div>

        </div>
    )
}

export default MainContent
