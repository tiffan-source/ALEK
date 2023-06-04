import React, { useEffect, useState } from 'react';
import LabelInput from '../../../../../../component/utils/LabelInput/LabelInput';
import Button from '../../../../../../component/utils/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateDocument from '../../../../../../component/CreateDocument/CreateDocument';
import Table from '../../../../../../component/utils/Table/Table';
import LabelSelect from '../../../../../../component/utils/LabelSelect/LabelSelect';
import axios from 'axios';

const Recu = (props) => {
  const [newDocument, setNewDocument] = useState(false);
  const [dataForTable, setDataForTable] = useState([]);

  useEffect(()=>{
    (async()=>{
      try {
        let id = localStorage.getItem('planAffaire')
        let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/planaffaire/' + id + '/')
        let id_affaire = data.affaire;
        let {data: docDetail} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_detail_document/${id_affaire}/`);
        let prepare_for_table = await Promise.all(docDetail.map(doc=>{
          return {
            "id" : doc.id,
            "Emetteur" : doc.entreprise.raison_sociale,
            "N externe" : doc.numero_externe,
            "Indice" : doc.indice,
            "Titre" : doc.titre,
            "Dt Reception" : doc.date_reception,
            "Ouvrage" : doc.ouvrage.libelle,
            "Nature" : doc.nature,
            "Dossier" : doc.dossier,
            "Revision" : doc.numero_revision
          }
        }));

        setDataForTable(prepare_for_table)
      } catch (error) {
        console.log(error);        
      }
    })();
  }, [])

  let component = (dataForTable.length!==0 && <Table datas={dataForTable} actionOnLine={(id)=>{
    props.selectDocument(id)
  }}/>) || <div>Aucun Document</div>;

  if (newDocument) {
    component = <CreateDocument annuler={() => { window.location.reload() }} />;
  }

  return (
    <div>
      <div className='bg-gray-400 border-4 border-green-400 text-white text-sm flex flex-wrap'>
        <div className='flex flex-wrap'>
          <LabelInput col label="Dossier" />
          <LabelInput col label="Nature" />
          <LabelInput col label="Numero Aleatek" />
          <LabelInput col label="Titre" />
          <LabelInput col label="N externe" />
          <LabelInput col label="Indice" />
          <LabelInput col label="Date Indice" />
          <LabelInput col label="Date Reception" />
        </div>
        <div className='flex gap-8'>
          <LabelSelect col label="Emetteur" />
          <LabelSelect readOnly col label="Ouvrage" />
        </div>
      </div>
      <div className='m-2 flex justify-between'>
        <div>
          <Button action={()=>{setNewDocument(!newDocument)}}><FontAwesomeIcon icon={faPlus} /> Nouveau Document</Button>
        </div>
        <div>
          <Button>Filtrer</Button>
          <Button>Reset</Button>
        </div>
      </div>
      {component}
    </div>
  );
};

export default Recu;
