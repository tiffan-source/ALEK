import React from 'react'
import letterH from "../../../../../assets/icon/letter-h.png"

function Fiche() {
  return (
    <>
        <div className='border border-black m-1'>
            <div className='flex flex-wrap'>
                <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">N SGO/SIEBEL</label><input type="text" className='shadow-inner border'/></div>
                <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">N Affaire</label><input type="text" className='shadow-inner border'/></div>
                <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Libelle</label><input type="text" className='shadow-inner border'/></div>
                <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Risque</label><input type="text" className='shadow-inner border'/></div>
                <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Statut de l'affaire</label><input type="text" className='shadow-inner border'/></div>
            </div>
            <p className='flex text-sm gap-1'>
                <img src={letterH} alt="letter H" className='w-[1.5rem]'/>
                Liaison a un numero SGO ou SIEBEL non reconcilie (ancienne affaires)
            </p>
        </div>
        <div>
        <fieldset className='border border-gray-300 m-1 p-2'>
            <legend>Administratif</legend>

            <div className='flex my-1 gap-1'>
                <label htmlFor="" className='w-[10rem]'>Gere par CB</label>
                <input className='shadow-inner border' type="text" />
                <input className='shadow-inner border' type="text" />
            </div>

            <div className='flex my-1 gap-1'>
                <label htmlFor="" className='w-[10rem]'>Produit</label>
                <input className='shadow-inner border' type="text" />
                <input className='shadow-inner border' type="text" />
            </div>

            <div className='flex my-1 gap-1'>
                <label htmlFor="" className='w-[10rem]'>Marque</label>
                <input className='shadow-inner border' type="text" />
            </div>

            <div className='flex my-1 gap-1'>
                <label htmlFor="" className='w-[10rem]'>N Offre</label>
                <input className='shadow-inner border' type="text" />
            </div>

            <div className='flex my-1 gap-1'>
                <label htmlFor="" className='w-[10rem]'>Responsable de l'offre</label>
                <input className='shadow-inner border' type="text" />
                <input className='shadow-inner border' type="text" />
            </div>
        </fieldset>

        <fieldset className='border border-gray-300 m-1 p-2'>
            <legend>Client</legend>

            <div className='flex gap-1'>
                <div className='flex my-1 gap-1'>
                    <label htmlFor="" className='w-[10rem]'>N convention contart</label>
                    <input className='shadow-inner border' type="text" />
                </div>
                <div className='flex my-1 gap-1'>
                    <label htmlFor="" className='w-[10rem]'>Date de contrat</label>
                    <input className='shadow-inner border' type="text" />
                </div>
            </div>

            <div className='flex gap-1'>
                <div className='flex my-1 gap-1'>
                    <label htmlFor="" className='w-[10rem]'>Raison Sociale</label>
                    <input className='shadow-inner border' type="text" />
                </div>
                <div className='flex my-1 gap-1'>
                    <label htmlFor="" className='w-[10rem]'>N Client</label>
                    <input className='shadow-inner border' type="text" />
                </div>    
            </div>
        </fieldset>

        <fieldset className='border border-gray-300 m-1 p-2'>
            <legend>Adresse du client</legend>

            <div className='flex'>

                <div className='border border-gray-300 m-1 p-1'>
                    <div className='flex my-1 gap-1'>
                        <label htmlFor="" className='w-[10rem]'>Cplt geo</label>
                        <input className='shadow-inner border' type="text" />
                    </div>

                    <div className='flex my-1 gap-1'>
                        <label htmlFor="" className='w-[10rem]'>n et voie</label>
                        <input className='shadow-inner border' type="text" />
                    </div>

                    <div className='flex my-1 gap-1'>
                        <label htmlFor="" className='w-[10rem]'>Lieu dit</label>
                        <input className='shadow-inner border' type="text" />
                    </div>

                    <div className='flex my-1 gap-1'>
                        <label htmlFor="" className='w-[10rem]'>CP/Ville</label>
                        <input className='shadow-inner border' type="text" />
                    </div>

                    <div className='flex my-1 gap-1'>
                        <label htmlFor="" className='w-[10rem]'>Departement</label>
                        <input className='shadow-inner border' type="text" />
                    </div>

                    <div className='flex my-1 gap-1'>
                        <label htmlFor="" className='w-[10rem]'>Province</label>
                        <input className='shadow-inner border' type="text" />
                    </div>

                    <div className='flex my-1 gap-1'>
                        <label htmlFor="" className='w-[10rem]'>Pays</label>
                        <input className='shadow-inner border' type="text" />
                    </div>
                </div>

                <div className='border border-gray-300 m-1 p-1'>
                    <div className='mb-4'>
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="">Utiliser l'adresse postal pour l'envoi des courriers</label>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="">Boite Postale</label>
                        <input type="text"  className='shadow-inner border'/>
                    </div>
                    <div className='flex gap-2'>
                        <div className='flex flex-col w-fit'>
                            <label htmlFor="">CP</label>
                            <input type="text"  className='shadow-inner border w-[3rem]'/>
                        </div>
                        <div className='flex flex-col w-fit'>
                            <label htmlFor="">Bureau distributeur</label>
                            <input type="text"  className='shadow-inner border w-[9rem]'/>
                        </div>
                        <div className='flex flex-col w-fit'>
                            <label htmlFor="">Code</label>
                            <input type="text"  className='shadow-inner border w-[3rem]'/>
                        </div>
                    </div>
                </div>

            </div>

        </fieldset>


        </div>
    </>

  )
}

export default Fiche