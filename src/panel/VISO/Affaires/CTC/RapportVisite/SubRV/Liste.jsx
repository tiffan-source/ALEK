import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '../../../../../../component/utils/Table/Table';

function Liste(props) {
  const [avisTable, setAvisTable] = useState([]);

  useEffect(()=>{
    (async ()=>{
      let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/admin/planaffaire/${localStorage.getItem("planAffaire")}/`);
      let {data: resRapport} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_rapport_visite_by_affaire/${data.affaire}/`)

      let pre_table = await Promise.all(resRapport.map(async rapport=>{
        return {
          "id" : rapport.id,
          "Date" : rapport.date,
          "Object" : rapport.objet,
          "Redacteur" : rapport.redacteur_detail.first_name + " " + rapport.redacteur_detail.last_name
        }
      }));

      setAvisTable(pre_table);
    })();
  }, []);

  return (
    <div>
      {avisTable.length > 0 && <Table datas={avisTable} actionOnLine={(id)=>{props.setRv(id)}}/>}
    </div>
  )
}

export default Liste