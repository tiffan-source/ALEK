import React, { useEffect, useState } from 'react'
import dealIcon from '../../../../assets/icon/deal.png';
import Button from '../../../../component/utils/Button/Button';
import Table from '../../../../component/utils/Table/Table';
import axios from 'axios';
import getOneMission from '../../../../apiService/mission';

function MissionPrestation() {

    const [mission, setMission] = useState([]);

    useEffect(()=>{
        let id = localStorage.getItem("planAffaire");
        if(id){
            axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/plan/affaire/' + id).then(async res=>{
                let data_for_table = await Promise.all(res.data.missions.map(async data => {
                    let mission = await getOneMission(data);
                    return mission;
                }));
                setMission(data_for_table);
            }).catch(err=>{
                // console.log(err);
                localStorage.removeItem("planAffaire")
            })
        }
    }, []);

    return (
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
                <Button>Fermer/Reactiver la mission</Button>
                <h2 className='absolute left-1/2 font-bold'>Liste des missions signes</h2>
            </div>
            {mission.length !==0 && <Table datas={mission}/>}
        </div>
    </div>
  )
}

export default MissionPrestation