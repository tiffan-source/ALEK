import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

function Table(props) {
    const [cursor, setCursor] = useState(0);
    
    return (
        <table className='table-auto w-full'>
            <thead>
                <tr>
                    <th className='border-2 border-gray-600 shadow-lg w-[1rem]'></th>
                    {Object.keys(props.datas[0]).map((head, index)=>{
                        return <th key={index} className='border-2 border-gray-600'>{head}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {props.datas.map((data, index)=>{
                    return (
                        <tr key={index} className='cursor-pointer border-b-2 border-gray-600' onClick={()=>{
                            setCursor(index)
                            if(props.actionOnLine){
                                props.actionOnLine(data.id)
                            }
                        }}>
                            <td className='shadow-lg w-[1rem]'>
                                {cursor === index && <FontAwesomeIcon icon={faCaretRight}/>}
                            </td>
                            {
                                Object.values(data).map((dt, index)=>{
                                    return <td key={index} className={'p-1 ' + (index % 2 === 0 ? 'bg-white' : 'bg-gray-300')}>{dt}</td>
                                })
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table