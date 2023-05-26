import React, { useEffect, useState } from 'react'
import Recu from './SubDocument/Recu';
import Affectation from './SubDocument/Affectation';
import Verification from './SubDocument/Verification';
import Tabs from '../../../../../component/utils/Tabs/Tabs';
import axios from 'axios';
import document from '../../../../../assets/icon/documents.png';
function Document() {

  const [documentSelect, setdocumentSelect] = useState(null);

  useEffect(()=>{
    let id = localStorage.getItem("planAffaire");
    if(id){
      axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/plan/affaire/' + id).then(res=>{
      }).catch((error)=>{
        localStorage.removeItem("planAffaire")
      })
    }
  }, []);

  return (
    <>
      <div className='w-full h-full'>
        <h1 className='border-t border-gray-400 p-1 bg-green-200 font-bold'>ALEATEK</h1>
        <nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
          <h2 className='text-blue-800 flex items-center'>
            <img src={document} alt="OilPump" className='w-[2rem]'/>
            Documents
          </h2>
        </nav>

        <Tabs tabs={[
          {title : "Documents recus", content : <Recu document={documentSelect} selectDocument={setdocumentSelect}/>},
          {title : "Affectations", content : <Affectation document={documentSelect}/>},
          {title : "Verification", content : <Verification/>}
        ]}/>
      </div>
    </>
  )
}

export default Document