import React from 'react'

function Etape1() {
  return (
    <div>
      <fieldset className='border border-gray-400 px-4 py-2'>
        <legend>Creation d'un plan d'Affaire</legend>
        <div>
          <input type="radio" name="typeAffaire" id="" />
          <label htmlFor="">Nouvelle Affaire et son Plan Affaire</label>
        </div>
        <div>
          <input type="radio" name="typeAffaire" id="" />
          <label htmlFor="">Plan d'Affaire Supplementaire dans l'alliance courante</label>
        </div>
      </fieldset>

      <div className='flex items-center gap-2 py-6'>
        <label htmlFor="" className='w-[10rem]'>Affaire courante</label>
        <input className='shadow-inner border w-[4rem]' type="text" />
        <input className='shadow-inner border' type="text" />
      </div>

      <div className='border border-gray-400 p-4'>
        <h2 className='mb-4'>Choix optionnels: copie de donnees depuis le plan d'affaire en cours (vers le plan d'affaire a creer)</h2>
        <div>
          <div>
            <input type="checkbox" name="" id="" className='mr-2'/>
            <label htmlFor="">Donnees administratives (Desc. sommaire de l'ouvrage...)</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" className='mr-2'/>
            <label htmlFor="">Missions/Prestations</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" className='mr-2'/>
            <label htmlFor="">IT/Profils</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" className='mr-2'/>
            <label htmlFor="">Constructeurs</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" className='mr-2'/>
            <label htmlFor="">Ouvrages</label>
          </div>
        </div>
      </div>

      <div className='pt-4'>
        <p className='text-xs'>
          (1*) Ou bien cas particulier :
            Plan d'Affaire supplementaire dans une affaire deja liee 
            a Siebel mais associer a un autre Service Siebel (exemple: cas de sites chantier differents)  
        </p>
        <p className='text-xs'>
          (2*) Si plan d'affaire cournat deja lie a un Siebel alors Recopie du lien 
        </p>
      </div>
    </div>
  )
}

export default Etape1