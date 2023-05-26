import React from 'react'

function Input(props) {
  let myClass = "shadow-inner text-black";
  if(props.type === "number")
    myClass += ' w-[4rem]'
  return (
    <input
      type={props.type || 'text'}
      className={myClass}
      onChange={props.onChange}
      disabled={props.disabled}
      value={props.value}
      readOnly={props.readOnly}
      />
  )
}

export default Input