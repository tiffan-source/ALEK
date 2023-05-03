import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsLeftRightToLine, faChevronLeft, faFloppyDisk, faMinus, faPlus, faPrint, faRotateLeft, faSquareEnvelope, faPlay, faChevronRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import handshake from '../../../../assets/icon/handshake.png';

const MissionPrestation = () => {
  return (
    <><h1 className='border-t border-gray-400 p-1 bg-green-200 font-bold'>ALEATEK</h1><nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
          <h2 className='text-blue-800 flex items-center'>
              <img src={handshake} alt="handshake" className='w-[2rem]' />
              Missions/Prestations signées
          </h2>
          <div className='flex gap-2'>
              <ul className='flex'>
                  <li>
                      <button className='border border-gray-200 shadow-md bg-white p-[1px]'>
                          <FontAwesomeIcon icon={faPrint} />
                          Impressions
                      </button>
                  </li>
              </ul>
              <ul className='flex'>
                  <li>
                      <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                          <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                  </li>
                  <li>
                      <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                          <FontAwesomeIcon icon={faCaretLeft} />
                      </button>
                  </li>
                  <li>
                      <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                          <FontAwesomeIcon icon={faPlus} />
                      </button>
                  </li>
                  <li>
                      <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                          <FontAwesomeIcon icon={faFloppyDisk} />
                      </button>
                  </li>
                  <li>
                      <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                          <FontAwesomeIcon icon={faRotateLeft} />
                      </button>
                  </li>
                  <li>
                      <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                          <FontAwesomeIcon icon={faSquareEnvelope} />
                      </button>
                  </li>
                  <li>
                      <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                          <FontAwesomeIcon icon={faMinus} />
                      </button>
                  </li>
                  <li>
                      <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                          <FontAwesomeIcon icon={faPlay} />
                      </button>
                  </li>
                  <li>
                      <button className='border border-gray-200 shadow-md bg-white p-[1px] text-gray-600'>
                          <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                  </li>
              </ul>

          </div>
      </nav>
      <Tabs>
      <TabList>
        <Tab>Liste des Missions/Prestations</Tab>
        <Tab>Liste des Prestations Signées</Tab>
      </TabList>
      <div>
        <button className='border border-gray-200 shadow-md bg-white p-[1px]'>Fermer/Réactiver la mission</button> <span></span>
        Liste des Missions signées
      </div>

      <TabPanel>
      <table style={{border: '3px solid black', borderCollapse: 'collapse'}}>
        <thead>
            <tr>
                <th style={{border: '1px solid black'}}>Mission BV</th>
                <th style={{border: '1px solid black'}}>Libellé</th>
                <th style={{border: '1px solid black'}}>Créé le</th>
                <th style={{border: '1px solid black'}}></th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{border: '1px solid black'}}>AV</td>
                    <td style={{border: '1px solid black'}}>Stabilité des avoisinants</td>
                    <td style={{border: '1px solid black'}}>Date de création</td>
                    <td style={{border: '1px solid black'}}></td>
                </tr>
                <tr>
                    <td style={{border: '1px solid black'}}>ENV</td>
                    <td style={{border: '1px solid black'}}>Environnement</td>
                    <td style={{border: '1px solid black'}}>Date de création</td>
                    <td style={{border: '1px solid black'}}></td>
                </tr>
                <tr>
                    <td style={{border: '1px solid black'}}>F</td>
                    <td style={{border: '1px solid black'}}>Fonctionnement  des installations</td>
                    <td style={{border: '1px solid black'}}>Date de création</td>
                    <td style={{border: '1px solid black'}}></td>
                </tr>
                <tr>
                    <td style={{border: '1px solid black'}}>GTB</td>
                    <td style={{border: '1px solid black'}}>Gestion technique du bâtiment</td>
                    <td style={{border: '1px solid black'}}>Date de création</td>
                    <td style={{border: '1px solid black'}}></td>
                </tr>
                <tr>
                    <td style={{border: '1px solid black'}}>HAND</td>
                    <td style={{border: '1px solid black'}}>Accessibilité des constructions pour les personnes handicapées</td>
                    <td style={{border: '1px solid black'}}>Date de création</td>
                    <td style={{border: '1px solid black'}}></td>
                </tr>
                <tr>
                    <td style={{border: '1px solid black'}}>HYSa</td>
                    <td style={{border: '1px solid black'}}>Hygiène et santé dans les bâtiments autres que d'habitation</td>
                    <td style={{border: '1px solid black'}}>Date de création</td>
                    <td style={{border: '1px solid black'}}></td>
                </tr>
                <tr>
                    <td style={{border: '1px solid black'}}>LP</td>
                    <td style={{border: '1px solid black'}}>Solidité des ouvrages et éléments d`équipements dissociables et indissociables</td>
                    <td style={{border: '1px solid black'}}>Date de création</td>
                    <td style={{border: '1px solid black'}}></td>
                </tr> 
                <tr>
                    <td style={{border: '1px solid black'}}>PHa</td>
                    <td style={{border: '1px solid black'}}>Isolation acoustique des bâtiments autre qu'à usage d'habitation</td>
                    <td style={{border: '1px solid black'}}>Date de création</td>
                    <td style={{border: '1px solid black'}}></td>
                </tr>  
                <tr>
                    <td style={{border: '1px solid black'}}>PV</td>
                    <td style={{border: '1px solid black'}}>Récolement des procès-verbaux d'essais de fonctionnement des installations</td>
                    <td style={{border: '1px solid black'}}>Date de création</td>
                    <td style={{border: '1px solid black'}}></td>
                </tr>
                <tr>
                    <td style={{border: '1px solid black'}}>STI</td>
                    <td style={{border: '1px solid black'}}>Sécurité des personnes des bâtiments tertiaires </td>
                    <td style={{border: '1px solid black'}}>Date de création</td>
                    <td style={{border: '1px solid black'}}></td>
                </tr>
            </tbody>
        </table>
      </TabPanel>
      <TabPanel>
        {/* Contenu du deuxième onglet */}
      </TabPanel>
    </Tabs>
    
      
      
      
      
      </>
  )
}

export default MissionPrestation