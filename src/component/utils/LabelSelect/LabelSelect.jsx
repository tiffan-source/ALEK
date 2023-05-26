import React, { useEffect } from 'react'

function LabelSelect(props) {
  useEffect(()=>{
  });
  let myclass = 'flex py-1 gap-2';

  if(props.col)
    myclass += ' flex-col';

  return (
    <div className={myclass}>
        <label htmlFor="" className=''>{props.label}</label>
        <select className='shadow-inner border border-gray-800 bg-yellow-200 px-2 py-1 text-sm max-w-[14rem]' onChange={props.onChange}>
            {props.options ? Object.keys(props.options).map((option, index)=>{
              return <option value={props.options[option]} key={index}>{option}</option>
            }) : (
              <option value=""></option>
            )}
        </select>
    </div>
  )
}

export default LabelSelect