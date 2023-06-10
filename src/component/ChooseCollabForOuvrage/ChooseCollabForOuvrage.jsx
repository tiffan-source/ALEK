import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../utils/Button/Button';
import axios from 'axios';
function ChooseCollabForOuvrage(props) {

    let [dataEntrepriseAffaire, setDataEntrepriseAffaire] = useState([]);
    let [entrepriseSelect, setEntrepriseSelect] = useState([]);

    useEffect(()=>{
        (async()=>{
            try {
                let id = localStorage.getItem('planAffaire')
                let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/planaffaire/' + id + '/')
                let id_affaire = data.affaire;
    
                let {data : all_data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/entreprise_collab_affaire_detail/${id_affaire}/`);

                let {data: entreprises} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/entreprise_for_affaire_ouvrage/${props.ouvrage_affaire}/`);

                let filter = entreprises.map(entreprise=>{
                    return entreprise.affaire_entreprise_id
                })

                all_data = all_data.filter(aD=>!filter.includes(aD.id));

                setDataEntrepriseAffaire(all_data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])

    let enregistrer = async ()=>{
        await Promise.all(entrepriseSelect.map(async eS=>{
            let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/verify_entreprise_collab_on_ouvrage/${eS}/${props.ouvrage_affaire}/`)
            if(!data.check){
                await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/entreprise_affaire_ouvrage/',
                {
                    affaire_ouvrage : props.ouvrage_affaire,
                    affaire_entreprise : eS
                }, {withCredentials: true})
            }
        }));
        window.location.reload();
    }

    return (
    <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto h-full flex justify-center items-center bg-[#000a]">
        <div className="relative w-full max-w-3xl max-h-full">
        <div className="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between items-center pr-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white px-6 pt-6">
                    Ajouter des missions
                </h3>
                <span className="text-xl cursor-pointer" onClick={props.handleClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            </div>
                
            <div className="px-6 py-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <div className='mb-4'>
                    <Button action={()=>{
                        enregistrer();
                    }}>Enregistrer</Button>
                </div>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th></th>
                            <th className='text-start'>Raison Sociale</th>
                            <th className='text-start'>Activite</th>
                            <th className='text-start'>Siret</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataEntrepriseAffaire.map((dtE, index)=>{
                            return (
                                <tr key={index}>
                                    <td><input type="checkbox" name="" id="" onChange={(e)=>{
                                        if(e.target.checked){
                                            if(!entrepriseSelect.includes(dtE.id)){
                                                setEntrepriseSelect([...entrepriseSelect, dtE.id])
                                            }
                                        }else{
                                            if(entrepriseSelect.includes(dtE.id)){
                                                setEntrepriseSelect(entrepriseSelect.filter(m=>m!==dtE.id))
                                            }
                                        }
                                    }}/></td>
                                    <td>{dtE.entreprise.raison_sociale}</td>
                                    <td>{dtE.entreprise.activite}</td>
                                    <td>{dtE.entreprise.siret}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </div>
        </div>
    </div>
  )
}

export default ChooseCollabForOuvrage