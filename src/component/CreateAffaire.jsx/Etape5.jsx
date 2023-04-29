import React from 'react'

function Etape5() {
  return (
    <div>
      <div className='border border-gray-400 p-2 mb-2'>

        <div className='flex gap-6'>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>N Affaire</label>
            <input className='shadow-inner border w-[12rem]' type="text" />
          </div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>N Plan</label>
            <input className='shadow-inner border w-[12rem]' type="text" />
          </div>
        </div>

        <div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Libele Affaire</label>
            <input className='shadow-inner border' type="text" />
          </div>
        </div>

        <div className='flex'>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Libele Plan</label>
            <input className='shadow-inner border' type="text" />
          </div>
        </div>

      </div>

      <div className='border border-gray-400 p-2 mb-2'>
        <div className='flex items-center gap-2 py-1'>
          <label htmlFor="" className='w-[12rem]'>Charge Affaire</label>
          <input className='shadow-inner border' type="text" />
          <input className='shadow-inner border' type="text" />
        </div>
        <div className='flex items-center gap-2 py-1'>
          <label htmlFor="" className='w-[12rem]'>Libelle Intervention Technique</label>
          <input className='shadow-inner border' type="text" />
        </div>
      </div>

      <div className='border border-gray-400 p-2 mb-2'>
        <div className='flex items-center gap-2 py-1'>
          <label htmlFor="" className='w-[12rem]'>Assistante</label>
          <input className='shadow-inner border' type="text" />
          <input className='shadow-inner border' type="text" />
        </div>
      </div>

      <div className='border border-gray-400 p-2 mb-2'>
        <div className='flex items-center gap-2 py-1'>
          <label htmlFor="" className='w-[12rem]'>Chef de projet</label>
          <input className='shadow-inner border' type="text" />
          <input className='shadow-inner border' type="text" />
        </div>
      </div>

      <div className='border border-gray-400 p-2 mb-2'>
        <h2 className='font-bold text-sm text-center'>Liste des moyens de communication(tel, fax, mail) - Touche "Inserer" pour ajouter</h2>
        <table className='text-sm'>
          <thead>
            <tr>
              <td className=''></td>
              <td className=''>Media</td>
              <td className=''>Indication(n, adresse mail, ...)</td>
              <td className=''>Complements (poste, note)</td>
            </tr>
          </thead>
        </table>
      </div>

    </div>
  )
}

export default Etape5