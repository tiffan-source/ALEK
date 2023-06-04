import React, { Component } from 'react'
import axios from 'axios';
import LabelInput from '../../utils/LabelInput/LabelInput';
import LabelSelect from '../../utils/LabelSelect/LabelSelect';

class Etape5 extends Component {

  constructor(){
    super();

    this.state = {
      collaborateurs : [],
      medias : []
    }
  }

  componentDidMount(){
    axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/collaborateurs',
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.props.modifyField("charge", data[0].id);
      this.props.modifyField("assistant", data[0].id);
      this.props.modifyField("chef", data[0].id);
      this.setState({collaborateurs : data});
    });
  }

  render(){
    return (
      <div>
        <div className='border border-gray-400 p-2 mb-2'>
  
          <div className='flex gap-6'>
            <LabelInput label="N Affaire" disabled value={this.props.dataAffaire.numero}/>
            <LabelInput label="N Plan" disabled value={1}/>
          </div>

          <LabelInput label="Libelle Affaire" value={this.props.dataAffaire.libelle} disabled/>
          <LabelInput label="Libelle Plan" value={this.props.dataPlan.libelle} disabled/>
 
        </div>
  
        <div className='border border-gray-400 p-2 mb-2'>
          <LabelSelect label="Charge Affaire" onChange={(e)=>{
            this.props.modifyField("charge", e.target.value);
          }}  options={
            this.state.collaborateurs.reduce((prev, curr)=>{
              let key = curr.first_name + " " + curr.last_name;
              prev[key] = curr.id;
              return prev
            }, {})
          }/>

        </div>
  
        <div className='border border-gray-400 p-2 mb-2'>
          <LabelSelect label="Assistante" onChange={(e)=>{
            this.props.modifyField("assistant", e.target.value);
          }}  options={
            this.state.collaborateurs.reduce((prev, curr)=>{
              let key = curr.first_name + " " + curr.last_name;
              prev[key] = curr.id;
              return prev
            }, {})
          }/>
        </div>
  
        <div className='border border-gray-400 p-2 mb-2'>
        <LabelSelect label="Chef de projet" onChange={(e)=>{
            this.props.modifyField("chef", e.target.value);
          }}  options={
            this.state.collaborateurs.reduce((prev, curr)=>{
              let key = curr.first_name + " " + curr.last_name;
              prev[key] = curr.id;
              return prev
            }, {})
          }/>
        </div>
  
      </div>
    )
  }
  
}

export default Etape5