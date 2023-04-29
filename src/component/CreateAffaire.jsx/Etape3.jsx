import React from 'react'

function Etape3() {
  return (
    <div>
      <div className='border border-gray-400 p-2 mb-2'>

        <div className='flex justify-between'>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>N Contrat SIEBEL</label>
            <input className='shadow-inner border w-[12rem]' type="text" />
          </div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Risque SIEBEL</label>
            <input className='shadow-inner border w-[12rem]' type="text" />
          </div>
        </div>

        <div className='flex justify-between'>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>N Affaire @VISO</label>
            <input className='shadow-inner border w-[12rem]' type="text" />
          </div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>N Plan</label>
            <input className='shadow-inner border w-[4rem]' type="text" />
          </div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Risque @VISO</label>
            <input className='shadow-inner border w-[12rem]' type="text" />
          </div>
        </div>

        <div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Libele Affaire</label>
            <input className='shadow-inner border' type="text" />
          </div>
        </div>

        <div className='flex justify-between'>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Libele Plan Affaire</label>
            <input className='shadow-inner border' type="text" />
          </div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Langue</label>
            <select className='shadow-inner border border-gray-800 bg-yellow-200 px-2 py-1 text-sm' type="text">
              <option value="">Francais</option>
              <option value="">Anglais</option>
            </select>
          </div>
        </div>

      </div>

      <div className='border border-gray-400 p-2 mb-2'>
        <div className='flex items-center gap-2 py-1'>
          <label htmlFor="" className=''>Client</label>
          <input className='shadow-inner border' type="text" />
          <input className='shadow-inner border' type="text" />
        </div>
      </div>

      <div className='border border-gray-400 p-2 mb-2'>
        <div className='flex items-center gap-2 py-1'>
          <label htmlFor="" className=''>Gerer par: CB N</label>
          <input className='shadow-inner border w-[6rem]' type="text" />
          <input className='shadow-inner border' type="text" />
          <input className='shadow-inner border' type="text" />
        </div>
      </div>

      <div className='border border-gray-400 p-2 mb-2'>

        <div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Marque</label>
            <select className='shadow-inner border border-gray-800 bg-yellow-200 px-2 py-1 text-sm w-[10rem]' type="text">
              <option value="">Marque#1</option>
              <option value="">Marque#2</option>
            </select>
          </div>
        </div>
        
        <div className='flex justify-between'>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Type D'affaire</label>
            <select className='shadow-inner border border-gray-800 bg-white px-2 py-1 text-sm w-[14rem]' type="text">
              <option value="">Type#1</option>
              <option value="">Type#2</option>
            </select>
          </div>
        
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Produit</label>
            <input className='shadow-inner border w-[6rem]' type="text" />
            <input className='shadow-inner border' type="text" />
          </div>
        </div>
      </div>

      <div  className='border border-gray-400 p-2 mb-2'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>N Offre</label>
            <input className='shadow-inner border' type="text" />
          </div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Responsable de l'Offre</label>
            <input className='shadow-inner border w-[9rem]' type="text" />
            <input className='shadow-inner border w-[9rem]' type="text" />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>N convention/contrat</label>
            <input className='shadow-inner border' type="text" />
          </div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Date du contrat</label>
            <input className='shadow-inner border' type="date" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Etape3