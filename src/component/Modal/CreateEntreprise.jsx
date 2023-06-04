import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import LabelInput from '../utils/LabelInput/LabelInput'
import Adresse from '../Adresse/Adresse'
import Button from '../utils/Button/Button'
import axios from 'axios'

function CreateEntreprise(props) {

    const [lines, setLines] = useState([]);
    const [newLine, setNewLine] = useState({
        nom : "",
        prenom : "",
        email : ""
    });
    const [entreprise, setEntrepise] = useState({
        raison_sociale : "",
        activite : "",
        siret: ""
    });
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

    let createEntreprise = async () => {
        try {
            let resAdresse = await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/adresse/',
            adress, {withCredentials : true});

            let resEntreprise = await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/entreprise/',
            {...entreprise, adresse : resAdresse.data.id}, {withCredentials : true});

            await Promise.all(lines.map(async line=>{
                await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/responsable/',
                {...line, entreprise : resEntreprise.data.id}, {withCredentials: true})
            }));

            if(props.isCollab){
                let id = localStorage.getItem('planAffaire')
                let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/planaffaire/' + id + '/')
                let id_affaire = data.affaire;

                await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/entreprise_affaire/', 
                {
                    entreprise : resEntreprise.data.id,
                    affaire : id_affaire
                }, {withCredentials: true})
            }

            window.location.reload();
        } catch (error) {
        }
    }

    return (
    <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto h-full flex justify-center items-center bg-[#000a]">
        <div className="relative w-full max-w-4xl max-h-full">
            <div className="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700 text-sm">
                <div className='flex justify-between items-center pr-6'>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white p-6">
                        Assistant de création d'une entreprise
                    </h3>
                    <span className='text-xl cursor-pointer' onClick={()=>{
                        props.close()
                    }}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </span>
                </div>
                <div className="p-2">
                    <Button action={()=>{
                        createEntreprise()
                    }}>Creer</Button>
                    <div className='bg-gray-100 m-4'>
                        <h2 className='p-2 bg-gray-200 shadow-inner'>Details Entrepise</h2>
                        <div className='grid grid-cols-2 gap-4 mx-4'>
                            <LabelInput label="Raison Sociale" value={entreprise.raison_sociale} onChange={(e)=>{
                                setEntrepise({...entreprise, raison_sociale : e.target.value})
                            }}/>
                            <LabelInput label="Siret" type="number" value={entreprise.siret} onChange={(e)=>{
                                setEntrepise({...entreprise, siret : e.target.value})
                            }}/>
                            <LabelInput label="Activite" value={entreprise.activite} onChange={(e)=>{
                                setEntrepise({...entreprise, activite : e.target.value})
                            }}/>
                        </div>
                    </div>
                    <div className='bg-gray-100 m-4'>
                        <h2 className='p-2 bg-gray-200 shadow-inner'>Adresse</h2>
                        <Adresse adress={adress} setAdress={setAdress}/>
                    </div>
                    <div className='bg-gray-100 m-4'>
                        <h2 className='p-2 bg-gray-200 shadow-inner'>Media de communication</h2>
                        <table className='w-full'>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='text-center'><input type="text" value={newLine.nom}
                                    onChange={(e)=>{
                                        setNewLine({...newLine, nom : e.target.value})
                                    }}/></td>
                                    <td className='text-center'><input type="text" value={newLine.prenom}
                                    onChange={(e)=>{
                                        setNewLine({...newLine, prenom : e.target.value})
                                    }}/></td>
                                    <td className='text-center'><input type="email" value={newLine.email}
                                    onChange={(e)=>{
                                        setNewLine({...newLine, email : e.target.value})
                                    }}/></td>
                                    <td className='text-center'>
                                        <Button action={()=>{
                                            let {nom, prenom, email} = newLine
                                            if(nom && prenom && email){
                                                setLines([...lines, newLine]);
                                                setNewLine({
                                                    nom : "",
                                                    prenom : "",
                                                    email : ""
                                                })                                                
                                            }
                                        }}><FontAwesomeIcon icon={faPlus}/></Button>
                                    </td>
                                </tr>
                                {lines.map((line, index)=>(
                                    <tr>
                                        <td className='text-center'>{line.nom}</td>
                                        <td className='text-center'>{line.prenom}</td>
                                        <td className='text-center'>{line.email}</td>
                                        <td className='text-center'>
                                            <Button action={()=>{
                                                setLines(lines.filter((l,i)=>i!==index))
                                            }}><FontAwesomeIcon icon={faTrash}/></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateEntreprise