import React from 'react'
import Etape1 from './Etape/Etape1'
import Etape3 from './Etape/Etape3'
import Etape4 from './Etape/Etape4'
import Etape5 from './Etape/Etape5'
import Etape8 from './Etape/Etape8'
import Etape7 from './Etape/Etape7'
import Etape6 from './Etape/Etape6'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Component } from 'react'
import axios from 'axios'
import Button from '../utils/Button/Button'

class MainModal extends Component{

    constructor(){

        super();
        this.state = {
            index : 0,
            states : this.stages[0],
            dataFormAffaire : {
                "numero_affaire": "",
                "libelle_affaire": "",
                "statut_affaire": null,
                "numero_offre": "",
                "numero_contrat": "",
                "numero_contrat_provisoire": "",
                "libelle_contrat": "",
                "date_contrat": null,
                "client": null,
                "numero_service_en_charge": null,
                "charge_de_affaire": null,
                "assistant": null,
                "chef_projet": null,
                "marques": null,
                "intervenant" : []
            },
            dataFormPlanAffaire : {
                "libelle_plan_affaire": "",
                "numero_plan": null,
                "risque": null,
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
                "departement": "",
                "province": "",
                "type_affaire": null,
                "montant_des_travaux": null,
                "type_montant": null,
                "debut_prestation_bv": null,
                "nb": "",
                "affaire": null,
                "produit": null,
                "destination": [],
                "intervention_technique": [],
                "missions": [],
                "constructeurs": [],
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

    createAffaireAndPlan = ()=>{
        let intervenant = [
            this.state.dataFormAffaire.assistant,
            this.state.dataFormAffaire.charge_de_affaire,
            this.state.dataFormAffaire.chef_projet,
        ];

        intervenant = [...new Set(intervenant)];

        axios.post("http://127.0.0.1:8000/api/admin/ficheaffaire/",
        {...this.state.dataFormAffaire, intervenant : intervenant},
        {withCredentials : true}).then(res=>{
            axios.post("http://127.0.0.1:8000/api/admin/plan/affaire/",
            {...this.state.dataFormPlanAffaire, affaire : res.data.id},
            {withCredentials : true}).then(res=>{
                window.location.reload();
            });
        });
    }

    getDataForm = ()=>{
        return {...this.state.dataFormAffaire, ...this.state.dataFormPlanAffaire};
    }

    stages = [
        <Etape1/>,
        <Etape3 modifyField={this.modifyAffaireField}/>,
        <Etape4 dataFormAffaire={this.getDataForm} modifyField={this.modifyPlanField}/>,
        <Etape5 dataFormAffaire={this.getDataForm} modifyField={this.modifyAffaireField}/>,
        <Etape6 dataFormAffaire={this.getDataForm} modifyField={this.modifyPlanField}/>,
        <Etape7 dataFormAffaire={this.getDataForm} modifyField={this.modifyPlanField}/>,
        <Etape8 dataFormAffaire={this.getDataForm} modifyField={this.modifyPlanField} create={this.createAffaireAndPlan}/>,
    ];

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
                                    <Button action={()=>{
                                        this.setState(state=>{
                                            let index = state.index - 1;
                                            return {
                                                index : index,
                                                states : this.stages[index]
                                            }
                                        })
                                    }}>Precedent</Button>}
                                    {this.state.index < this.stages.length - 1
                                    &&
                                    <Button action={()=>{
                                        this.setState(state=>{
                                            let index = state.index + 1;
                                            return {
                                                index : index,
                                                states : this.stages[index]
                                            }
                                        });
                                    }}>Suivant</Button>}
                                </div>
    
                                <div>
                                    <Button action={()=>{
                                        this.props.handleClose()
                                    }}>Annuler</Button>
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