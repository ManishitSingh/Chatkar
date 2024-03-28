// import React from 'react'

import Conversations from "./Conversations"
import LogoutButton from "./LogoutButton"
import SearchBarInput from "./SearchBarInput"

const Sidebar = () => {
  return (
    <div className="h-full p-4 flex flex-col sm:border-r-2  sm:border-base-300">
      <SearchBarInput />
      <div className="divider  px-3"></div>
      <Conversations />
      {/* <div className="divider my-0 py-0 h-1"></div> */}
      <div className="divider  px-3"></div>
    <LogoutButton />

    </div>
  )
}

export default Sidebar
