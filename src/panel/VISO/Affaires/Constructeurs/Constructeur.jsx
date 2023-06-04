import React, {useEffect, useState} from 'react'
import worker from '../../../../assets/icon/worker.png'
import Button from '../../../../component/utils/Button/Button';
import LabelInput from '../../../../component/utils/LabelInput/LabelInput';
import Adresse from '../../../../component/Adresse/Adresse';
import axios from 'axios';
import CreateEntreprise from '../../../../component/Modal/CreateEntreprise';

function Constructeur() {
    const [adress, setAdress] = useState({
        cplt_geo : "",
        numero_voie : "",
        lieu_dit : "",
        code_postal : "",
        ville : "",
        pays : "",
        departement : "",
        province : "",
    });

    const [constructeurs, setConstructeurs] = useState([]);

    const [constructeurSelect, setConstructeurSelect] = useState(null);

    const [modal, setModal] = useState(false);

    useEffect(()=>{
        (async()=>{
            try {
                let id = localStorage.getItem("planAffaire");
                let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/planaffaire/' + id + '/')
                let id_affaire = data.affaire;
                if(id){
                    let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/entreprise_collab_affaire/' + id_affaire + '/');

                    let data_entreprise = await Promise.all(data.map(async dt=>{
                        let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/entreprise_and_responsable/' + dt + '/')
                        return data;
                    }))

                    setConstructeurs(data_entreprise);
                    if(data_entreprise.length!==0){
                        setConstructeurSelect(data_entreprise[0])
                        setAdress(data_entreprise[0].adresse)
                    }
                }                    
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            {modal && <CreateEntreprise close={()=>{setModal(false)}} isCollab/>}
            <div>
                <div className='w-full h-full text-sm min-h-screen flex flex-col'>
                    <h1 className='border-t border-gray-400 p-1 MissionPrestationbg-green-200 font-bold'>Aleatek</h1>

                    <nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
                        <h2 className='text-blue-800 flex items-center '>
                            <img src={worker} alt="OilPump" className='w-[2rem] mr-2'/>
                            Constructeurs
                        </h2>
                    </nav>

                    <div className='flex-grow grid grid-cols-4 gap-2'>
                        <div className='text-sm col-span-1 p-2 shadow-2xl border border-gray-600 m-1'>
                            <div className='flex mb-4'>
                                <Button>Ajouter un Constructeur</Button>
                                <Button action={()=>{setModal(true)}}>Creer un Constructeurs</Button>
                            </div>

                            <table className='w-full'>
                                <thead>
                                    <tr className='border-b border-gray-800'>
                                        <th>Raison Sociale</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {constructeurs.map((constructeur, index)=>{
                                        return (
                                            <tr key={index} onClick={()=>{
                                                setConstructeurSelect(constructeur)
                                                setAdress(constructeur.adresse)
                                            }} className='cursor-pointer border-b border-gray-400 py-4'>
                                                <td>{constructeur.raison_sociale}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {constructeurSelect != null &&
                            <div className='col-span-3'>
                                <div className='grid grid-cols-2 gap-6 m-4'>
                                    <div>
                                        <LabelInput disabled label="Raison sociale" value={constructeurSelect.raison_sociale}/>
                                        <LabelInput disabled label="N SIRET" value={constructeurSelect.siret}/>
                                        <LabelInput disabled label="Activite" value={constructeurSelect.activite}/>
                                    </div>

                                    <div className='border border-gray-600'>
                                        <Adresse adress={adress} setAdress={setAdress}/>
                                    </div>

                                </div>

                                <div className='mt-6'>
                                    <h2 className='text-sm font-bold text-center'>Liste des responsable</h2>
                                    <table className='w-full'>
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Prenom</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {constructeurSelect.responsables.map((respo, index)=>{
                                                return (
                                                    <tr>
                                                        <td>{respo.nom}</td>
                                                        <td>{respo.prenom}</td>
                                                        <td>{respo.email}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>

  )
}

export default Constructeur