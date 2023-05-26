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
      this.props.modifyField("charge_de_affaire", data[0].id);
      this.props.modifyField("assistant", data[0].id);
      this.props.modifyField("chef_projet", data[0].id);
      this.setState({collaborateurs : data});
    });

    axios.get(process.env.REACT_APP_STARTURIBACK + '/medias/'+this.props.dataFormAffaire().client+'/medias/',
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.props.modifyField("chef_projet", data[0].id);
      this.setState({collaborateurs : data});
    });
  }

  render(){
    return (
      <div>
        <div className='border border-gray-400 p-2 mb-2'>
  
          <div className='flex gap-6'>
            <LabelInput label="N Affaire" disabled value={this.props.dataFormAffaire().numero_contrat}/>
            <LabelInput label="N Plan" disabled value={1}/>
          </div>

          <LabelInput label="Libelle Affaire" value={this.props.dataFormAffaire().libelle_affaire} disabled/>
          <LabelInput label="Libelle Plan" value={this.props.dataFormAffaire().libelle_plan_affaire} disabled/>
 
        </div>
  
        <div className='border border-gray-400 p-2 mb-2'>
          <LabelSelect label="Charge Affaire" onChange={(e)=>{
            this.props.modifyField("charge_de_affaire", e.target.value);
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
            this.props.modifyField("chef_projet", e.target.value);
          }}  options={
            this.state.collaborateurs.reduce((prev, curr)=>{
              let key = curr.first_name + " " + curr.last_name;
              prev[key] = curr.id;
              return prev
            }, {})
          }/>
        </div>
  
        <div className='border border-gray-400 p-2 mb-2'>
          <h2 className='font-bold text-sm text-center'>Liste des moyens de communication(tel, fax, mail) - Touche "Inserer" pour ajouter</h2>
          <table className='text-sm'>
            <thead>
              <tr>
                <td className=''></td>
                <td className=''>Media</td>
                <td className=''>Indication(n, adresse mail, ...)</td>
                <td className=''>Complements (poste, note)</td>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
  
      </div>
    )
  }
  
}

export default Etape5