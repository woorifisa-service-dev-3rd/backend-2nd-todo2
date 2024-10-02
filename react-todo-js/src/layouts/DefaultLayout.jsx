import React from 'react'

const DefaultLayout = ({ children }) => {
  return (
    <div className="w-full h-full overflow-y-scroll bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="max-w-xl mx-auto min-w-[20rem]">
          { children }
      </div>
    </div>
  )
}

export default DefaultLayout
