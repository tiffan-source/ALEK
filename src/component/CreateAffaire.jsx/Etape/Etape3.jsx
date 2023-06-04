import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LabelInput from '../../utils/LabelInput/LabelInput';
import LabelSelect from '../../utils/LabelSelect/LabelSelect';

const Etape3 = ({ modifyField, dataAffaire }) => {
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
  }, []);

  const validateForm = () => {
    // Logique de validation ici
  };

  return (
    <div>
      <div className='border border-gray-400 p-2 mb-2'>
        <LabelInput label="N° Contrat ALEATEK" disabled />

        <LabelInput
          label="N° Affaire ALEATEK"
          value={dataAffaire.numero}
          onChange={(e) => {
            modifyField("numero", e.target.value);
          }}
        />

        <LabelInput
          label="Libele Affaire"
          value={dataAffaire.libelle}
          onChange={(e) => {
            modifyField("libelle", e.target.value);
          }}
        />

        <LabelSelect
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
          label="N°Offre"
          value={dataAffaire.numero_offre}
          onChange={(e) => {
            modifyField("numero_offre", e.target.value);
          }}
        />

        <LabelInput
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
