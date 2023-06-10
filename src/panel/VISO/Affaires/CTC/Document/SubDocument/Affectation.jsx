import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from '../../../../../../component/utils/Button/Button';
import Table from '../../../../../../component/utils/Table/Table';

function Affectation(props) {

  const [dataDocTable, setDataDocTable] = useState([]);
  const [intervenants, setIntervenants] = useState([]);

  useEffect(() => {
    (async ()=>{
      try {
        let id = localStorage.getItem('planAffaire')
        let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/planaffaire/' + id + '/')
        let id_affaire = data.affaire;

        let {data : singleDoc} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_detail_document/${id_affaire}/${props.document}/`);

        let fake_table = [singleDoc];

        let pre_tbl = await Promise.all(fake_table.map(async ft=>{
          return {
            "id" : ft.id,
            "Emetteur" : ft.entreprise.raison_sociale,
            "N externe" : ft.numero_externe,
            "Indice" : ft.indice,
            "Titre" : ft.titre,
            "Dt Reception" : ft.date_reception,
            "Ouvrage" : ft.ouvrage.libelle,
            "Nature" : ft.nature,
            "Dossier" : ft.dossier,
            "Revision" : ft.numero_revision
          }
        }));

        let {data : allCollab} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/all_intervenant/${id_affaire}/`);

        setIntervenants(allCollab);

        setDataDocTable(pre_tbl);
      } catch (error) {
        
      }
    })();
  }, [props.document]);

  let affecter = () => {

  }

  return (
    <div className='pt-4'>
      {props.document === null ? <div className='col-span-2 text-red-600 text-center m-4'>
        Vous n'avez pas sélectionné de document
      </div> : (props.document !== null && dataDocTable.length !== 0 &&
        <Table datas={dataDocTable}/>
      )}
 
      <div className='m-4'>
        <h2 className='font-bold text-sm my-4'>Affecter des intervenants</h2>

        <div className='m-4'>
          {props.document !== null && <Button action={()=>{affecter()}}>Affecter</Button>}
        </div>

        <table className='text-sm table-auto mb-4 min-w-[32rem]'>
          <thead>
            <tr>
              <th className='border-2 border-gray-600 shadow-lg'></th>
              <th className='text-start border-2 border-gray-600 shadow-lg'>Nom</th>
              <th className='text-start border-2 border-gray-600 shadow-lg'>Prenom</th>
              <th className='text-start border-2 border-gray-600 shadow-lg'>Email</th>
            </tr>
          </thead>
          <tbody>
            {intervenants.map(intervenant=>{
              return (
                <tr>
                  <td className='border-b border-gray-400'>
                    <input type="checkbox" name="" id="" />
                  </td>
                  <td className='border-b border-gray-400'>
                    {intervenant.nom}
                  </td>
                  <td className='border-b border-gray-400'>
                    {intervenant.prenom}                    
                  </td>
                  <td className='border-b border-gray-400'>
                    {intervenant.email}                    
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Affectation;
