import React, { useEffect, useState } from 'react'
import LabelInput from '../../../../../component/utils/LabelInput/LabelInput'
import LabelCheckbox from '../../../../../component/utils/LabelCheckbox/LabelCheckbox'
import axios from 'axios';

function Fiche() {

    const [dataAffaire, setDataAffaire] = useState({})
    // const [dataPlan, setDataPlan] = useState({})
    const [dataService, setDataService] = useState({})
    const [dataProduit, setDataProduit] = useState({})
    const [dataMarque, setDataMarque] = useState({})
    const [dataClient, setDataClient] = useState({})

    useEffect(()=>{
        let id = localStorage.getItem("planAffaire");
        if(id){
            axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/planaffairefilter/' + id).then(res=>{
                setDataAffaire(res.data.affaires);
                // setDataPlan(res.data);
                axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/services/' + res.data.affaires.numero_service_en_charge).then(res=>{
                    setDataService(res.data)
                })
                axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/product/' + res.data.produit).then(res=>{
                    setDataProduit(res.data)
                })
                axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/marque/' + res.data.affaires.marques).then(res=>{
                    setDataMarque(res.data)
                })
                axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/client/' + res.data.affaires.client).then(res=>{
                    setDataClient(res.data)
                })
            });
        }
    }, []);

    return (
        <>
            <div className='border border-black m-1'>
                <div className='flex flex-wrap'>
                    <LabelInput col label="N Affaire" value={dataAffaire.numero_affaire}/>
                    <LabelInput col label="Libelle" value={dataAffaire.libelle_affaire}/>
                    <LabelInput col label="Statut de l'affaire" value={dataAffaire.statut_affaire}/>
                </div>
            </div>
            <div>
            <fieldset className='border border-gray-300 m-1 p-2'>
                <legend>Administratif</legend>

                <LabelInput label_w="12" label="Gerer par CB" value={dataService.code_services}/>
                <LabelInput label_w="12" label="Produit" value={dataProduit.name}/>
                <LabelInput label_w="12" label="Marque" value={dataMarque.name}/>
                <LabelInput label_w="12" label="N Offre" value={dataAffaire.numero_offre}/>
                <LabelInput label_w="12" label="Responsable de l'offre"/>
            </fieldset>

            <fieldset className='border border-gray-300 m-1 p-2'>
                <legend>Client</legend>

                <div className='flex gap-1'>
                    <LabelInput label_w="10"  label="N convention contrat"/>
                    <LabelInput label_w="10"  label="Date de contrat" value={dataAffaire.date_contrat}/>
                </div>

                <div className='flex gap-1'>
                    <LabelInput label_w="10"  label="Raison Sociale"/>
                    <LabelInput label_w="10"  label="N Client" value={dataClient.phone_number}/>  
                </div>
            </fieldset>

            <fieldset className='border border-gray-300 m-1 p-2'>
                <legend>Adresse du client</legend>

                <div className='flex'>

                    <div className='border border-gray-300 m-1 p-1'>
                        <LabelInput label_w="8" label="Cplt geo" value={dataClient.address}/>

                        <LabelInput label_w="8" label="n et voie"/>

                        <LabelInput label_w="8" label="Lieu dit"/>

                        <LabelInput label_w="8" label="CP/Ville" value={dataClient.postal_code + " " + dataClient.city}/>

                        <LabelInput label_w="8" label="Departement" value={dataClient.state}/>

                        <LabelInput label_w="8" label="Province"/>

                        <LabelInput label_w="8" label="Pays" value={dataClient.country}/>
                    </div>

                    <div className='border border-gray-300 m-1 p-1'>
                        <LabelCheckbox label="Utiliser l'adresse postal pour l'envoi des courriers"/>
                        <div>
                        <LabelInput label="Boite Postal" col/>

                        <div className='flex justify-between'>
                            <LabelInput label="CP" type="number" col/>
                            <LabelInput label="Bureau distributeur" col/>
                            <LabelInput label="Cedex" type="number" col/>
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