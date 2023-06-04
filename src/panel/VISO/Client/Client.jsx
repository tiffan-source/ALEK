import React, { useEffect, useState } from 'react';
import Iconclients from '../../../assets/icon/clients.png'
import Button from '../../../component/utils/Button/Button';
import axios from 'axios';
import CreateEntreprise from '../../../component/Modal/CreateEntreprise';

function Client() {
  const [clients, setClients] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(()=>{
    (async ()=>{
      let data = await axios.get(process.env.REACT_APP_STARTURIBACK + '/entreprise_and_responsable/');
      setClients(data.data);
    })();
  }, []);

  return (
  <>
    {modal && <CreateEntreprise close={()=>{setModal(false)}}/>}
    <div className='w-full h-full'>
      <h1 className='border-t border-gray-400 p-1 bg-green-200 font-bold'>ALEATEK</h1>
      <nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
        <h2 className='text-blue-800 flex items-center'>
          <img src={Iconclients} alt="OilPump" className='w-[2rem]'/>
          Gestions des clients
        </h2>
      </nav>

      <div>
        <div className='my-4'>
          <Button action={()=>{setModal(true)}}>Ajouter</Button>
        </div>
        <div>
          <table className='w-full mt-6'>
            <thead>
              <tr className='grid grid-cols-[2fr_2fr_2fr_2fr_1fr]'>
                <th className='text-start p-1 bg-gray-600 text-white'>Raison Sociale</th>
                <th className='text-start p-1 bg-gray-600 text-white'>Contacts</th>
                <th className='text-start p-1 bg-gray-600 text-white'>Activite</th>
                <th className='text-start p-1 bg-gray-600 text-white'>Ville</th>
                <th className='text-start p-1 bg-gray-600 text-white'>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client=>{
                return (
                  <tr className='grid grid-cols-[2fr_2fr_2fr_2fr_1fr]'>
                    <td>{client.raison_sociale}</td>
                    <td>{client.responsables.length!==0&&(client.responsables[0].nom + " " + client.responsables[0].prenom)}</td>
                    <td>{client.activite}</td>
                    <td>{client.adresse.ville}</td>
                    <td> <Button>Supprimer</Button> <Button>Editer</Button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>

  )
}

export default Client