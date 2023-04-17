import React, { useState } from 'react';
import { RiFilterLine, RiRefreshLine, RiEraserLine, RiArrowGoBackLine,RiBrightnessIncreaseLine, RiArrowDownLine, RiAddCircleLine, RiSaveLine, RiLoop2Line, RiDeleteBinLine, RiSubtractLine, RiArrowUpLine, RiArrowRightLine } from 'react-icons/ri';
import { Button, Modal } from 'react-bootstrap';
import "C:/ALEK/src/index.css";

function Affaires() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);



  return (
    <div className='bg-gray-200'>
        <div className="font-mono text-xl">ALEATEK
        <hr
      class="my-0.3 h-0.5 border-t-0 bg-black opacity-100 dark:opacity-50" /></div>

        <div className="flex justify-between items-center py-2">
          <div className="font-mono text-xl">Affaires</div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-green-600" onClick={handleShowModal}>
              <RiAddCircleLine />
            <span>Nouv. Plan d'affaires</span>
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-green-600">
            <RiArrowRightLine />
            <span>Listes</span>
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
          ⏪
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
          ◀️
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
          ➕ 
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
          💾 
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
            🔃
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
             📨
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
            <RiSubtractLine />
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
          ▶️
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
          ⏩
          </button>
        </div>
       
        
      </div>
      <div>

      <hr
      class="my-0.3 h-0.5 border-t-0 bg-black opacity-100 dark:opacity-50" />
      </div>
      <div className="flex justify-between items-start py-2">
      
        <div className="font-mono text-xl">Liste des plans d'affaires</div>
        <div className='flex items-center'>  </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-5 h-5 bg-green-400 rounded-full"></div>
          <div className="flex items-center justify-center w-5 h-5 bg-yellow-400 rounded-full"></div>
          <div className="flex items-center justify-center w-5 h-5 bg-red-400 rounded-full"></div>
          <div className="flex items-center space-x-1 px-2 py-1 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
            ✴️
          </div>
          <div className="flex items-center space-x-1 px-2 py-1 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
            <RiEraserLine />
          </div>
          <div className="flex items-center space-x-1 px-2 py-1 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
            <RiRefreshLine />
          </div>
          <div className="flex items-center space-x-1 px-2 py-1 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
            <RiFilterLine />
            <span className="ml-1">Filtrer</span>
          </div>
        </div>
      </div>

      {/* ligne suivante */}

      <div className="flex justify-between py-1 font-mono text-sm">
  <div className="flex space-x-1">
    <div className="flex flex-col">
      <label htmlFor="numAffaire" className="mb-1">N° Affaire</label>
      <input id="numAffaire" type="text" className="px-2 py-1 border border-gray-300 rounded-md" />
    </div>
    <div className="flex flex-col">
      <label htmlFor="libelleAffaire" className="mb-1">Libellé Affaire</label>
      <input id="libelleAffaire" type="text" className="px-2 py-1 border border-gray-300 rounded-md" />
    </div>
    <div className="flex flex-col">
      <label htmlFor="numOffre" className="mb-1">N° Offre</label>
      <input id="numOffre" type="text" className="px-2 py-1 border border-gray-300 rounded-md" />
    </div>
    <div className="flex flex-col">
      <label htmlFor="numCB" className="mb-1">N° CB</label>
      <select id="numCB" className="px-2 py-1 border border-gray-300 rounded-md">
        <option>Choisir</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </div>
    <div className="flex flex-col">
      <label htmlFor="affaires" className="mb-1">Affaires</label>
      <select id="affaires" className="px-2 py-1 border border-gray-300 rounded-md">
        <option>Choisir</option>
        <option>Qui me concernent</option>
        <option>Dont je suis chargé d'affaire</option>
        <option>Où mon CB intervient</option>
        <option>Que mon CB gère</option>
      </select>
    </div>
    <div className="flex flex-col">
      <label htmlFor="typeAffaire" className="mb-1">Type d'affaire</label>
      <select id="typeAffaire" className="px-2 py-1 border border-gray-300 rounded-md">
        <option>Choisir</option>
        <option>Type 1</option>
        <option>Type 2</option>
        <option>Type 3</option>
      </select>
    </div>
  </div>
</div>
{/* autre ligne */}
      
      <div className='flex justiy-between py-2 font-mono text-sm '>
        <div className="flex space-x-2">
            <div className="flex flex-col">
              <label htmlFor="numPlanAffaire">N° Plan Affaire</label>
              <input id="numPlanAffaire" type="text" className="px-2 py-1 border border-gray-300 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="libComplementaire">Lib Complémentaire</label>
              <input id="libComplementaire" type="text" className="px-2 py-1 border border-gray-300 rounded-md"/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="chargeAffaire">Chargé d'Affaire</label>
              <select id="chargeAffaire" className="px-2 py-1 border border-gray-300 rounded-md">
                <option>Choisir</option>
                <option>Chargé 1</option>
                <option>Chargé 2</option>
                <option>Chargé 3</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="implantation">Implantation</label>
              <select id="implantation" className="px-2 py-1 border border-gray-300 rounded-md">
                <option>Choisir</option>
                <option>Implantation 1</option>
                <option>Implantation 2</option>
                <option>Implantation 3</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="client">Client</label>
              <select id="client" className="px-2 py-1 border border-gray-300 rounded-md">
                <option>Choisir</option>
                <option>Client 1</option>
                <option>Client 2</option>
                <option>Client 3</option>
              </select>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="produit">Produit</label>
              <select id="produit" className="px-2 py-1 border border-gray-300 rounded-md">
                <option>Choisir</option>
                <option>Produit 1</option>
              </select>
              </div></div>
            </div>

{/* autre ligne  */}

<div className='flex justiy-between py-2 font-mono text-sm '>
        <div className="flex space-x-2">
            <div className="flex flex-col ">
              <label htmlFor="cp">CP</label>
              <input id="cp" type="text" className="px-2 py-1 border border-gray-300 rounded-md" />
            </div>
            
            <div className="flex flex-col ">
              <label htmlFor="ville">Ville</label>
              <select id="ville" className="px-2 py-1 border border-gray-300 rounded-md">
                <option>Choisir</option>
                <option>Ville1</option>
                <option>Ville2</option>
                <option>Ville3</option>
              </select>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="numProvisoire">N° Provisoire</label>
              <input id="cp" type="text" className="px-2 py-1 border border-gray-300 rounded-md"/>
            </div>
            
            </div>


            
            </div>


    {/* tableau */}

    <div>

    <table  className=" mt-1 p-1 rounded-lg table-auto border-collapse">
    <caption class="caption-top">
    Tableau récapitulatif.
  </caption>
  <thead>
    <tr className=" mt-1 p-1 rounded-lg table-auto text-xs " >
      <th className='border border-black'>...</th>
      <th className='border border-black'>N° Affaire</th>
      <th className='border border-black'>N° Plan</th>
      <th className='border border-black'>Type</th>
      <th className='border border-black'>Tut..</th>
      <th className='border border-black'>...</th>
      <th className='border border-black'>Rapport</th>
      <th className='border border-black'>RFCT</th>
      <th className='border border-black'>Délai</th>
      <th className='border border-black'>Visites</th>
      <th className='border border-black'>Docs</th>
      <th className='border border-black'>Libellé Affaire</th>
      <th className='border border-black'>Libellé Plan</th>
      <th className='border border-black'>Ville</th>
      <th className='border border-black'> Nom CA</th>
      <th className='border border-black'>Client</th>
      <th className='border border-black'>Destination</th>
      <th className='border border-black'>CB</th>
      <th className='border border-black'>Risque</th>
      <th className='border border-black'></th>
      <th className='border border-black'>Montant tvx</th>
      <th className='border border-black'></th>
      <th className='border border-black'>Contrat du </th>
      <th className='border border-black'>N° Offre</th>
      <th className='border border-black'>Produit</th>
      <th className='border border-black'>LAT</th>
      <th className='border border-black'>Armoire</th>
      <th className='border border-black'>Maestro</th>
      <th className='border border-black'>N°Provisoire</th>    
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    
  </tbody>
</table>



    </div>

    

    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className='bg-orange-400 text-blue-800 underline decoration-black text-3xl '>
              Assistant de création d'un nouveau "Plan d'Affaire"
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Contenu du modal
          <div className="flex flex-col ">
              <label htmlFor="new-plan-affaire">Création d'un nouveau plan d'affaire</label>
              <select id="new-plan-affaire" className="px-2 py-1 border border-gray-300 rounded-md">
                <option>Nouvelle Affaire et son premier Plan d'Affaire (*1)</option>
                <option>Plan d'Affaire supplémentaire dans l'Affaire Courante'(*2)</option>
              
              </select>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
          <Button variant="primary">
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>

      </div>
        


      
    
  );
}

function Slide1({ onSave }) {
  // Ajoute les champs de formulaire pour le premier slide ici

  return (
    <div>
      // Ajoute les champs de formulaire pour le premier slide ici
      <button onClick={onSave}>Enregistrer</button>
    </div>
  );
}

export default Affaires;
