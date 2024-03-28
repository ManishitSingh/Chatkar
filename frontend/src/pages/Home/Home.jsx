// import React from 'react'

import MessageContainer from "../../components/MessageContainer"
import Sidebar from "../../components/Sidebar"

const Home = () => {
  return (
    <div className="flex h-[450px] md:h-[550px] rounded-lg border-2 border-base-300 ">
        <Sidebar />
        <div className="hidden sm:block">
        <MessageContainer/>

        </div>

    </div>
  )
}

export default Home
