import React from 'react'

function Etape8() {
  return (
    <div>
        <h2 className='text-sm font-bold text-center mb-4'>Retenir ici les missions a recopier ou a selectionner</h2>
        <div className='grid grid-cols-4 gap-8 mb-4'>
          <label htmlFor="" className='col-span-1'></label>
          <textarea name="" id="" className='col-span-3 border shadow-inner'></textarea>
        </div>
        <table className='text-sm border border-gray-600 w-full'>
          <thead>
            <tr>
              <td></td>
              <td>Sel</td>
              <td>Mission contractuelle</td>
              <td>Libele mission contractuelle</td>
            </tr>
          </thead>
        </table>
    </div>
  )
}

export default Etape8