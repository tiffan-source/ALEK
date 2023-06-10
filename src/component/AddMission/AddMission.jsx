import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Button from '../utils/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function AddMission(props) {

    let [missions, setMissions] = useState([]);
    let [missionsSelect, setMissionsSelect] = useState([]);

    useEffect(()=>{
        (async()=>{
            let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/ouvrage/')
            setMissions(data.results.filter(result=>!props.missionSelect.includes(result.id)));
        })();
    }, []);

    let enregistrer = async()=>{
        let id = localStorage.getItem('planAffaire')
        let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/planaffaire/' + id + '/')
        let id_affaire = data.affaire;
        await Promise.all(missionsSelect.map(async missionSelect=>{
            let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/ouvrage_affaire/${id_affaire}/${missionSelect}/`)
            if(!data.check){
                await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/affaireouvrage/', {
                    id_affaire : id_affaire,
                    id_ouvrage : missionSelect,
                })
            }
        }))

        window.location.reload()
    }

    return (
    <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto h-full flex justify-center items-center bg-[#000a]">
        <div className="relative w-full max-w-3xl max-h-full">
        <div className="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between items-center pr-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white px-6 pt-6">
                    Ajouter des ouvrages
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
                            <th className='text-start'>Libelle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {missions.map((mission, index)=>{
                            let check = missionsSelect.includes(mission.id)
                            return (
                                <tr key={index}>
                                    <td><input type="checkbox" name="" id="" checked={check} onChange={(e)=>{
                                        if(e.target.checked){
                                            if(!check){
                                                setMissionsSelect([...missionsSelect, mission.id])
                                            }
                                        }else{
                                            if(check){
                                                setMissionsSelect(missionsSelect.filter(m=>m!==mission.id))
                                            }
                                        }
                                    }}/></td>
                                    <td>{mission.libelle}</td>
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

export default AddMission