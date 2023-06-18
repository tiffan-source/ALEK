import React from 'react'
import LabelInput from '../../../../../component/utils/LabelInput/LabelInput'
import Adresse from '../../../../../component/Adresse/Adresse'

function Fiche({data}) {

    return data && (
        <>
            <div className='border border-black m-1'>
                <div className='flex flex-wrap gap-6'>
                    <LabelInput disabled value={data.affaire.id} col label="N Affaire" />
                    <LabelInput disabled value={data.affaire.libelle} col label="Libelle"/>
                    <LabelInput disabled value={data.affaire.statut} col label="Statut de l'affaire"/>
                </div>
            </div>
            <div>
            <fieldset className='border border-gray-300 m-1 p-2'>
                <legend>Administratif</legend>
                <LabelInput disabled value={data.affaire.numero_offre || ""} label_w="12" label="N Offre"/>
            </fieldset>

            <fieldset className='border border-gray-300 m-1 p-2'>
                <legend>Client</legend>

                <div className='flex gap-1'>
                    <LabelInput disabled value={data.affaire.numero_contrat} label_w="10"  label="N convention contrat"/>
                    <LabelInput disabled value={data.affaire.date_contrat} label_w="10"  label="Date de contrat"/>
                </div>

                <div className='flex gap-1'>
                    <LabelInput disabled value={data.client.raison_sociale} label_w="10"  label="Raison Sociale"/>
                    <LabelInput disabled value={data.client.id} label_w="10"  label="N Client"/>  
                </div>
            </fieldset>

            <fieldset className='border border-gray-300 m-1 p-2'>
                <legend>Adresse du client</legend>

                <div className='flex'>

                    <div className='border border-gray-300 m-1 p-1'>
                        <Adresse disabled adress={data.client.adresse_detail}/>
                    </div>
                </div>
            </fieldset>
            </div>
        </>
    )
}

export default Fiche