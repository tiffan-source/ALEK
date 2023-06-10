import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Button from '../utils/Button/Button';

function AddConstructeur({handleClose, entrepriseEnroll}) {
    const [constructeurs, setConstructeurs] = useState([]);

    const [constructSelect, setContructSelect] = useState([])

    useEffect(()=>{
        (async ()=>{
            let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/admin/entreprise/`);

            let all_entreprise = data.results.filter(dt=>{
                return !entrepriseEnroll.includes(dt.id)
            })

            setConstructeurs(all_entreprise);
        })();
    }, []);

    let enregistrer = async()=>{
        let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/admin/planaffaire/${localStorage.getItem("planAffaire")}/`);
        let idAffaire = data.affaire;

        await Promise.all(constructSelect.map(async item=>{
            await axios.post(process.env.REACT_APP_STARTURIBACK + `/admin/entreprise_affaire/`,
            {
                entreprise : item,
                affaire : idAffaire
            });
        }));

        window.location.reload();
    }

    return (
        <div id="defaultModal" tabIndex="-1" aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto h-full flex justify-center items-center bg-[#000a]">
            <div className="relative w-full max-w-4xl max-h-full">
                <div className="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700">
                <div className="flex justify-between items-center pr-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white p-6">
                    Ajouter des constructeurs
                    </h3>
                    <span className="text-xl cursor-pointer" onClick={handleClose}>
                    <FontAwesomeIcon icon={faXmark} />
                    </span>
                </div>
                <div className="px-6 space-y-6">
                    <div>
                        <Button action={()=>{
                            enregistrer()
                        }}>Enregistrer</Button>
                    </div>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th className='w-[3rem]'></th>
                                <th className='text-start'>Raison Sociale</th>
                                <th className='text-start'>Siret</th>
                                <th className='text-start'>Activite</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                constructeurs.map((constructeur, index)=>{
                                    return (
                                        <tr key={index}>
                                            <td className='w-[3rem]'><input type="checkbox" name="" id="" onChange={(e)=>{
                                                if(e.target.checked){
                                                    if(!constructSelect.includes(constructeur.id)){
                                                        setContructSelect([...constructSelect, constructeur.id]);
                                                    }
                                                }else{
                                                    if(constructSelect.includes(constructeur.id)){
                                                        setContructSelect(constructSelect.filter(cS=>{
                                                            return cS !== constructeur.id
                                                        }));
                                                    }
                                                }
                                            }}/></td>
                                            <td>{constructeur.raison_sociale}</td>
                                            <td>{constructeur.siret}</td>
                                            <td>{constructeur.activite}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div
                className="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    
                </div>
                </div>
            </div>
        </div>
    )
}

export default AddConstructeur