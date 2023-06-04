import React from 'react'
import Input from '../Input/Input'

function LabelInput(props) {
  let myclass = 'flex m-1 gap-2';
  let labelclass = '';

  if(props.label_w)
    labelclass += `w-[${props.label_w}rem]` 

  if(props.col)
    myclass += ' flex-col';
  if(props.small)
    myclass += ' text-sm';

  return (
    <div className={myclass}>
        <label htmlFor="" className={labelclass}>{props.label}</label>
        <Input onChange={props.onChange} type={props.type} disabled={props.disabled} value={props.value} readOnly={props.readOnly}/>
        {props.span_info ? <span>{props.span_info}</span> : ''}
    </div>
    )
}

export default LabelInput