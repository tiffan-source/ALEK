import React, { useState, useEffect } from 'react';
import ouvrage from '../../../../../assets/icon/publication.png';
import Button from '../../../../../component/utils/Button/Button';
import AddMission from '../../../../../component/AddMission/AddMission';
import axios from 'axios'
import ChooseCollabForOuvrage from '../../../../../component/ChooseCollabForOuvrage/ChooseCollabForOuvrage';

function OuvrageDiffusion() {
    const [modal, setModal] = useState(false);
    const [modalForEntreprise, setModalForEntreprise] = useState(null);
    const [ouvrageAffaires, setOuvrageAffaires] = useState([]);

    useEffect(()=>{
      (async()=>{
        try {
          let id = localStorage.getItem('planAffaire')
          let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/planaffaire/' + id + '/')
          let id_affaire = data.affaire;
          let {data: allData} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_ouvrage_affaire/${id_affaire}/`)
          let save = allData;
          await Promise.all(save.map(async sv=>{
            let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/entreprise_for_affaire_ouvrage/' + sv.id + '/')
            sv.entreprise = data;
            return sv;
          }))
          // console.log(save);
          setOuvrageAffaires(allData);
        } catch (error) {
          console.log(error);          
        }

      })();
    }, []);

    return (
      <>
      {modal && <AddMission handleClose={()=>{setModal(false)}}/>}
      {modalForEntreprise !==null && <ChooseCollabForOuvrage ouvrage_affaire={modalForEntreprise} handleClose={()=>{setModalForEntreprise(null)}}/>}
      <div className='w-full h-full text-sm'>
        <h1 className='border-t border-gray-400 p-1 bg-green-200 font-bold'>ALEATEK</h1>
        <nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
          <h2 className='text-blue-800 flex items-center'>
            <img src={ouvrage} alt="Ouvrage" className='w-[2rem]'/>
            Ouvrage Diffusion
          </h2>
        </nav>

        <div className='flex-grow'>
          <div><Button action={()=>{setModal(true)}}>Ajouter un ouvrage</Button></div>
            <div className='grid grid-cols-[5rem_auto] bg-gray-900 text-white'>
              <span className='p-4'>Diffusion</span>
              <span className='p-4'>Libelle</span>
            </div>
            {ouvrageAffaires.map((oA, index)=>{
              return (
                <div key={index} className='mb-6'>
                  <div className='grid grid-cols-[5rem_auto_auto] bg-white'>
                    <span className='p-2'></span>
                    <span className='p-2'>{oA.ouvrage.libelle}</span>
                  </div>
                  <div className='flex justify-end my-1'>
                    <Button action={() => { setModalForEntreprise(oA.id) }}>Ajouter une entrepise</Button>
                  </div>
                  <div className='flex justify-end'>
                    <table className='mr-4 bg-white'>
                      <thead>
                        <tr className='grid grid-cols-[12rem_12rem_12rem]'>
                          <th className='border border-gray-400 px-2'>Raison Sociale</th>
                          <th className='border border-gray-400 px-2'>Siret</th>
                          <th className='border border-gray-400 px-2'>Activite</th>
                        </tr>
                      </thead>
                      <tbody>
                        {oA.entreprise.map(dt=>{
                          return (
                            <tr className='grid grid-cols-[12rem_12rem_12rem] border-b border-gray-400'>
                              <td>{dt.entreprise.raison_sociale}</td>
                              <td>{dt.entreprise.siret}</td>
                              <td>{dt.entreprise.activite}</td>
                            </tr>  
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })}
        </div>
      </div>    
      </>
    )
}

export default OuvrageDiffusion