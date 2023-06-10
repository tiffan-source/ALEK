import React, { useEffect, useState } from 'react'
import Button from '../../../../../../component/utils/Button/Button';
import Tabs from '../../../../../../component/utils/Tabs/Tabs';
import VerificationDocument from './SubGestionAso/VerificationDocument';
import Livrable from './SubGestionAso/Livrable';
import axios from 'axios';
import ListDiffusion from './SubGestionAso/ListDiffusion';

function GestionAso(props) {
    let table_statut = ["En cours", "Accepter", "Classer", "Diffuser"]
    const [asoData, setAsoData] = useState({});
    const [avis, setAvis] = useState('');
    const [redacOrCharge, setRedacOrCharge] = useState('');
    const [validation, setValidation] = useState(false);

    useEffect(() => {
        (async()=>{
            try {
                let id = localStorage.getItem("planAffaire");
                let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK +  `/admin/planaffaire/${id}/`);
                let id_affaire = data.affaire;

                let {data : asoRes} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_detail_aso_for_affaire_one_version/${props.aso}/`);
                setAsoData(asoRes)

                let {data: avisRes} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/affaire_ouvrage/${asoRes.affaireouvrage}/avis/`)

                setAvis(avisRes.codification)

                if(asoRes.redacteur){
                    let {data: redacRes} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/admin/collaborateurs/${asoRes.redacteur}/`)
                    setRedacOrCharge(redacRes.first_name + " " + redacRes.last_name)
                }
                else{
                    let {data: charge} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/find_charge_affaire_for_affaire/${id_affaire}/`)
                    setRedacOrCharge(charge.nom + " " + charge.prenom)
                }

                let {data : validation} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/check_if_can_validate_affaire_ouvrage/${asoRes.affaireouvrage}/`);
                setValidation(validation.can_validate);

            } catch (error) {
                console.log(error);
            }
        })();        
    }, [props.aso]);

    let accepter = async()=>{
        let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_detail_document_for_affaire_ouvrage/${asoData.affaireouvrage}/`);

        await Promise.all(data.map(async dt=>{
            await axios.put(process.env.REACT_APP_STARTURIBACK + `/admin/documents/${dt.id}/`,
            {...dt, aso : asoData.id}, {withCredentials : true});
        }));

        await axios.put(process.env.REACT_APP_STARTURIBACK + `/admin/aso/${asoData.id}/`, {
            ...asoData, statut : 1
        });

        window.location.reload();
    }

    return (
        <div>
            <div className='bg-white my-4'>
                <h2 className='bg-gray-300 shadow-inner px-4 py-1'>ASO</h2>
                <div className='text-sm grid grid-cols-2 p-4 gap-4'>
                    <div>
                        <span className='font-bold'>Numero : </span>
                        <span>{asoData.id}</span>
                    </div>
                    <div>
                        <span className='font-bold'>Date : </span>
                        <span>{asoData.date}</span>
                    </div>
                    <div>
                        <span className='font-bold'>Ouvrage : </span>
                        <span>{asoData.ouvrage && asoData.ouvrage.libelle}</span>
                    </div>
                    <div>
                        <span className='font-bold'>Responsable d'affaire / Redacteur : </span>
                        <span>{redacOrCharge}</span>
                    </div>
                    <div>
                        <span className='font-bold'>Statut : </span>
                        <span>{table_statut[asoData.statut]}</span>
                    </div>
                    <div>
                        <span className='font-bold'>Avis : </span>
                        <span>{avis}</span>
                    </div>
                </div>
                <div className='p-4 flex justify-end'>
                    {
                        (validation || parseInt(asoData.statut) !== 0) ? 
                        <>
                            {parseInt(asoData.statut) !== 1 && <Button action={()=>{
                                accepter()
                            }}>Accepter</Button>}

                            <Button>Visualiser</Button>

                            {parseInt(asoData.statut) !== 0 ?
                            <>
                                <Button>Classer</Button>
                                <Button>Diffuser</Button>                            
                            </> : ''
                            }
                        </>
                        :
                        <span className='text-sm text-red-600'>
                            Cet ASO n'a pas encore ete valider. Certains document n'ont pas encore recu d'avis
                        </span>
                    }
                </div>
            </div>

            <div className='bg-white my-4'>
                <Tabs tabs={[
                    {title: 'Choix Veriffication', content : <VerificationDocument affaire_ouvrage={asoData.affaireouvrage} asoData={asoData}/>},
                    {title: 'Remarque generale', content : '', disabled : true}, //En cours de Dev
                    {title: 'Corriger remarque', content : '', disabled : true}, //En cours de Dev
                    {title: 'List de diffusion', content : <ListDiffusion id={asoData.id}/>},
                    {title: 'Livrable', content : <Livrable id={asoData.id}/>, disabled : parseInt(asoData.statut) === 0},
                ]}/>
            </div>
        </div>
    )
}

export default GestionAso