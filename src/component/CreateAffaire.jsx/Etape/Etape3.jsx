import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LabelInput from '../../utils/LabelInput/LabelInput';
import LabelSelect from '../../utils/LabelSelect/LabelSelect';
import validator from 'validator';

const Etape3 = ({ modifyField, dataAffaire, setStringError }) => {
  const [client, setClient] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    modifyField("statut", dataAffaire.statut || "En cours");

    const fetchData = async () => {
      const response = await axios.get(process.env.REACT_APP_STARTURIBACK + '/entreprise_and_responsable/');
      const dataEntreprise = response.data;
      modifyField("client", dataAffaire.client || (dataEntreprise.length !== 0 && dataEntreprise[0].id) || "");
      setClient(dataEntreprise);
      setLoad(false);
    };

    fetchData();
    validate();

  }, []);

  useEffect(()=>{
    validate();
  }, [dataAffaire])

  let validate = () => {
    let {numero_contrat, libelle} = dataAffaire;
    if(validator.isEmpty(numero_contrat) || !validator.isNumeric(numero_contrat)){
      setStringError("Le numero de contrat doit etre un nombre valid");
      return;
    }
    if (validator.isEmpty(libelle)) {
      setStringError("Le libelle ne peut etre vide")    ;  
      return;
    }
    setStringError('');
  }

  return (
    <div>
      <div className='border border-gray-400 p-2 mb-2'>
        <LabelInput
          label_w="10"
          label="N° Contrat"
          value={dataAffaire.numero_contrat}
          required
          onChange={(e) => {
            modifyField("numero_contrat", e.target.value);
          }}
        />

        <LabelInput
          label_w="10"
          label="Libele Affaire"
          required
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
        {! load ? <LabelSelect
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
        /> : <span className='text-green-600'>Donnee en cours de chargement</span>}

        {dataAffaire.client === "" && <span className='text-red-600'>Vous n'avez enregistrer aucun client</span>}
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
