import React, { useEffect, useState } from 'react';
import books from '../../../../../assets/icon/books.png'
import Tabs from '../../../../../component/utils/Tabs/Tabs';
import Chapitre from './SubStepRICT/Chapitre';
import Renseignement from './SubStepRICT/Renseignement';
import DescriptionSommaire from './SubStepRICT/DescriptionSommaire';
import Button from '../../../../../component/utils/Button/Button';
import axios from 'axios';
import MiniLoader from '../../../../../component/utils/Loader/MiniLoader';
import moment from 'moment';
import DescriptionBatiment from './SubStepRICT/DescriptionBatiment';
import Flash from '../../../../../component/utils/Flash/Flash';

function RICT() {

  const [rict, setRict] = useState(null);
  const [load, setLoad] = useState(true);
  const [action, setAction] = useState(false);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(()=>{
    (async()=>{
      let {data:dataAffaire} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/admin/planaffaire/${localStorage.getItem("planAffaire")}/`)
      let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/check_RICT_for_affaire/${dataAffaire.affaire}/`);
      setRict(data)
      setLoad(false);
    })();
  }, [])

  let create = async()=>{
    try {
      let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/admin/planaffaire/${localStorage.getItem("planAffaire")}/`)
      await axios.post(process.env.REACT_APP_STARTURIBACK + `/admin/rict/`,
      {
        date : moment().format('YYYY-MM-DD'),
        affaire : data.affaire,
        statut : 0
      })
      setSuccess(true)
      window.location.reload();
    } catch (error) {
      setAction(false)
      setErrors(error.toString())
    }
  }

  if(load)
    return <MiniLoader/>

  return (
    <div className='w-full h-full'>
      {errors && <Flash setFlash={setErrors}>{errors}</Flash>}
      {success && <Flash type="success" setFlash={setSuccess}>RICT cree avec success</Flash>}
      <h1 className='border-t border-gray-400 p-1 bg-green-200 font-bold'>ALEATEK</h1>
      <nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
        <h2 className='text-blue-800 flex items-center'>
          <img src={books} alt="OilPump" className='w-[2rem]'/>
          Rapport Initiaux de Controle Technique
        </h2>
      </nav>

      <div className='m-4 bg-white p-4'>
        {rict ? <div className='grid grid-cols-2 gap-4'>
          <div>
            <span className='w-[8rem] font-bold inline-block'>Numero</span>
            <span> : {rict.id}</span>
          </div>
          <div>
            <span className='w-[8rem] font-bold inline-block'>Date</span>
            <span> : {rict.date}</span>
          </div>
          <div>
            <span className='w-[8rem] font-bold inline-block'>Titre</span>
            <span> : Rapport Initial de Controle Technique</span>
          </div>
          <div>
            <span className='w-[8rem] font-bold inline-block'>Statut</span>
            <span> : {["En cours", "Accepte", "Classe", "Diffuse"][rict.statut]}</span>
          </div>
        </div>
        : (!action ? <Button action={()=>{
          setAction(true)
          create()
        }}>Creer RICT</Button> : <span className='text-orange-600'>RICT en cours de creation</span> )
        }
      </div>

      {rict && <div>
        <Tabs tabs={[
            {title : "Chapitre", content : <Chapitre rict={rict}/>},
            {title : "Renseignement Generaux", content : <Renseignement/>},
            {title : "Description Sommaire", content : <DescriptionSommaire rict={rict}/>},
            {title : "Description Batiment", content : <DescriptionBatiment rict={rict}/>},
        ]}/>
      </div>}

    </div>
  )
}

export default RICT