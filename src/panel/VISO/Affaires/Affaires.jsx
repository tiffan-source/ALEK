import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsLeftRightToLine, faChevronLeft, faFloppyDisk, faMinus, faPlus, faPrint, faRotateLeft, faSquareEnvelope, faPlay, faChevronRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import oilPump from '../../../assets/icon/oil-pump.png';
import erase from "../../../assets/icon/erase.png";
import filter from "../../../assets/icon/filter.png";
import refresh from "../../../assets/icon/refresh.png";
import sun from "../../../assets/icon/sun.png";

function Affaires() {
  return (
    <div className='w-full h-full'>
      <h1 className='border-t border-gray-400 p-1 bg-green-200 font-bold'>AVISO</h1>
      <nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
        <h2 className='text-blue-800 flex items-center'>
          <img src={oilPump} alt="OilPump" className='w-[2rem]'/>
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

      <div className='border-r-2 border-gray-500 w-fit p-1 font-thin m-1 shadow'>
        Listes des affaires
      </div>

      <div className='flex justify-between shadow p-1'>
        <div className='flex gap-1'>
          <span className='inline-block w-[1.5rem] h-[1.5rem] rounded-full bg-gray-600 relative'>
          </span>
          <span className='inline-block w-[1.5rem] h-[1.5rem] rounded-full bg-gray-600 relative'>
          </span>
          <span className='inline-block w-[1.5rem] h-[1.5rem] rounded-full bg-green-600 relative'>
          </span>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='flex'>
            <span >
              <img className='w-[1.3rem]' src={sun} alt="sun" />
            </span>
            <span >
              <img className='w-[1.3rem]' src={erase} alt="eraser" />
            </span>
            <span >
              <img className='w-[1.3rem]' src={refresh} alt="loop" />
            </span>
          </div>
          <div className='flex'>
            <span className='flex items-center text-sm'>
              <img className='w-[1.3rem]' src={filter} alt="Filter" />
              Filter
            </span>
          </div>
        </div>
      </div>

      <div className='bg-gray-400 border-4 border-green-400 text-white flex flex-wrap'>
        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">N Affaire</label><input type="text" className='shadow-inner border'/></div>
        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Libelle Afaire</label><input type="text" className='shadow-inner border'/></div>
        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">N Offre</label><input type="text" className='shadow-inner border'/></div>
        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">N CB</label><input type="text" className='shadow-inner border'/></div>
        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">N Plan Aff.</label><input type="text" className='shadow-inner border'/></div>
        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Lib. Complementaire</label><input type="text" className='shadow-inner border'/></div>
        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Charge d'Affaire</label><input type="text" className='shadow-inner border'/></div>
        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Implentation</label><input type="text" className='shadow-inner border'/></div>
        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Client</label><input type="text" className='shadow-inner border'/></div>
        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Produit</label><input type="text" className='shadow-inner border'/></div>
        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">CP</label><input type="text" className='shadow-inner border'/></div>
        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Ville</label><input type="text" className='shadow-inner border'/></div>
        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Etat D'Affaire</label><input type="text" className='shadow-inner border'/></div>
        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">N Provisoire</label><input type="text" className='shadow-inner border'/></div>
        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Type d'affaire</label><input type="text" className='shadow-inner border'/></div>
        <fieldset className='border border-white'>
          <legend>Affaire</legend>
          <div>
            <input type="radio" name="" id="" />
            <label htmlFor="">Qui me concerne</label>
          </div>
          <div>
            <input type="radio" name="" id="" />
            <label htmlFor="">Dont je suis charge d'Affaire</label>
          </div>
          <div>
            <input type="radio" name="" id="" />
            <label htmlFor="">Ou mon CB intervient</label>
          </div>
          <div>
            <input type="radio" name="" id="" />
            <label htmlFor="">Que mon CB gere</label>
          </div>
        </fieldset>
      </div>

      <table className='table-auto text-sm'>
        <thead>
          <tr>
            <th></th>
            <th>...</th>
            <th>N Affaire</th>
            <th>Plan</th>
            <th>Type</th>
            <th>Tut</th>
            <th>Rapport</th>
            <th>RFCT</th>
            <th>Delai</th>
            <th>Visites</th>
            <th>Docs</th>
            <th>Libelle Affaire</th>
            <th>Libele Plan</th>
            <th>Ville</th>
            <th>Nom CA</th>
            <th>Client</th>
            <th>Destination</th>
            <th>CB</th>
            <th>Risque</th>
            <th>Montant tvx</th>
            <th>Contrat du</th>
            <th>N Offie</th>
            <th>Produit</th>
            <th>LAT</th>
            <th>Armoire</th>
            <th>Maestro</th>
            <th>N Provisoire</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}

export default Affaires