import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import LabelInput from '../../utils/LabelInput/LabelInput';
import LabelSelect from '../../utils/LabelSelect/LabelSelect';
import LabelCheckbox from '../../utils/LabelCheckbox/LabelCheckbox';
import Adresse from '../../Adresse/Adresse';
import validator from 'validator';

const Etape4 = ({ modifyField, setBatiment, batiment, dataAffaire, dataPlan, adress, setAdress, setStringError }) => {
  const [duree, setDuree] = useState(0);
  const [load, setLoad] = useState(true);
  const [startChantier, setStartChantier] = useState('');
  const [endChantier, setEndChantier] = useState('');
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    modifyField('devise', '€');
    modifyField('numero', '1');
    modifyField('type_montant', 'HT');
    modifyField('type', 'CTC');
    modifyField('risque', 'Normal');

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_STARTURIBACK}/admin/batiment/`);
        setBatiment(batiment || response.data.results[0].id || "");
        setDestinations(response.data.results);
      } catch (error) {
        console.log(error);
      }
      setLoad(false);
    };

    fetchData();
    validate();
  }, []);

  useEffect(()=>{
    validate();
  }, [dataPlan, adress])

  let validate = () => {
    setStringError('');
  }

  const setDebutChantier = (e) => {
    const debut = new Date(e.target.value);
    const formattedDate = moment(debut.toLocaleDateString()).format('YYYY-MM-DD');
    setStartChantier(formattedDate);
    modifyField('debut_chantier', formattedDate);
  };

  const setFinChantier = (e) => {
    const value = parseInt(e.target.value);
    const start = new Date(dataPlan.debut_chantier);
    const startDate = moment(start.toLocaleDateString());

    if (value < 0) {
      setDuree(0);
      setEndChantier(startDate.format('YYYY-MM-DD'));
    } else {
      const end = startDate.clone().add(value, 'month');
      setDuree(value);
      setEndChantier(end.format('YYYY-MM-DD'));
      modifyField('fin_chantier', end.format('YYYY-MM-DD'));
    }
  };

  const setDureeChantier = (e) => {
    const end = new Date(e.target.value);
    const endDate = moment(end.toLocaleDateString());
    const start = moment(startChantier);

    const duree = Math.ceil(Math.abs(start.diff(endDate, 'M')));
    setDuree(duree);
    setEndChantier(endDate.format('YYYY-MM-DD'));
    modifyField('fin_chantier', endDate.format('YYYY-MM-DD'));
  };

  return (
    <>
      <div>
        <div className="flex gap-8">
          <LabelInput label="N° Contrat" value={dataAffaire.numero_contrat} disabled/>
          <LabelInput label="N° Plan" disabled value={1} />
        </div>

        <LabelInput label="Libelle Affaire" value={dataAffaire.libelle} disabled />

        <LabelInput
          label="Libele Plan Affaire"
          value={dataPlan.libelle}
          onChange={(e) => {
            modifyField('libelle', e.target.value);
          }}
        />
      </div>

      <div className="border border-gray-400 p-2 mb-2">
        <div className="flex items-center justify-between">
          <LabelInput
            col
            label="Montant travaux"
            value={dataPlan.prix}
            onChange={(e) => {
              modifyField('prix', e.target.value);
            }}
          />

          <LabelSelect
            col
            label="Devise"
            value={dataPlan.devise}
            onChange={(e) => {
              modifyField('devise', e.target.value);
            }}
            options={{
              '€': '€',
              '$': '$',
            }}
          />

          <LabelSelect
            col
            label="(HT/TTC)"
            value={dataPlan.type_montant}
            onChange={(e) => {
              modifyField('type_montant', e.target.value);
            }}
            options={{
              'HT': 'HT',
              'TTC': 'TTC',
            }}
          />

          {!load ? <LabelSelect
            col
            label="Destination"
            value={batiment}
            onChange={(e) => {
              setBatiment(e.target.value);
            }}
            options={destinations.reduce((prev, curr) => {
              let key = curr.libelle;
              prev[key] = curr.id;
              return prev;
            }, {})}
          /> : <span className='text-green-600'>Donee en cours de chargement</span>}

          {batiment === "" && <span className='text-red-600'>Aucun Batiment disponible en base de donnee</span>}

        </div>

        <LabelInput
          label="Date début Prestation"
          value={dataPlan.debut_prestation}
          type="date"
          onChange={(e) => {
            modifyField('debut_prestation', e.target.value);
          }}
        />

        <div className="flex justify-between">
          <LabelInput
            label="Date de début du chantier"
            value={dataPlan.debut_chantier || startChantier}
            type="date"
            onChange={setDebutChantier}
          />
          <LabelInput
            label="Duree"
            type="number"
            value={duree}
            onChange={setFinChantier}
            span_info="Mois"
          />
        </div>

        <LabelInput
          label="Date de fin"
          type="date"
          value={dataPlan.fin_chantier || endChantier}
          onChange={setDureeChantier}
        />

        <div className="flex justify-between">
          <LabelInput
            label="Nb document a examiner"
            value={dataPlan.doc}
            type="number"
            onChange={(e) => {
              modifyField('doc', e.target.value);
            }}
          />

          <LabelInput
            label="Nb visites/reunions prevues"
            value={dataPlan.visite}
            type="number"
            onChange={(e) => {
              modifyField('visite', e.target.value);
            }}
          />
        </div>

        <div className="flex justify-between">
          <LabelSelect
            label="Type d'affaire"
            value={dataPlan.type}
            onChange={(e) => {
              modifyField('type', e.target.value);
            }}
            options={{
              'CTC': 'CTC',
              'VT': 'VT',
            }}
          />

          <LabelSelect
            label="Risque"
            value={dataPlan.risque}
            onChange={(e) => {
              modifyField('risque', e.target.value);
            }}
            options={{
              'Normal': 'Normal',
              'Particulier': 'Particulier',
              'Complexe': 'Complexe',
            }}
          />
        </div>
      </div>

      <div>
        <span>Adresse du Chantier</span>
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-gray-600 p-1">
            <Adresse adress={adress} setAdress={setAdress} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Etape4;
