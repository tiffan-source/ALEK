import React, { useEffect, useState } from 'react';
import { strutures } from '../structure';
import { panelMaker } from '../utils/panelMaker';
import axios from 'axios';

function Panel() {
  const [affaire, setAffaire] = useState(null)
  useEffect(()=>{
    (async ()=>{
      try {
        let id = localStorage.getItem("planAffaire");
        if(id){
          let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/admin/planaffaire/${id}/`)
          let {data:affaire} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/admin/affaire/${data.affaire}/`);
          setAffaire(affaire)
        }          
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <nav className='h-full border-r-2 border-gray-400'>
      <h2 className='text-lg text-center py-2 bg-gray-200 border-b-2 border-gray-400 flex flex-col'>
        Aleatek App Tool
        <span className='text-sm text-red-800'>{process.env.REACT_APP_URIBACK}</span>
        <span className='text-sm text-red-800'>{process.env.REACT_APP_STARTURIBACK}</span>
        {affaire ? <span className='text-sm text-green-500'>Affaire N{affaire.numero}</span> : ''}
      </h2>
      <div className='p-4 shadow-inner'>
        {panelMaker(strutures, null)}
      </div>
    </nav>
  )
}

export default Panel