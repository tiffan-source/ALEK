import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Button from '../utils/Button/Button';

function ActiveMission(props) {

    const [missions, setMission] = useState([])
    const [activeMission, setMissionActive] = useState([])

    useEffect(()=>{
        (async()=>{
            let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/mission/');
            setMission(data.results);
            setMissionActive(props.mission_active);
        })();
    }, []);

    let enregistrer = async ()=>{
        let id = localStorage.getItem('planAffaire')
        let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/planaffaire/' + id + '/')
        let id_affaire = data.affaire;
        await Promise.all(activeMission.map(async aM=>{
            let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/mission_affaire/' + id_affaire + '/' + aM + '/')
            if(data.check === false){
                await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/missions/active/', {
                    id_mission : aM,
                    id_affaire : id_affaire
                })
            }
        }));

        let to_remove = props.mission_active.filter(data=>{
            return !activeMission.includes(data);
        })

        await Promise.all(to_remove.map(async toRm=>{
            let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/mission_affaire/' + id_affaire + '/' + toRm + '/')
            await axios.delete(process.env.REACT_APP_STARTURIBACK + `/admin/missions/active/${data.check}/`)
        }))

        window.location.reload();
    }

    return (
    <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto h-full flex justify-center items-center bg-[#000a]">
        <div className="relative w-full max-w-4xl max-h-full">
            <div className="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700">
                <div className="flex justify-between items-center pr-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white p-6">
                        Activer ou desactiver les mission
                    </h3>
                    <span className="text-xl cursor-pointer" onClick={props.handleClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </span>
                </div>
                <div className="px-6 space-y-6">
                    <table>
                        <thead>
                            <tr>
                                <th>Active</th>
                                <th>Mission</th>
                                <th>Libelle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {missions && missions.map((mission, index)=>{
                                let check = activeMission.includes(mission.id)
                                return (
                                    <tr key={index}>
                                        <td> <input type="checkbox" name="" id="" checked={check} onChange={(e)=>{
                                            if(e.target.checked){
                                                if(!check){
                                                    setMissionActive([...activeMission, mission.id])
                                                }
                                            }else{
                                                if(check){
                                                    setMissionActive(activeMission.filter(m=>m!==mission.id))
                                                }
                                            }
                                        }}/> </td>
                                        <td> {mission.code_mission} </td>
                                        <td> {mission.libelle} </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <Button action={()=>{
                        enregistrer()
                    }}>Enregistrer</Button>
                </div>
            </div>
        </div>
    </div>

  )
}

export default ActiveMission