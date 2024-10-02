import React from 'react'

const Tooltip = ({text, children}) => {
  return (
    <>
        <div className='group relative'>
            <div className='absolute bottom-12 z-9 group-hover:block hidden px-0.5 text-white rounded-md bg-blue-500 '>{text}</div>
            <div>
                {children}
            </div>
        </div>
    </>
  )
}

export default Tooltip