import React, { Component } from 'react'
import oilPump from '../../../assets/icon/oil-pump.png';
import MainModal from '../../../component/CreateAffaire.jsx/MainModal';
import LabelInput from '../../../component/utils/LabelInput/LabelInput';
import Button from '../../../component/utils/Button/Button';
// import LabelRadio from '../../../component/utils/LabelRadio/LabelRadio';
import Table from '../../../component/utils/Table/Table';
import axios from 'axios';
import getOneClient from '../../../apiService/client';
import getOneService from '../../../apiService/service';
import getOneProduct from '../../../apiService/produit';
import getOneDestination from '../../../apiService/destination';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPlanAffaire } from '../../../planAffaireSlice';
import LabelSelect from '../../../component/utils/LabelSelect/LabelSelect';

function mapStateToProps(state) {
  const {planAffaire} = state
  return {
    affaireSelect : planAffaire.planAffaire
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setPlanAffaire: (id_plan)=>dispatch(setPlanAffaire(id_plan)),
    },
    dispatch
  );
}

class Affaires extends Component {

  constructor(){
    super();
    this.state = {
      showModal : false,
      ImmuplanAffaires : [],
      planAffaires : [],
      collaborateurs : [],
      clients : [],
      destinations : [],
      services : [],
      filter : {
        numero : "",
        libelle : "",
        ville : "",
        type : "",
        client : "",
        destination : "",
        service : ""
      },
      defaultLine: null
    }
  }

  filterPlanAffaire = ()=>{
    let dataFinal = this.state.ImmuplanAffaires.filter(dataPlan=>{
      if(this.state.filter.numero){
        if(!dataPlan["N Affaire"].includes(this.state.filter.numero))
          return false;
      }
      if(this.state.filter.libelle){
        if(!dataPlan["Libelle Affaire"].includes(this.state.filter.libelle))
          return false;
      }
      if(this.state.filter.ville){
        if(!dataPlan["Ville"].includes(this.state.filter.ville))
          return false;
      }
      if(this.state.filter.type){
        if(!dataPlan["Type"].includes(this.state.filter.type))
          return false;
      }
      if(this.state.filter.client){
        if(!dataPlan["Client"].includes(this.state.filter.client))
          return false;
      }
      if(this.state.filter.destination){
        if(!dataPlan["Destination"].includes(this.state.filter.destination))
          return false;
      }
      if(this.state.filter.service){
        if(!dataPlan["Service"].includes(this.state.filter.service))
          return false;
      }
      return true;
    });

    this.setState({planAffaires : dataFinal});
  }

  resetfilterAffaire = () =>{
    window.location.reload();
  }

  componentDidMount(){
    axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/planaffairefilter').then(async res=>{
      let data_for_table = await Promise.all(res.data.results.map(async data => {
        let client = await getOneClient(data["affaires"]["client"]);
        let service = await getOneService(data["affaires"]["numero_service_en_charge"]);
        let produit = await getOneProduct(data["produit"]);
        let destination = await getOneDestination(data["destination"])
      
        return {
          "id" : data["id"],
          "N Affaire": data["affaires"]["numero_affaire"],
          "Plan": data["numero_plan"],
          "Type": data["type_affaire"],
          "Visites": data["visite_reunions"],
          "Docs": data["nb"],
          "Libelle Affaire": data["affaires"]["libelle_affaire"],
          "Libelle Plan": data["libelle_plan_affaire"],
          "Ville": data["ville"],
          "Client": client.first_name + " " + client.last_name ,
          "Destination": destination.nom,
          "Service": service.code_services,
          "Risque": data["risque"],
          "Montant tvx": data["montant_des_travaux"],
          "": data["devise"],
          "Contrat du": data["affaires"]["date_contrat"],
          "N Offre": data["affaires"]["numero_offre"],
          "Produit": produit.name,
        };
      }));
      this.setState({planAffaires : data_for_table, ImmuplanAffaires : data_for_table});
    });

    axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/collaborateurs',
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.setState({collaborateurs : data});
    });

    axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/client/',
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.setState({clients : data});
    });

    axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/ouvrage/destinations',
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.setState({destinations : data});
    });

    axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/services/',
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.setState({services : data});
    });
  }

  render(){
    return (
      <>
        <div>
        {this.state.showModal && <MainModal handleClose={()=>{this.setState({showModal : false})}}/>}
        </div>
        <div className='w-full h-full'>
          <h1 className='border-t border-gray-400 p-1 bg-green-200 font-bold'>ALEATEK</h1>
          <nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
            <h2 className='text-blue-800 flex items-center'>
              <img src={oilPump} alt="OilPump" className='w-[2rem]'/>
              Affaires
            </h2>
          </nav>
  
          <div className='border-r-2 border-gray-500 p-1 font-thin m-1 shadow flex justify-between'>
            <h2>Listes des affaires</h2>
            <div className='flex gap-4'>
              <Button action={this.resetfilterAffaire}>Reset Filter</Button>
              <Button action={this.filterPlanAffaire}>Filtrer</Button>
              <Button action={()=>{this.setState({showModal : true})}}>Creer une affaire</Button>
            </div>
          </div>
  
          <div className='bg-gray-400 border-4 border-green-400 text-white text-sm'>
            <div className='flex'>
              <LabelInput label="N° Affaire" col value={this.state.filter.numero} onChange={(e)=>{
                  this.setState(state=>{
                    return {filter : {...state.filter, numero : e.target.value}}
                  })
              }}/>
              <LabelInput label="Libelle Afaire" col value={this.state.filter.libelle} onChange={(e)=>{
                  this.setState(state=>{
                    return {filter : {...state.filter, libelle : e.target.value}}
                  })
              }}/>
              <LabelInput label="Ville" col value={this.state.filter.ville} onChange={(e)=>{
                  this.setState(state=>{
                    return {filter : {...state.filter, ville : e.target.value}}
                  })
              }}/>

            </div>
            <div className='flex justify-between'>
              <LabelSelect label="Type d'affaire" value={this.state.filter.type} col options={{
                "HT" : "HT",
                "TTC" : "TTC"
              }} onChange={(e)=>{
                  this.setState(state=>{
                    return {filter : {...state.filter, ville : e.target.value}}
                  })
              }}/>

              <LabelSelect label="Client" col value={this.state.filter.client} options={this.state.clients.reduce((prev, curr)=>{
                let key = curr.first_name + " " + curr.last_name;
                prev[key] = curr.first_name + " " + curr.last_name;
                return prev
              }, {})} onChange={(e)=>{
                  this.setState(state=>{
                    return {filter : {...state.filter, client : e.target.value}}
                  })
              }}/>

              <LabelSelect label="Destination" col value={this.state.filter.destination} options={this.state.destinations.reduce((prev, curr)=>{
                let key = curr.nom;
                prev[key] = curr.nom;
                return prev
              }, {})} onChange={(e)=>{
                  this.setState(state=>{
                    return {filter : {...state.filter, destination : e.target.value}}
                  })
              }}/>

              <LabelSelect label="N° SERVICE" col value={this.state.filter.service} options={this.state.services.reduce((prev, curr)=>{
                let key = curr.code_services;
                prev[key] = curr.code_services;
                return prev
              }, {})} onChange={(e)=>{
                  this.setState(state=>{
                    return {filter : {...state.filter, service : e.target.value}}
                  })
              }}/>
            </div>
          </div>
          <div className='text-sm mt-6'>
            {this.state.planAffaires.length !== 0 && <Table datas={[...this.state.planAffaires]} actionOnLine={(id)=>{
              this.props.setPlanAffaire(id);
              localStorage.setItem("planAffaire", id)
            }}/>}
          </div>
        </div>
      </>
    )
  }
}

Affaires = connect(mapStateToProps, mapDispatchToProps)(Affaires)

export default Affaires