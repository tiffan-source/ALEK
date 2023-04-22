import React from 'react'
import loupe from "../../../../../assets/icon/search.png";
function Detail() {
  return (
    <>
        <div className='border border-black m-1'>
            <div className='flex flex-wrap'>
                <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">N SGO/SIEBEL</label><input type="text" className='shadow-inner border'/></div>
                <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">N Affaire</label><input type="text" className='shadow-inner border'/></div>
                <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Libelle</label><input type="text" className='shadow-inner border'/></div>
                <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Risque</label><input type="text" className='shadow-inner border'/></div>
            </div>
        </div>
        <div>
            <div>
                <label>N Plan</label>
                <input type="text" className='shadow-inner border w-[2rem]' />
                <input type="text" className='shadow-inner border' />
            </div>
            <div className='flex gap-2'>
                <div>
                    <label htmlFor="">Ligne Contrat SIEBEL</label>
                    <input type="text" className='shadow-inner border' />
                </div>
                <div>
                    <label htmlFor="">Service SIEBEL</label>
                    <input type="text" className='shadow-inner border' />
                </div>
                <button className='border border-gray-200 shadow-md p-[1px]'>
                    <img className='w-[1rem]' src={loupe} alt="search" srcset="" />
                    Reconciliation SIEBEL
                </button>
            </div>
            <div>
                <label htmlFor=""></label>
                <input type="text" className='shadow-inner border' />
                <input type="checkbox" name="" id="" />
            </div>
        </div>
    </>
  )
}

export default Detail