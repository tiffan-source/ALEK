import React from 'react'
import LabelInput from '../utils/LabelInput/LabelInput'

function Adresse({adress, setAdress}) {
    return (
        <div className='flex flex-col text-sm'>
            <LabelInput label_w="10" label="Cplt Geo" value={adress.cplt_geo} onChange={(e)=>{
                setAdress({...adress, cplt_geo : e.target.value})
            }}/>
            <LabelInput label_w="10" label="N et libelle de voie" value={adress.numero_voie} onChange={(e)=>{
                setAdress({...adress, numero_voie : e.target.value})
            }}/>
            <LabelInput label_w="10" label="Lieu dit" value={adress.lieu_dit} onChange={(e)=>{
                setAdress({...adress, lieu_dit : e.target.value})
            }}/>
            <LabelInput label_w="10" label="Code Postal" value={adress.code_postal} onChange={(e)=>{
                setAdress({...adress, code_postal : e.target.value})
            }}/>
            <LabelInput label_w="10" label="Ville" value={adress.ville} onChange={(e)=>{
                setAdress({...adress, ville : e.target.value})
            }}/>
            <LabelInput label_w="10" label="Pays" value={adress.pays} onChange={(e)=>{
                setAdress({...adress, pays : e.target.value})
            }}/>
            <LabelInput label_w="10" label="Departement" value={adress.departement} onChange={(e)=>{
                setAdress({...adress, departement : e.target.value})
            }}/>
            <LabelInput label_w="10" label="Provice" value={adress.province} onChange={(e)=>{
                setAdress({...adress, province : e.target.value})
            }}/>
        </div>
    )
}

export default Adresse