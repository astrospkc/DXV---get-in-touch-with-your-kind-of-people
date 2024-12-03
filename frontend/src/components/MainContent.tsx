import React from 'react'
import SearchBar from './SearchBar'
import TweetCard from './TweetCard'
import TweetCard1 from './TweetCard1'



const MainContent = () => {


    return (
        <div className='mt-20 flex flex-col gap-4 '>
            {/* <div className='m-3 bg-red-300'> */}
            <SearchBar />
            {/* </div> */}


            <TweetCard1 />


        </div>
    )
}

export default MainContent
