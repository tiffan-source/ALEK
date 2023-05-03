import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsLeftRightToLine, faChevronLeft, faFloppyDisk, faMinus, faPlus, faPrint, faRotateLeft, faSquareEnvelope, faPlay, faChevronRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import oilPump from '../../../../assets/icon/oil-pump.png';

import Complement from './SubFicheAffaire/Complement';
import Detail from './SubFicheAffaire/Detail';
import Fiche from './SubFicheAffaire/Fiche';

let subComs = {
  "Fiche Affaire" : <Fiche/>,
  "Detail du Plan d'Affaire" : <Detail/>,
  "Complement du Plan d'Affaire": <Complement/>,
};

function FicheAffaire() {
  let [complement, setComplement] = useState(Object.MissionPrestation(subComs)[0]);
  return (
    <div className='w-full h-full text-sm'>
      <h1 className='border-t border-gray-400 p-1 bg-green-200 font-bold'>ALEATEK</h1>

      <nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
        <h2 className='text-blue-800 flex items-center'>
          <img src={oilPump} alt="OilPump" className='w-[2rem]'/>
          Fiche Affaire
        </h2>
        <div className='flex gap-2'>
          <ul className='flex'>
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

      <div>
      {Object.keys(subComs).map((subCom, index)=>{
        return (
          <span key={index} onClick={()=>{setComplement(subComs[subCom])}} className='p-1 font-thin cursor-pointer text-sm shadow'>{subCom}</span>
        )
      })}
      </div>

      <div className='border-t'>
        {complement}
      </div>

    </div>
  )
}

export default FicheAffaire