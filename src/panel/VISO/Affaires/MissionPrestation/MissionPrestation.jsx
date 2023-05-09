import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faMinus, faPlus, faPrint, faRotateLeft, faChevronRight, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import oilPump from '../../../../assets/icon/oil-pump.png'; //Change Image After

function MissionPrestation() {
  return (
    <div className='w-full h-full text-sm'>
        <h1 className='border-t border-gray-400 p-1 MissionPrestationbg-green-200 font-bold'>AVISO</h1>

        <nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
        <h2 className='text-blue-800 flex items-center'>
            <img src={oilPump} alt="OilPump" className='w-[2rem]'/>
            Fiche D'Affaire
        </h2>
        <div className='flex gap-2'>
            <ul className='flex'>
            <li>
                <button className='border border-gray-200 shadow-md bg-white p-[1px]'>
                <FontAwesomeIcon icon={faPrint}/>
                Impression
                </button>
            </li>
            </ul>
            <ul className='flex'>
            <li>
                <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                <FontAwesomeIcon icon={faChevronLeft}/>
                </button>
            </li>
            <li>
                <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                <FontAwesomeIcon icon={faCaretLeft}/>
                </button>
            </li>
            <li>
                <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                <FontAwesomeIcon icon={faCaretRight}/>
                </button>
            </li>
            <li>
                <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                <FontAwesomeIcon icon={faChevronRight}/>
                </button>
            </li>

            <li>
                <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                <FontAwesomeIcon icon={faPlus}/>
                </button>
            </li>
            <li>
                <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                <FontAwesomeIcon icon={faRotateLeft}/>
                </button>
            </li>
            <li>
                <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                <FontAwesomeIcon icon={faMinus}/>
                </button>
            </li>
            </ul>

        </div>
        </nav>
    </div>
  )
}

export default MissionPrestation