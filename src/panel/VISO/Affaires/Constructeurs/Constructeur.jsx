import React from 'react'
import worker from '../../../../assets/icon/worker.png'
import Button from '../../../../component/utils/Button/Button';
import Table from '../../../../component/utils/Table/Table';
import LabelInput from '../../../../component/utils/LabelInput/LabelInput';
import LabelSelect from '../../../../component/utils/LabelSelect/LabelSelect';
import LabelCheckbox from '../../../../component/utils/LabelCheckbox/LabelCheckbox';

function Constructeur() {
  return (
    <div>
        <div className='w-full h-full text-sm min-h-screen flex flex-col'>
            <h1 className='border-t border-gray-400 p-1 MissionPrestationbg-green-200 font-bold'>Aleatek</h1>

            <nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
                <h2 className='text-blue-800 flex items-center '>
                    <img src={worker} alt="OilPump" className='w-[2rem] mr-2'/>
                    Constructeurs
                </h2>
            </nav>

            <div className='flex-grow grid grid-cols-4 gap-4'>
                <div className='text-sm col-span-1 p-2 shadow-2xl border border-gray-600 m-1'>
                    <h2 className='text-center font-bold'>Liens avec le Carnet d'adresse</h2>
                    <div className='my-4'>
                        <Button>Copier Depuis</Button>
                        <Button>Copier Vers</Button>
                    </div>
                    <Table datas={[
                        {"Raison Social" : 'Raison Social#1', "Mel" : <input type='checkbox'/>, "Fax" : <input type='checkbox'/>, "Co.." : <input type='checkbox'/>},
                        {"Raison Social" : 'Raison Social#1', "Mel" : <input type='checkbox'/>, "Fax" : <input type='checkbox'/>, "Co.." : <input type='checkbox'/>},
                        {"Raison Social" : 'Raison Social#1', "Mel" : <input type='checkbox'/>, "Fax" : <input type='checkbox'/>, "Co.." : <input type='checkbox'/>},
                    ]}/>
                </div>
                <div className='col-span-3'>
                    <LabelInput label="Raison sociale"/>
                    <LabelInput label="N RCS / SIRET"/>
                    <LabelSelect label="Activite" options={{
                        "Activite" : "Activite#1"
                    }}/>
                    <LabelInput label="Code chantier de l'entreprise (donne par les amoires a plan)"/>
                    <div className='flex gap-16 my-6 py-4 border-t border-b border-gray-600'>
                        <span>Medias de diffusion par defaut pour ce constructeurs</span>
                        <div className='flex gap-8'>
                            <LabelCheckbox col label="Mel"/>
                            <LabelCheckbox col label="Fax"/>
                            <LabelCheckbox col label="Courier"/>
                        </div>
                    </div>

                    <div>
                        <span>Adresse du Chantier</span>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='border border-gray-600 p-1'>
                            <LabelInput label="Cplt Geo"/>
                            <LabelInput label="N et voie"/>
                            <LabelInput label="Lieu dit"/>
                            <LabelInput label="CP/VIlle"/>
                            <LabelInput label="Departement" />
                            <LabelInput label="Province"/>
                            <LabelInput label="Pays"/>
                            </div>
                            
                            <div className='flex flex-col justify-between border border-gray-600 p-1'>
                                <LabelCheckbox label="Utiliser l'adresse postal pour l'envoi des courriers"/>

                                <div>
                                    <LabelInput label="Boite Postal" col/>
                    
                                    <div className='flex justify-between'>
                                    <LabelInput label="CP" type="number" col/>
                                    <LabelInput label="Bureau distributeur" col/>
                                    <LabelInput label="Cedex" type="number" col/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-6'>
                        <h2 className='text-sm font-bold text-center'>Liste des moyens de communication(tel, fax, mail)</h2>
                        <Table datas={[
                            {"Media" : "Media#1", "Identification (N...)" : "Indentification#1", "Complements (poste, note, ...)" : "Complement#1"}
                        ]}/> 
                    </div>
                                
                </div>
            </div>
        </div>
    </div>
  )
}

export default Constructeur