import React, { useState } from 'react';
import Etape1 from './Etape/Etape1';
import Etape3 from './Etape/Etape3';
import Etape4 from './Etape/Etape4';
import Etape5 from './Etape/Etape5';
import Etape8 from './Etape/Etape8';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../utils/Button/Button';
import axios from 'axios';
import Flash from '../utils/Flash/Flash';

const MainModal = ({ handleClose }) => {
  const [index, setIndex] = useState(0);
  const [stringErrors, setStringError] = useState("");
  const [flash, setFlash] = useState(false);
  const [success, setSuccess] = useState(false)

  const [dataFormAffaire, setDataFormAffaire] = useState({
    numero: '',
    libelle: '',
    statut: '',
    numero_offre: '',
    libelle_contrat: '',
    date_contrat: '',
    client: '',
    charge: '',
    assistant: '',
    chef: '',
  });
  const [dataFormPlanAffaire, setDataFormPlanAffaire] = useState({
    numero: '',
    risque: '',
    libelle: '',
    devise: '',
    type: '',
    type_montant: '',
    prix: '',
    debut_chantier: '',
    fin_chantier: '',
    debut_prestation : '',
    visite: '',
    doc : '',
    affaire: '',
  });
  const [batiment, setBatiment] = useState('')
  const [adress, setAdress] = useState({
    cplt_geo : "",
    numero_voie : "",
    lieu_dit : "",
    code_postal : "",
    ville : "",
    pays : "",
    departement : "",
    province : "",
});


  const modifyAffaireField = (field, value) => {
    setDataFormAffaire((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const modifyPlanField = (field, value) => {
    setDataFormPlanAffaire((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const createAffaireAndPlan = async (missions) => {
    try {
        // Creer l'affaire
        let resAffaire = await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/affaire/',
        dataFormAffaire, {withCredentials : true})

        // Creer le plan d'affaire
        let resPlanAffaire = await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/planaffaire/',
        {...dataFormPlanAffaire, affaire: resAffaire.data.id}, {withCredentials : true})

        // Creer l'adress du chantier
        let resAdress = await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/adresse/',
        adress, {withCredentials: true})

        // Creer le chantier
        await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/chantier/',
        {batiment : batiment, plan_affaire : resPlanAffaire.data.id, adresse : resAdress.data.id})

        // Creer les missions actives
        await Promise.all(missions.map(async mission=>{
            await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/missions/active/',
            {id_mission : mission, id_affaire : resAffaire.data.id})
        }))

        setSuccess(true);

        setTimeout(()=>{
          window.location.reload();
        }, 2000)
        
    } catch (error) {
        console.log(error);
    }
  };

  const stages = [
    <Etape1
    />,
    <Etape3
      setStringError={setStringError}
      modifyField={modifyAffaireField}
      dataAffaire={dataFormAffaire}
    />,
    <Etape4
      setStringError={setStringError}
      dataAffaire={dataFormAffaire}
      dataPlan={dataFormPlanAffaire}
      modifyField={modifyPlanField}
      adress={adress}
      setAdress={setAdress}
      batiment={batiment}
      setBatiment={setBatiment}
    />,
    <Etape5
      dataAffaire={dataFormAffaire}
      dataPlan={dataFormPlanAffaire}
      modifyField={modifyAffaireField} 
    />,

    <Etape8
      modifyField={modifyPlanField}
      create={createAffaireAndPlan}
    />,
  ];

  const handlePrev = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (index < stages.length - 1) {
      if(!stringErrors){
        setIndex((prevIndex) => prevIndex + 1);
        setFlash(false)
      }
      else{
        setFlash(true)
      }
    }
  };

  return (
    <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto h-full flex justify-center items-center bg-[#000a]">
      <div className="relative w-full max-w-4xl max-h-full">
        <div className="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-center pr-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white p-6">
              Assistant de création d'un nouveau "Plan d'Affaire "
            </h3>
            <span className="text-xl cursor-pointer" onClick={handleClose}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
          <div className="px-6 space-y-6">{stages[index]}</div>
          <div className="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <span>
              {index + 1} / {stages.length}
            </span>

            <div className="flex items-center justify-between gap-4">
              <div>
                {index > 0 && (
                  <Button action={handlePrev}>Precedent</Button>
                )}
                {index < stages.length - 1 && (
                  <Button action={handleNext}>Suivant</Button>
                )}
              </div>

              <div>
                <Button action={handleClose}>Annuler</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {flash && <Flash setFlash={setFlash} type={!stringErrors}>{stringErrors}</Flash>}
      {success && <Flash setFlash={setFlash} type="success">Affaire Cree</Flash>}
    </div>
  );
};

export default MainModal;
