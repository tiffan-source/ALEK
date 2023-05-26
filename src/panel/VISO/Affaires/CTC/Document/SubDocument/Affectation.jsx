import axios from 'axios';
import React, { useEffect, useState } from 'react'
import getOneIT from '../../../../../../apiService/IT';
import getOneCollaborateur from '../../../../../../apiService/collaborateur';
import getOneOuvrage from '../../../../../../apiService/ouvrage';
import getOneConstructeur from '../../../../../../apiService/constructeur';
import Button from '../../../../../../component/utils/Button/Button';
import moment from 'moment';

function Affectation(props) {
  const [dataDocument, setDataDocument] = useState({});

  const [contructeur, setConstructeur] = useState({});
  const [ouvrage, setOuvrage] = useState({});
  const [numerAffaire, setNumeroAffaire] = useState(null);

  const [IT, setIT] = useState([]);
  const [intervenant, setIntervenant] = useState([]);

  const [ITSelect, setITSelect] = useState([]);
  const [intervenantSelect, setIntervenantSelect] = useState([]);

  useEffect(()=>{
    let id = localStorage.getItem("planAffaire");
    if (id) {
      axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/planaffairefilter/' + id).then(async resofAffaire=>{
        let data_for_it = await Promise.all(resofAffaire.data.intervention_technique.map(async data => {
            let it = await getOneIT(data);
            return it;
        }));
        setIT(data_for_it);

        let data_for_intervenant = await Promise.all(resofAffaire.data.affaires.intervenant.map(async data=>{
            let intervenant = await getOneCollaborateur(data);
            return intervenant;
        }))
        setIntervenant(data_for_intervenant);

        setNumeroAffaire(resofAffaire.data.affaires.numero_affaire);

        if (props.document) {
          axios
            .get(process.env.REACT_APP_STARTURIBACK + '/admin/document/' + props.document)
            .then(async res => {
              let result = { ...res.data };
              let collab = await getOneConstructeur(res.data.emetteur);
              let ouvrage = await getOneOuvrage(res.data.ouvrage);

              axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/intervenant/' + result.affectation[result.affectation.length - 1]).then(dataAffectation=>{
                let result = dataAffectation.data;
                setITSelect(result.intervention_technique);
                setIntervenantSelect(result.intervenant);
              });
              
              setOuvrage(ouvrage);
              setConstructeur(collab);
              setDataDocument(result);
            })

          
        }
      }).catch(err=>{
        // console.log(err);
        localStorage.removeItem("planAffaire")
      });
    }
  }, [props.document]);

  let affecter = ()=>{
    axios.get("http://localhost:8000/connecte-users/").then(resUser=>{
      let idUser = resUser.data.results[0].id;
      axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/intervenant/', {
        "affecte_le": moment().format('YYYY-MM-DD'),
        "action": false,
        "affecte_par": idUser,
        "intervenant": intervenantSelect,
        "intervention_technique": ITSelect
      }, {withCredentials : true}).then(dataAffectation=>{
        axios.put(process.env.REACT_APP_STARTURIBACK + '/admin/document/' + dataDocument.id + '/',
        {
          ...dataDocument,
          affectation : [...dataDocument.affectation, dataAffectation.data.id]
        }, {withCredentials : true}).then(res=>{
          this.props.annuler();
        })
      });
    })
  }

  return (
    <div className='grid grid-cols-2'>
      {props.document === null ? <div className='col-span-2 text-red-600 text-center'>
        Vous n'avez pas selectionner de document
      </div> : (Object.keys(dataDocument).length!==0 &&
        <table className='col-span-2 text-sm my-3'>
          <thead>
            <tr>
              <th className='border border-1 border-gray-800'>Emetteur</th>
              <th className='border border-1 border-gray-800'>N externe</th>
              <th className='border border-1 border-gray-800'>Indice</th>
              <th className='border border-1 border-gray-800'>Titre</th>
              <th className='border border-1 border-gray-800'>Ouvrage</th>
              <th className='border border-1 border-gray-800'>Nature</th>
              <th className='border border-1 border-gray-800'>N Aleatek</th>
              <th className='border border-1 border-gray-800'>Date reception</th>
              <th className='border border-1 border-gray-800'>Dossier</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{contructeur.raison_social}</td>
              <td>{dataDocument.numero_externe}</td>
              <td>{dataDocument.indice}</td>
              <td>{dataDocument.titre}</td>
              <td>{ouvrage.libelle}</td>
              <td>{dataDocument.nature}</td>
              <td>{numerAffaire}</td>
              <td>{dataDocument.date_de_reception}</td>
              <td>{dataDocument.dossier}</td>
            </tr>
          </tbody>
        </table>
      )}
      <div>
        <h2 className='font-bold text-sm my-4'>Affecter des interventions techniques</h2>

        <table className='text-sm table-auto mb-4'>
          <thead>
            <tr>
              <th className='border-2 border-gray-600 shadow-lg '></th>
              <th className='border-2 border-gray-600 shadow-lg text-start'>Code Intervention technique</th>
              <th className='border-2 border-gray-600 shadow-lg text-start'>Libelle Intervention technique</th>
            </tr>
          </thead>
          <tbody>
            {
              IT.map((dataIT, index)=>{
                let check = ITSelect.includes(dataIT.id)
                return (
                  <tr key={index} className='border-b-2 border-gray-600'>
                    <td><input type="checkbox" checked={check} onClick={(e)=>{
                      if(e.target.checked){
                        if(!ITSelect.includes(dataIT.id)){
                          setITSelect([...ITSelect, dataIT.id]);
                        }
                      }else{
                        if(ITSelect.includes(dataIT.id)){
                          setITSelect(ITSelect.filter(dt=>dt!==dataIT.id));
                        }
                      }
                    }}/></td>
                    <td>{dataIT.cod_it}</td>
                    <td>{dataIT.libelle_it}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div>
        <h2 className='font-bold text-sm my-4'>Affecter des intervenants</h2>

        <table className='text-sm table-auto mb-4'>
          <thead>
            <tr>
              <th className='border-2 border-gray-600 shadow-lg'></th>
              <th className='text-start border-2 border-gray-600 shadow-lg'>Intervenant</th>
              <th className='text-start border-2 border-gray-600 shadow-lg'>Service</th>
            </tr>
          </thead>
          <tbody>
            {
              intervenant.map((dataIntervenant, index)=>{
                let check = intervenantSelect.includes(dataIntervenant.id)
                return (
                  <tr key={index} className='border-b-2 border-gray-600'>
                    <td><input type="checkbox" checked={check}  onClick={(e)=>{
                      if(e.target.checked){
                        if(!intervenantSelect.includes(dataIntervenant.id)){
                          setIntervenantSelect([...intervenantSelect, dataIntervenant.id]);
                        }
                      }else{
                        if(intervenantSelect.includes(dataIntervenant.id)){
                          setIntervenantSelect(intervenantSelect.filter(dt=>dt!==dataIntervenant.id));
                        }
                      }
                    }}/></td>
                    <td>{dataIntervenant.last_name + " " + dataIntervenant.first_name}</td>
                    <td>{dataIntervenant.numero_service}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div className='col-span-2 flex justify-center'>
      {props.document !== null &&
        <Button action={affecter}>Affecter</Button>}
      </div>
    </div>
  )
}

export default Affectation