import React from 'react'

function LabelTextArea(props) {
  return (
    <div className='flex'>
        <label htmlFor="" className='inline-block w-[12rem]'>{props.label}</label>
        <textarea name="" className='shadow-innner border grow border-gray-600' id=""></textarea>
    </div>
  )
}

export default LabelTextArea