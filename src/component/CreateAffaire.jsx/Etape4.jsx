import React from 'react'

function Etape4() {
  return (
    <div>
      <div className='border border-gray-400 p-2 mb-2'>

        <div className='flex gap-8'>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>N Affaire</label>
            <input className='shadow-inner border w-[12rem]' type="text" />
          </div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>N Plan</label>
            <input className='shadow-inner border w-[8rem]' type="text" />
          </div>
        </div>

        <div className='flex justify-between'>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Libele Affaire</label>
            <input className='shadow-inner border w-[12rem]' type="text" />
          </div>
        </div>

        <div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Libele Plan  </label>
            <input className='shadow-inner border' type="text" />
          </div>
        </div>
      </div>

      <div className='border border-gray-400 p-2 mb-2'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <label htmlFor="" className=''>Montant des travaux</label>
            <input className='shadow-inner border w-[10rem]' type="text" />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="" className=''>Devise</label>
            <select className='shadow-inner border border-gray-800 bg-white p-1' type="text">
              <option value="">Euro</option>
              <option value="">Dollar</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="" className=''>(HT/TTC)</label>
            <select className='shadow-inner border border-gray-800 bg-white p-1' type="text">
              <option value="">HT</option>
              <option value="">TTC</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="" className=''>Destination d'ouvrage</label>
            <select className='shadow-inner border border-gray-800 bg-white p-1 w-[14rem]' type="text">
              <option value="">Destination#1</option>
              <option value="">Destination#2</option>
            </select>
          </div>
        </div>

        <div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Date debut Prestation BV</label>
            <input className='shadow-inner border w-[10rem]' type="date" />
          </div>
        </div>

        <div className='flex justify-between'>
          <div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>Date de debut du chantier</label>
              <input className='shadow-inner border w-[10rem]' type="date" />
            </div>
          </div>
          <div className='flex gap-4'>
            <label htmlFor="">Travaux</label>
            <div className='flex items-center'>
              <input type="text" className='w-[3rem] shadow-inner border' />
              <span>,</span>
              <input type="text" className='w-[3rem] shadow-inner border' />
            </div>
            <div>
              <button className='border border-gray-400 shadow-lg text-sm bg-white px-3 py-1'>Calcul date de fin du chantier</button>
            </div>
          </div>
        </div>

        <div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Date de fin</label>
            <input className='shadow-inner border w-[10rem]' type="date" />
          </div>
        </div>

        <div className='flex justify-between'>
          <div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>Nb document a examiner</label>
              <input className='shadow-inner border w-[6rem]' type="text" />
            </div>
          </div>
          <div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>Nb visites/reunions prevues</label>
              <input className='shadow-inner border w-[6rem]' type="text" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <span>Adresse du Chantier</span>
        <div className='grid grid-cols-2 gap-2'>

          <div className='border border-gray-600 p-1'>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className='w-[7rem]'>Cplt Geo</label>
              <input className='shadow-inner border w-[12rem]' type="text" />
            </div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className='w-[7rem]'>N et voie</label>
              <input className='shadow-inner border w-[12rem]' type="text" />
            </div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className='w-[7rem]'>Lieu dit</label>
              <input className='shadow-inner border w-[12rem]' type="text" />
            </div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className='w-[7rem]'>CP/VIlle</label>
              <input className='shadow-inner border w-[12rem]' type="text" />
            </div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className='w-[7rem]'>Departement</label>
              <input className='shadow-inner border w-[12rem]' type="text" />
            </div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className='w-[7rem]'>Province</label>
              <input className='shadow-inner border w-[12rem]' type="text" />
            </div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className='w-[7rem]'>Pays</label>
              <input className='shadow-inner border w-[12rem]' type="text" />
            </div>
          </div>
          
          <div className='flex flex-col justify-between border border-gray-600 p-1'>
            <div>
              <input type="checkbox" />
              <label htmlFor="">Utiliser l'adresse postal pour l'envoi des courriers</label>
            </div>
            <div>
              <div className='flex flex-col mb-2'>
                <label htmlFor="" className=''>Boite Postal</label>
                <input className='shadow-inner border w-[6rem]' type="text" />
              </div>

              <div className='flex justify-between'>
                <div className='flex flex-col'>
                  <label htmlFor="" className=''>CP</label>
                  <input className='shadow-inner border w-[4rem]' type="text" />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="" className=''>Bureau distributeur</label>
                  <input className='shadow-inner border w-[12rem]' type="text" />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="" className=''>Cedex</label>
                  <input className='shadow-inner border w-[4rem]' type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Etape4