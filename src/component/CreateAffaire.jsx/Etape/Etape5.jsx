import React, { Component } from 'react'
import axios from 'axios';
import LabelInput from '../../utils/LabelInput/LabelInput';
import LabelSelect from '../../utils/LabelSelect/LabelSelect';

class Etape5 extends Component {

  constructor(){
    super();

    this.state = {
      collaborateurs : [],
      medias : [],
      load : true
    }
  }

  componentDidMount(){
    axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/collaborateurs/',
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.props.modifyField("charge", this.props.dataAffaire.charge || data[0].id);
      this.props.modifyField("assistant", this.props.dataAffaire.assistant || data[0].id);
      this.props.modifyField("chef", this.props.dataAffaire.chef || data[0].id);
      this.setState({collaborateurs : data, load: false});
    });
  }

  render(){
    return (
      <div>
        <div className='border border-gray-400 p-2 mb-2'>
  
          <div className='flex gap-6'>
            <LabelInput  label="N° Contrat ALEATEK" value={this.props.dataAffaire.numero_contrat} disabled/>
            <LabelInput label="N Plan" disabled value={1}/>
          </div>

          <LabelInput label="Libelle Affaire" value={this.props.dataAffaire.libelle} disabled/>
          <LabelInput label="Libelle Plan" value={this.props.dataPlan.libelle} disabled/>
 
        </div>
  
        <div className='border border-gray-400 p-2 mb-2'>
          {!this.state.load ? <LabelSelect label="Charge Affaire" onChange={(e)=>{
            this.props.modifyField("charge", e.target.value);
          }}  options={
            this.state.collaborateurs.reduce((prev, curr)=>{
              let key = curr.first_name + " " + curr.last_name;
              prev[key] = curr.id;
              return prev
            }, {})
          } value={this.props.dataAffaire.charge}/>
          : <span className='text-green-600'>Donnees en cours de chargement</span>}
        </div> 
  
        <div className='border border-gray-400 p-2 mb-2'>
          {!this.state.load ? <LabelSelect label="Assistante" onChange={(e)=>{
            this.props.modifyField("assistant", e.target.value);
          }}  options={
            this.state.collaborateurs.reduce((prev, curr)=>{
              let key = curr.first_name + " " + curr.last_name;
              prev[key] = curr.id;
              return prev
            }, {})
          } value={this.props.dataAffaire.assistant}/>
          : <span className='text-green-600'>Donnees en cours de chargement</span>}
        </div> 
  
        <div className='border border-gray-400 p-2 mb-2'>
        {!this.state.load ? <LabelSelect label="Chef de projet" onChange={(e)=>{
            this.props.modifyField("chef", e.target.value);
          }}  options={
            this.state.collaborateurs.reduce((prev, curr)=>{
              let key = curr.first_name + " " + curr.last_name;
              prev[key] = curr.id;
              return prev
            }, {})
          } value={this.props.dataAffaire.chef}/>
          : <span className='text-green-600'>Donnees en cours de chargement</span>}
        </div> 
  
      </div>
    )
  }
  
}

export default Etape5