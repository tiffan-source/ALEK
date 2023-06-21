import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '../../../../../../component/utils/Button/Button';
import ListDiffusion from './SubGestionRV/ListDiffusion';
import Tabs from '../../../../../../component/utils/Tabs/Tabs';
import Livrable from './SubGestionRV/Livrable';
import MiniLoader from '../../../../../../component/utils/Loader/MiniLoader';
import GestionRemarque from './SubGestionRV/GestionRemarque';

const table_statut = ["En cours", "Accepter", "Classer", "Diffuser"]

function Gestion(props) {
  let [result, setResult] = useState({});
  const [load, setLoad] = useState(true)

  useEffect(()=>{
    (async()=>{
      let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_rapport_visite_by_affaire_one_version/${props.rv}/`)
      setResult(data)
      setLoad(false)
    })();
  }, [props.rv]);

  let valider = async ()=>{
    await axios.put(process.env.REACT_APP_STARTURIBACK + `/admin/rapport/visite/${result.id}/`,{
      date : result.date,
      affaire : result.affaire,
      objet : result.objet,
      statut : 1
    }, {withCredentials: true})

    window.location.reload();
  }

  if(load)
    return <MiniLoader/>

  return (
    <div>
      <div className='bg-white my-4'>
        <h2 className='bg-gray-300 shadow-inner px-4 py-1'>Rapport de Visite</h2>
        <div className='text-sm grid grid-cols-2 p-4 gap-4'>
            <div>
                <span className='font-bold'>Date : </span>
                <span>{result.date}</span>
            </div>
            <div>
                <span className='font-bold'>Statut : </span>
                <span>{table_statut[result.statut]}</span>
            </div>
            <div>
                <span className='font-bold'>Responsable d'affaire / Redacteur : </span>
                {/* <span>{result.redacteur_detail && (result.redacteur_detail.first_name + " " + result.redacteur_detail.last_name)}</span> */}
            </div>
            <div>
                <span className='font-bold'>Objet : </span>
                <span>{result.objet}</span>
            </div>
        </div>
        <div className='p-4'>
          {result.statut == 0 && <Button action={()=>{
            valider()
          }}>Valider</Button>}
        </div>
      </div>


      <div className='bg-white my-4'>
        <Tabs tabs={[
            {title: 'Gestion des remarques', content : <GestionRemarque id={result.id}/>},
            {title: 'List de diffusion', content : <ListDiffusion id={result.id}/>, disabled : result.id === undefined},
            {title: 'Livrable', content : <Livrable id={result.id}/>},
        ]}/>
      </div>
    </div>
  )
}

export default Gestion