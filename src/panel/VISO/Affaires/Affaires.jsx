import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsLeftRightToLine, faChevronLeft, faFloppyDisk, faMinus, faPlus, faPrint, faRotateLeft, faSquareEnvelope, faPlay, faChevronRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import oilPump from '../../../assets/icon/oil-pump.png';
function Affaires() {
  return (
    <div className='w-full h-full'>
      <h1 className='border-t border-gray-400 p-1 bg-green-200 font-bold'>AVISO</h1>
      <nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
        <h2 className='text-blue-800'>
          <img src={oilPump} alt="OilPump" className=''/>
          Affaires
        </h2>
        <div className='flex gap-2'>
          <ul className='flex'>
            <li>
              <button className='border border-gray-200 shadow-md bg-white p-[1px]'>
              <FontAwesomeIcon icon={faPlus}/>
              Nouv.Plan d'Affaire
              </button>
            </li>
            <li>
              <button className='border border-gray-200 shadow-md bg-white p-[1px]'>
                <FontAwesomeIcon icon={faPrint}/>
                Liste
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
              <FontAwesomeIcon icon={faPlus}/>
              </button>
            </li>
            <li>
              <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
              <FontAwesomeIcon icon={faFloppyDisk}/>
              </button>
            </li>
            <li>
              <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
              <FontAwesomeIcon icon={faRotateLeft}/>
              </button>
            </li>
            <li>
              <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
              <FontAwesomeIcon icon={faSquareEnvelope}/>
              </button>
            </li>
            <li>
              <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
              <FontAwesomeIcon icon={faMinus}/>
              </button>
            </li>
            <li>
              <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
              <FontAwesomeIcon icon={faPlay}/>
              </button>
            </li>
            <li>
              <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
              <FontAwesomeIcon icon={faChevronRight}/>
              </button>
            </li>
          </ul>

        </div>
      </nav>
      <div className='border-r-4 border-gray-600 w-fit p-1 font-thin'>
        Listes des affaires
      </div>
    </div>
  )
}

export default Affaires