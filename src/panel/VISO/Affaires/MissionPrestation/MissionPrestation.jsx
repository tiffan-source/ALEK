import React, { useEffect, useState } from 'react'
import dealIcon from '../../../../assets/icon/deal.png';
import Button from '../../../../component/utils/Button/Button';
import Table from '../../../../component/utils/Table/Table';
import axios from 'axios';
import ActiveMission from '../../../../component/ActiveMission/ActiveMission';

function MissionPrestation() {

    const [mission, setMission] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(()=>{
        (async()=>{
            let id = localStorage.getItem("planAffaire");
            if(id){
                let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/mission_sign/' + id + '/');
                let mission_for_table = await Promise.all(data.map(async dt=>{
                    let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/mission/' + dt.id_mission_id + '/');
                    return {
                        "id" : data.id,
                        "Mission" : data.code_mission,
                        "Libelle" : data.libelle,
                    }
                }));
                setMission(mission_for_table)
            }
        })();
    }, []);

    return (
    <>
        {modal && <ActiveMission mission_active={mission.map(m=>m.id)} handleClose={()=>{setModal(false)}}/>}
        <div className='w-full h-full text-sm min-h-screen flex flex-col'>
            <h1 className='border-t border-gray-400 p-1 MissionPrestationbg-green-200 font-bold'>Aleatek</h1>

            <nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
                <h2 className='text-blue-800 flex items-center '>
                    <img src={dealIcon} alt="OilPump" className='w-[2rem] mr-2'/>
                    Missions
                </h2>
            </nav>

            <div className='flex-grow'>
                <div className='flex relative items-center my-4'>
                    <Button action={()=>{setModal(true)}}>Fermer/Reactiver la mission</Button>
                    <h2 className='absolute left-1/2 font-bold'>Liste des missions signes</h2>
                </div>
                {mission.length !==0 && <Table datas={mission}/>}
            </div>
        </div>
    </>

  )
}

export default MissionPrestation;