import axios from 'axios';
import React, { useEffect, useState } from 'react';
function Gestion(props) {
  let [result, setResult] = useState({});

  useEffect(()=>{
    (async()=>{
      let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_rapport_visite_by_affaire_one_version/${props.rv}/`)
      setResult(data)
    })();
  }, [props.rv]);

  return (
    <div>
      <div className='bg-white my-4'>
        <h2 className='bg-gray-300 shadow-inner px-4 py-1'>Rapport de Visite</h2>
        <div className='text-sm grid grid-cols-2 p-4 gap-4'>
            <div>
                <span>Date : </span>
                <span>{result.date}</span>
            </div>
            <div>
                <span>Responsable d'affaire / Redacteur : </span>
                <span>{result.redacteur_detail && (result.redacteur_detail.first_name + " " + result.redacteur_detail.last_name)}</span>
            </div>
            <div>
                <span>Objet : </span>
                <span>{result.objet}</span>
            </div>
        </div>
    </div>

    </div>
  )
}

export default Gestion