import React from 'react'

function Button(props) {
  return (
    <button onClick={props.action} className='border border-gray-400 shadow-lg text-sm bg-white px-3 py-1'>
        {props.children}
    </button>
  )
}

export default Button