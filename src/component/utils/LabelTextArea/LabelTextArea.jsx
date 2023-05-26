import React from 'react'

function LabelTextArea(props) {
  return (
    <div className='flex'>
        <label htmlFor="" className='inline-block w-[12rem]'>{props.label}</label>
        <textarea name="" className='shadow-innner border grow' id=""></textarea>
    </div>
  )
}

export default LabelTextArea