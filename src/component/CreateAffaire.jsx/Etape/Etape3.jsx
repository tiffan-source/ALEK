import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LabelInput from '../../utils/LabelInput/LabelInput';
import LabelSelect from '../../utils/LabelSelect/LabelSelect';
import validator from 'validator';

const Etape3 = ({ modifyField, dataAffaire, setStringError }) => {
  const [client, setClient] = useState([]);

  useEffect(() => {
    modifyField("statut", dataAffaire.statut || "En cours");

    const fetchData = async () => {
      const response = await axios.get(process.env.REACT_APP_STARTURIBACK + '/entreprise_and_responsable/');
      const dataEntreprise = response.data;
      modifyField("client", dataAffaire.client || dataEntreprise[0].id);
      setClient(dataEntreprise);
    };

    fetchData();

    validate();

  }, []);

  useEffect(()=>{
    validate();
  }, [dataAffaire])

  let validate = () => {
    let {numero, libelle, numero_offre, date_contrat} = dataAffaire;
    if(validator.isEmpty(numero) || !validator.isNumeric(numero)){
      setStringError("Le numero d'affaire doit etre un nombre valid");
      return;
    }
    if (validator.isEmpty(libelle)) {
      setStringError("Le libelle ne peut etre vide")    ;  
      return;
    }
    if (validator.isEmpty(numero_offre) || !validator.isNumeric(numero_offre)) {
      setStringError("Le numero d'offre n'est pas valide")    ;  
      return;
    }
    console.log(validator.isEmpty(date_contrat));
    if (validator.isEmpty(date_contrat) || !validator.isDate(date_contrat, {format: 'YYYY-MM-DD'})) {
      setStringError("La date de contrat doit etre une date valide");  
      return;
    }
    setStringError('');
  }

  return (
    <div>
      <div className='border border-gray-400 p-2 mb-2'>
        <LabelInput label_w="10" label="N° Contrat ALEATEK" disabled />

        <LabelInput
          label_w="10"
          label="N° Affaire ALEATEK"
          value={dataAffaire.numero}
          onChange={(e) => {
            modifyField("numero", e.target.value);
          }}
        />

        <LabelInput
          label_w="10"
          label="Libele Affaire"
          value={dataAffaire.libelle}
          onChange={(e) => {
            modifyField("libelle", e.target.value);
          }}
        />

        <LabelSelect
          label_w="10"
          label="Statut Affaire"
          value={dataAffaire.statut}
          onChange={(e) => {
            modifyField("statut", e.target.value);
          }}
          options={{
            "En cours": "En cours",
            "Achevé": "Achevé",
            "Abandonné": "Abandonné"
          }}
        />
      </div>

      <div className='border border-gray-400 p-2 mb-2'>
        <LabelSelect
          label_w="10"
          label="Client"
          value={dataAffaire.client}
          onChange={(e) => {
            modifyField("client", e.target.value);
          }}
          options={client.reduce((prev, curr) => {
            let key = curr.raison_sociale;
            prev[key] = curr.id;
            return prev;
          }, {})}
        />
      </div>

      <div className='border border-gray-400 p-2 mb-2'>
        <LabelInput
          label_w="10"
          label="N°Offre"
          value={dataAffaire.numero_offre}
          onChange={(e) => {
            modifyField("numero_offre", e.target.value);
          }}
        />

        <LabelInput
          label_w="10"
          label="Date du contrat"
          value={dataAffaire.date_contrat}
          onChange={(e) => {
            modifyField("date_contrat", e.target.value);
          }}
          type="date"
        />
      </div>
    </div>
  );
};

export default Etape3;
