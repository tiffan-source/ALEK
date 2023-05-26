import axios from 'axios';
import React, { Component} from 'react'
import LabelInput from '../../utils/LabelInput/LabelInput';
import LabelSelect from '../../utils/LabelSelect/LabelSelect';

class Etape3 extends Component {

  constructor(){
    super();
    this.state = {
      client : [],
      service : [],
      marque : []
    }
  }

  componentDidMount(){

    this.props.modifyField("statut_affaire", "Encours");

    axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/client/',
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.props.modifyField("client", data[0].id)
      this.setState({client : data});
    });

    axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/services/',
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.props.modifyField("numero_service_en_charge", data[0].id)
      this.setState({service : data});
    });

    axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/marque/',
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.props.modifyField("marques", data[0].id)
      this.setState({marque : data});
    });
  }

  render(){
    return (
      <div>
        <div className='border border-gray-400 p-2 mb-2'>

          <LabelInput label="N° Contrat ALEATEK" disabled/>

          <LabelInput label="N° Affaire ALEATEK" onChange={(e)=>{
              this.props.modifyField("numero_affaire", e.target.value);
            }}/>

          <LabelInput label="Libele Affaire" onChange={(e)=>{
            this.props.modifyField("libelle_affaire", e.target.value);
          }}/>
  
          <LabelSelect label="Statut Affaire" onChange={(e)=>{
              this.props.modifyField("statut_affaire", e.target.value);
            }} options={{
              "Encours" : "Encours",
              "Acheve" : "Acheve",
              "Abandonne" : "Abandonne"
            }}/>

        </div>
  
        <div className='border border-gray-400 p-2 mb-2'>
          <LabelSelect label="Client" onChange={(e)=>{
              this.props.modifyField("client", e.target.value);
            }} options={
              this.state.client.reduce((prev, curr)=>{
                let key = curr.first_name + " " + curr.last_name;
                prev[key] = curr.id;
                return prev
              }, {})
            }/>
        </div>
  
        <div className='border border-gray-400 p-2 mb-2'>
          <LabelSelect label="Gerer par: Service N" onChange={(e)=>{
              this.props.modifyField("numero_service_en_charge", e.target.value);
            }} options={
              this.state.service.reduce((prev, curr)=>{
                let key = curr.code_services;
                prev[key] = curr.id;
                return prev
              }, {})
            }/>
        </div>
  
        <div className='border border-gray-400 p-2 mb-2'>
          <LabelSelect label="Marque" onChange={(e)=>{
            this.props.modifyField("marques", e.target.value);
          }} options={
            this.state.marque.reduce((prev, curr)=>{
              let key = curr.name;
              prev[key] = curr.id;
              return prev
            }, {})
          }/>
        </div>
  
        <div  className='border border-gray-400 p-2 mb-2'>
            <LabelInput label="N°Offre"  onChange={(e)=>{
              this.props.modifyField("numero_offre", e.target.value);
            }}/>

            <LabelInput label="Date du contrat" onChange={(e)=>{
              this.props.modifyField("date_contrat", e.target.value);
            }} type="date"/>
        </div>
      </div>
    )
  }
}

export default Etape3