import React from 'react'

const IconButton = ({ onClick, icon, cy }) => {
  return (
    <button onClick={onClick} className={`w-8 text-xl font-semibold cursor-pointer`} data-cy={cy}>
        {icon}
    </button>
  )
}

export default IconButton