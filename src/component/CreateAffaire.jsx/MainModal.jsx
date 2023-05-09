import React from 'react'
import Etape1 from './Etape1'
import Etape3 from './Etape3'
import Etape4 from './Etape4'
import Etape5 from './Etape5'
import Etape8 from './Etape8'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Component } from 'react'
import axios from 'axios'

class MainModal extends Component{

    constructor(){

        super();
        this.state = {
            index : 0,
            states : this.stages[0],
            dataFormAffaire : {
                "libelle_affaire": "",
                "statut_affaire": null,
                "numero_offre": "",
                "numero_contrat": "",
                "numero_contrat_provisoire": "",
                "libelle_contrat": "",
                "date_contrat": null,
                "client": null,
                "numero_service_en_charge": null,
                "marques": null
            },
            dataFormPlanAffaire : {
                "libelle_plan_affaire": "",
                "numero_plan": null,
                "risque": "",
                "devise": null,
                "debut_chantier": null,
                "fin_chantier": null,
                "visite_reunions": "",
                "cplt_geo": "",
                "numero_voie": "",
                "lieu_dit": "",
                "compte_postal": "",
                "ville": "",
                "pays": "",
                "type_affaire": "",
                "montant_des_travaux": null,
                "type_montant": null,
                "debut_prestation_bv": null,
                "nb": "",
                "numero_affaire": null,
                "charge_de_affaire": null,
                "destination": null,
                "produit": null
            }
        };
        
    }

    modifyAffaireField = (field, value)=>{
        this.setState(state=>{
            state.dataFormAffaire[field] = value;
            return state;
        })
    }

    modifyPlanField = (field, value)=>{
        this.setState(state=>{
            state.dataFormPlanAffaire[field] = value;
            return state;
        })
    }

    getDataForm = ()=>{
        return {...this.state.dataFormAffaire, ...this.state.dataFormPlanAffaire};
    }

    stages = [
        <Etape1/>,
        <Etape3 modifyField={this.modifyAffaireField}/>,
        <Etape4 dataFormAffaire={this.getDataForm} modifyField={this.modifyPlanField}/>,
        <Etape5 dataFormAffaire={this.getDataForm} modifyField={this.modifyPlanField}/>,
        <Etape8/>,
    ];

    componentDidUpdate(prevProps, prevStates){
        // if(prevStates.index === 1 && this.state.index === 2)
        // {
        //     console.log("Make query");
        //     let csrfvalue;

        //     document.cookie.split(';').forEach(item=>{
        //         if(item.includes('csrftoken')){
        //             csrfvalue = item.split('=')[1];
        //         }
        //     })
                                            
        //     axios.post("http://localhost:8000/api/admin/ficheaffaire/", this.state.dataFormAffaire,
        //         {withCredentials : true, headers : {'X-CSRFToken' : csrfvalue}}).then(response=>{
        //             console.log(response);
        //         })
        // }
    }

    render(){
        return (
            <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto h-full flex justify-center items-center bg-[#000a]">
                <div className="relative w-full max-w-4xl max-h-full">
                    <div className="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700">
                        <div className='flex justify-between items-center pr-6'>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white p-6">
                                Assistant de création d'un nouveau "Plan d'Affaire "
                            </h3>
                            <span className='text-xl cursor-pointer' onClick={()=>{
                                this.props.handleClose()
                            }}><FontAwesomeIcon icon={faXmark}/></span>
                        </div>
                        <div className="px-6 space-y-6">
                            { this.state.states }
                        </div>
                        <div className="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <span>
                                {this.state.index + 1} / {this.stages.length}
                            </span>
    
                            <div className='flex items-center justify-between gap-4'>
                                <div>
                                    {this.state.index > 0
                                    &&
                                    <button onClick={()=>{
                                        this.setState(state=>{
                                            let index = state.index - 1;
                                            return {
                                                index : index,
                                                states : this.stages[index]
                                            }
                                        })
                                    }} className='border border-gray-400 shadow-lg text-sm bg-white px-3 py-1'>Precedent</button>}
                                    {this.state.index < this.stages.length
                                    &&
                                    <button onClick={()=>{
                                        this.setState(state=>{
                                            let index = state.index + 1;
                                            return {
                                                index : index,
                                                states : this.stages[index]
                                            }
                                        });
                                    }} className='border border-gray-400 shadow-lg text-sm bg-white px-3 py-1'>Suivant</button>}
                                </div>
    
                                <div>
                                    <button className='border border-gray-400 shadow-lg text-sm bg-white px-3 py-1' onClick={()=>{
                                        this.props.handleClose()
                                    }}>Annuler</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default MainModal