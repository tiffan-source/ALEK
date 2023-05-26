import React, { Component } from 'react';
import LabelInput from '../../../../../../component/utils/LabelInput/LabelInput';
import Button from '../../../../../../component/utils/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateDocument from '../../../../../../component/CreateDocument/CreateDocument';
import axios from 'axios';
import Table from '../../../../../../component/utils/Table/Table';
import getOneConstructeur from '../../../../../../apiService/constructeur';
import CreateExamen from '../../../../../../component/CreateExamen/CreateExamen';
import getOneOuvrage from '../../../../../../apiService/ouvrage';
import getOneAffaire from '../../../../../../apiService/affaire';
import LabelSelect from '../../../../../../component/utils/LabelSelect/LabelSelect';

class Recu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDocument: false,
      newExamen : false,
      allDoc : [],
      data_for_table : [],
      filter_data : {
        emetteur : "",
        ouvrage : "",
        dossier : "",
        nature : "",
        numero_aleatek : "",
        titre : "",
        numero_externe : "",
        indice : "",
        date_indice : "",
        date_reception : ""
      },
      emetteurs : [],
      ouvrages : [],
    };
  }

  handleNewDocument = () => {
    this.setState({ newDocument: true });
  }

  handleCancel = () => {
    window.location.reload()
  }

  handleNewExamen = () => {
    this.setState(state=>{return {newExamen: !state.newExamen }});
  }

  componentDidMount(){
    let id = localStorage.getItem("planAffaire");

    if(id){
      axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/plan/affaire/' + id).then(resDataPlan=>{
        let id_affaire = resDataPlan.data.affaire;

        /**
         * Cette maniere de faire est tre couteuse...
         * Il faudrait recuperer tous les documents on fonction de l'affaire cote serveur
         */
        axios.get(process.env.REACT_APP_STARTURIBACK + "/admin/document/").then(async res=>{
  
          this.setState({allDoc : res.data.results});
  
          axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/entreprise/registration/').then(res=>{
            this.setState({emetteurs : res.data.results});
          })
  
          axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/ouvrages/').then(res=>{
            this.setState({ouvrages : res.data.results});
          })
          
          let data_for_table = await Promise.all(res.data.results.filter(data=>data.numero_aleatek===id_affaire).map(async data => {          
            let emetteur = await getOneConstructeur(data["emetteur"]);
            let ouvrage = await getOneOuvrage(data["ouvrage"]);
            let affaire = await getOneAffaire(data["numero_aleatek"]);
            
            return {
              "id" : data["id"],
              "Emetteur": emetteur.raison_social,
              "N externe": data["numero_externe"],
              "Indice": data["indice"],
              "Titre": data["titre"],
              "Ouvrage": ouvrage.libelle,
              "Nature": data["nature"],
              "N Affaire": affaire.numero_affaire,
              "Date reception": data["date_de_reception"],
              "Dossier": data["dossier"],
              "Examen": data["exam"],
            };
          }));
  
          this.setState({data_for_table : data_for_table});
  
        });

      }).catch(err=>localStorage.removeItem("planAffaire"));


    }
  }

  render() {
    const { newDocument, newExamen } = this.state;

    let component = this.state.data_for_table.length !== 0 && <Table datas={this.state.data_for_table} 
        actionOnLine={(id)=>{
          
          this.props.selectDocument(id);
        }}
      />

    if(newDocument){
      component = <CreateDocument annuler={this.handleCancel} />
    }else if(newExamen){
      component = <CreateExamen document={this.props.document} annuler={this.handleCancel}/>
    }

    return (
      <div>
        <div className='bg-gray-400 border-4 border-green-400 text-white text-sm flex flex-wrap'>

          <div className='flex flex-wrap'>
            <LabelInput readOnly col label="Dossier" value={this.state.filter_data.dossier}/>
            <LabelInput readOnly col label="Nature" value={this.state.filter_data.nature}/>
            <LabelInput readOnly col label="Numero Aleatek" value={this.state.filter_data.numero_aleatek}/>
            <LabelInput readOnly col label="Titre" value={this.state.filter_data.titre}/>
            <LabelInput readOnly col label="N externe" value={this.state.filter_data.numero_externe}/>
            <LabelInput readOnly col label="Indice" value={this.state.filter_data.indice}/>
            <LabelInput readOnly col label="Date Indice" value={this.state.filter_data.date_indice}/>
            <LabelInput readOnly col label="Date Reception" value={this.state.filter_data.date_reception}/>
          </div>

          <div className='flex gap-8'>
            <LabelSelect readOnly col label="Emetteur" value={this.state.filter_data.emetteur} options={
              this.state.emetteurs.reduce((prev, curr)=>{
                let key = curr.raison_social;
                prev[key] = curr.id;
                return prev
              }, {})
            }/>
            <LabelSelect readOnly col label="Ouvrage" value={this.state.filter_data.ouvrage} options={
              this.state.ouvrages.reduce((prev, curr)=>{
                let key = curr.libelle;
                prev[key] = curr.id;
                return prev
              }, {})
            }/>
          </div>

        </div>
        <div className='m-2 flex justify-between'>
          <div>
            <Button action={this.handleNewDocument}><FontAwesomeIcon icon={faPlus} /> Nouveau Document</Button>
            <Button action={this.handleNewExamen}><FontAwesomeIcon icon={faPlus} />Nouvelle Examen</Button>
          </div>
          <div>
            <Button>Filtrer</Button>
            <Button>Reset</Button>
          </div>
        </div>

        {component}
      </div>
    );
  }
}

export default Recu;
