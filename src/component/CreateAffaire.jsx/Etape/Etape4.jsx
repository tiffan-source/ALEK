import React, { Component } from 'react'
import moment from 'moment';
import axios from 'axios';
import LabelInput from '../../utils/LabelInput/LabelInput';
import LabelSelect from '../../utils/LabelSelect/LabelSelect';
import LabelCheckbox from '../../utils/LabelCheckbox/LabelCheckbox';
import Adresse from '../../Adresse/Adresse';

class Etape4 extends Component{

  constructor(){
    super();
    this.state = {
      duree : 0,
      startChantier : "",
      endChantier : "",
      destinations : [],
    }
  }

  async componentDidMount(){
    this.props.modifyField("devise", "€");
    this.props.modifyField("numero", "1");
    this.props.modifyField("type_montant", "HT");
    this.props.modifyField("type", "CTC");
    this.props.modifyField("risque", "Normal");
    try {
      let batiment = await axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/batiment/');

      this.props.setBatiment(this.props.batiment || batiment.data.results[0].id)
      this.setState({destinations : batiment.data.results});
    } catch (error) {
    console.log(error); 
    }
  }

  setDebutChantier = (e) => {
    let debut = new Date(e.target.value);
    debut = moment(debut.toLocaleDateString());
    this.setState({startChantier : debut.format('YYYY-MM-DD')});
    this.props.modifyField("debut_chantier", debut.format('YYYY-MM-DD'));
  }

  setFinChantier = (e) =>{
    let value = parseInt(e.target.value);
    let start = new Date(this.props.dataPlan.debut_chantier);
    start = moment(start.toLocaleDateString())
    
    if(value < 0){
      this.setState({duree: 0, endChantier : start.format('YYYY-MM-DD')});
    }else{
      let end = start;

      end.add(value, "month")
  
      this.setState({duree: value, endChantier : end.format('YYYY-MM-DD')});
      this.props.modifyField("fin_chantier", end.format('YYYY-MM-DD'));

    }
  }

  setDureeChantier = (e) =>{
    let end = new Date(e.target.value);
    end = moment(end.toLocaleDateString());

    let start = moment(this.state.startChantier);

    let duree = Math.ceil(Math.abs(start.diff(end, 'M')));
    this.setState({duree: duree, endChantier : end.format('YYYY-MM-DD')});
    this.props.modifyField("fin_chantier", end.format('YYYY-MM-DD'));
  }

  render(){
    return (
      <>
      <div>
        <div className='flex gap-8'>
          <LabelInput label="N° Affaire" disabled value={this.props.dataAffaire.numero}/>
          <LabelInput label="N° Plan" disabled value={1}/>
        </div>

        <LabelInput label="Libelle Affaire" value={this.props.dataAffaire.libelle} disabled/>

        <LabelInput label="Libele Plan Affaire" value={this.props.dataPlan.libelle} onChange={(e)=>{
          this.props.modifyField("libelle", e.target.value);
        }}/>
      </div>

      <div className='border border-gray-400 p-2 mb-2'>
        <div className='flex items-center justify-between'>
          <LabelInput col label="Montant travaux" value={this.props.dataPlan.prix} onChange={(e)=>{
            this.props.modifyField("prix", e.target.value);
          }}/>

          <LabelSelect col label="Devise" value={this.props.dataPlan.devise} onChange={(e)=>{
            this.props.modifyField("devise", e.target.value);
          }} options={{
            "€" : "€",
            "$" : "$"
          }}/>

          <LabelSelect col label="(HT/TTC)" value={this.props.dataPlan.type_montant} onChange={(e)=>{
            this.props.modifyField("type_montant", e.target.value);
          }} options={{
            "HT" : "HT",
            "TTC" : "TTC"
          }}/>

          <LabelSelect col label="Destination" value={this.props.batiment} onChange={(e)=>{
            this.props.setBatiment(e.target.value)
          }} options={
            this.state.destinations.reduce((prev, curr)=>{
              let key = curr.libelle;
              prev[key] = curr.id;
              return prev
            }, {})
          }/>
        </div>

        <LabelInput label="Date début Prestation" value={this.props.dataPlan.debut_prestation} type="date" onChange={(e)=>{
          this.props.modifyField("debut_prestation", e.target.value);
        }}/>

        <div className='flex justify-between'>
          <LabelInput label_w="24" label="Date de début du chantier" value={this.props.dataPlan.debut_chantier || this.state.startChantier} type="date" onChange={this.setDebutChantier}/>
          <LabelInput label="Duree" type="number" value={this.state.duree} onChange={this.setFinChantier} span_info="Mois"/>
        </div>

        <LabelInput label="Date de fin" type="date" value={this.props.dataPlan.fin_chantier || this.state.endChantier} onChange={this.setDureeChantier}/>

        <div className='flex justify-between'>
          <LabelInput label="Nb document a examiner" value={this.props.dataPlan.doc} type="number" onChange={(e)=>{
            this.props.modifyField("doc", e.target.value);
          }}/>

          <LabelInput label="Nb visites/reunions prevues" value={this.props.dataPlan.visite} type="number" onChange={(e)=>{
            this.props.modifyField("visite", e.target.value);
          }}/>
        </div>

        <div className="flex justify-between">
          <LabelSelect label="Type d'affaire" value={this.props.dataPlan.type} onChange={e=>{
            this.props.modifyField("type", e.target.value);
          }} options={{
            "CTC" : "CTC",
            "VT" : "VT"
          }} />

          <LabelSelect label="Risque" value={this.props.dataPlan.risque} onChange={e=>{
            this.props.modifyField("risque", e.target.value);
          }} options={{
            "Normal": "Normal",
            "Particulier": "Particulier",
            "Complexe": "Complexe"          
          }}/>
        </div>

  
      </div>


      <div>
          <span>Adresse du Chantier</span>
          <div className='grid grid-cols-2 gap-2'>
            <div className='border border-gray-600 p-1'>
              <Adresse adress={this.props.adress} setAdress={this.props.setAdress}/>
            </div>
            
            {/* <div className='flex flex-col justify-between border border-gray-600 p-1'>
              <LabelCheckbox label="Utiliser l'adresse postal pour l'envoi des courriers"/>

              <div>
                <LabelInput label="Boite Postal" col/>
  
                <div className='flex justify-between'>
                  <LabelInput label="CP" type="number" col/>
                  <LabelInput label="Bureau distributeur" col/>
                  <LabelInput label="Cedex" type="number" col/>
                </div>
              </div>
            </div> */}
          </div>
      </div>
      </>
    )
  }
}

export default Etape4