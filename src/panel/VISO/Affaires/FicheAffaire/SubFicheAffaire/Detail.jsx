import React, { Component } from 'react'
import LabelInput from '../../../../../component/utils/LabelInput/LabelInput';
import LabelSelect from '../../../../../component/utils/LabelSelect/LabelSelect';
import LabelTextArea from '../../../../../component/utils/LabelTextArea/LabelTextArea';
import axios from 'axios';

class Detail extends Component {
    constructor(){
        super()
        this.state = {
            planAffaire : {},
            destinations : {},
        }
    }

    componentDidMount(){
        let id = localStorage.getItem("planAffaire");
        if(id){
            axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/planaffairefilter/' + id).then(res=>{
                this.setState({planAffaire : res.data});
            }).catch(err=>localStorage.removeItem("planAffaire"));
        }
    }

    render(){
        const {planAffaire} = this.state;
        return (
            <>
                <div className='border border-black m-1'>
                    <div className='flex flex-wrap'>
                        <LabelInput label="N Plan Affaire" value={planAffaire.numero_plan}/>
                        <LabelInput label="Libelle Plan Affaire" value={planAffaire.libelle_plan_affaire}/>
                        <LabelInput label="Risque" value={planAffaire.risque}/>
                    </div>
                </div>
                <div className='m-1 border border-gray-600 p-1'>
                    <div className='flex gap-8 m-1'>
                        <LabelSelect label="Destination" options={{
                            data1 : "data1"
                        }}/>
                        <LabelSelect label="Type d'affaire" options={{
                            data1 : "data1"
                        }}/>
                    </div>
                    <LabelInput label="Charge affaire"/>
        
                    <div className='flex justify-between my-1'>
                        <div className='flex items-center'>
                            <LabelInput label="Montant des travaux"/>
                            <LabelSelect options={{
                                data1 : "data1"
                            }}/>
                            <LabelSelect options={{
                                data1 : "data1"
                            }}/>
                        </div>
                    </div>
        
                    <div className='my-1'>
                        <LabelTextArea label="Reference client"/>
                    </div>
                </div>
        
                <div className='m-1 grid grid-cols-3 gap-2'>
                    <div className='border border-gray-600 col-span-1 p-1'>
                        <LabelInput type="date" label="Date début Prestation BV"/>
                        <LabelInput type="date" label="Date de début du chantier"/>                    
                        <LabelInput label="Duree" span_info="Mois" type="number"/>

                        <LabelInput type="date" label="Date de fin"/>
                        <LabelInput type="number" label="Nb document a examiner"/>
                    </div>

                    <div className='border border-gray-600 col-span-2 p-1'>
                        <LabelTextArea label="Points de vigilence et risque associee"/>
                        <div className='my-1 flex'>
                            <LabelSelect label="Risque" options={{
                                option1 : "option1"
                            }}/>
                            <div className='flex items-center'>
                                <span>Nb prevus:</span>
                                <div className='flex items-center'>
                                    <LabelInput label="Visite/Reunion" type="number"/>
                                    <LabelInput label="Rapport Initiaux" type="number"/>
                                    <LabelInput label="Syntheses" type="number"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
{/* 
                <div>
                    <ul>
                        <li>Suivi administratif</li>
                        <li>Adresse du chantier</li>
                        <li>Details du contrat Aleatek</li>
                    </ul>

                    <div>
                        <div>
                            <div>
                                <label htmlFor="" className='inline-block w-[12rem]'>Assistante</label>
                                <input type="text" className='shadow-inner border' />
                                <button>Tutorat</button>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="" className='inline-block w-[12rem]'>Chef de projet</label>
                                <input type="text" className='shadow-inner border' />
                                <button>Parametrage site maestro</button>
                            </div>
                        </div>
                        <div>
                            <span>Informations a imprimer sur les documents clients:</span>
                            <div>
                                <div>
                                    <label htmlFor="" className='inline-block w-[12rem]'>Chef de projet</label>
                                    <input type="text" className='shadow-inner border' />
                                </div>

                                <div>
                                    <label htmlFor="" className='inline-block w-[12rem]'>Francais</label>
                                    <select name="" id="">
                                        <option value="">Francais</option>
                                        <option value="">Anglais</option>
                                    </select>
                                </div>
                            </div>
                            
                        </div>
                        <div></div>
                    </div>
                </div> */}
            </>
        )
    }
  
}

export default Detail