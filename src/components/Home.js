import React from 'react'
import Chat from './Chat'
import Sidebar from './Sidebar'

const Home = () => {
  return (
    <div>
      <div className='home'>
        <div className='container'>
            <div className='sidebar'><Sidebar/></div>
            <div className='chat'><Chat/></div>
        </div>
      </div>
    </div>
  )
}

export default Home
