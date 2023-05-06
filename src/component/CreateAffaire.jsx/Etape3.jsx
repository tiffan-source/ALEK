import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'

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

    axios.get('http://localhost:8000/api/admin/client/',
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.props.modifyField("client", data[0].first_name + " " + data[0].last_name)
      this.setState({client : data});
    });

    axios.get('http://localhost:8000/api/admin/services/',
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.props.modifyField("numero_service_en_charge", data[0].code_services + " " + data[0].code_services)
      this.setState({service : data});
    });

    axios.get('http://localhost:8000/api/admin/marque/',
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.props.modifyField("marques", data[0].name)
      this.setState({marque : data});
    });
  }

  render(){
    return (
      <div>
        <div className='border border-gray-400 p-2 mb-2'>
  
          <div className='flex justify-between'>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>N Contrat Aleatck</label>
              <input className='shadow-inner border w-[12rem]' type="text" disabled/>
            </div>
          </div>
  
          <div className='flex justify-between'>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>N Affaire Aleatck</label>
              <input className='shadow-inner border w-[12rem]' type="text" onChange={(e)=>{
                this.props.modifyField("numero_contrat", e.target.value);
              }}/>
            </div>
          </div>
  
          <div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>Libele Affaire</label>
              <input className='shadow-inner border' type="text"  onChange={(e)=>{
                this.props.modifyField("libelle_affaire", e.target.value);
              }} />
            </div>
          </div>
  
          <div className='flex justify-between'>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>Statut affaire</label>
              <select className='shadow-inner border border-gray-800 bg-yellow-200 px-2 py-1 text-sm' type="text"  onChange={(e)=>{
                this.props.modifyField("statut_affaire", e.target.value);
              }}>
                <option value="Encours">Encours</option>
                <option value="Acheve">Acheve</option>
                <option value="Abandonne">Abandonne</option>
              </select>
            </div>
          </div>
  
        </div>
  
        <div className='border border-gray-400 p-2 mb-2'>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Client</label>
            <select className='shadow-inner border border-gray-800 bg-yellow-200 px-2 py-1 text-sm' type="text"  onChange={(e)=>{
                this.props.modifyField("client", e.target.value);
              }}>
                {this.state.client.map((client, index)=>{
                  return (
                    <option key={index} value={client.id}>{client.first_name + " " + client.last_name}</option>
                  )
                })}
            </select>
          </div>
        </div>
  
        <div className='border border-gray-400 p-2 mb-2'>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Gerer par: Service N</label>
            <select className='shadow-inner border border-gray-800 bg-yellow-200 px-2 py-1 text-sm' type="text"  onChange={(e)=>{
                this.props.modifyField("numero_service_en_charge", e.target.value);
              }}> 
                {this.state.service.map((service, index)=>{
                  return (
                    <option key={index} value={service.code_services}>{service.code_services}</option>
                  )
                })}
            </select>
          </div>
        </div>
  
        <div className='border border-gray-400 p-2 mb-2'>
  
          <div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>Marque</label>
              <select className='shadow-inner border border-gray-800 bg-yellow-200 px-2 py-1 text-sm' type="text"  onChange={(e)=>{
                  this.props.modifyField("marques", e.target.value);
                }}> 
                  {this.state.marque.map((marque, index)=>{
                    return (
                      <option key={index} value={marque.name}>{marque.name}</option>
                    )
                  })}
              </select>
            </div>
          </div>

        </div>
  
        <div  className='border border-gray-400 p-2 mb-2'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>N Offre</label>
              <input className='shadow-inner border' type="text" onChange={(e)=>{
                this.props.modifyField("numero_offre", e.target.value);
              }}/>
            </div>

          </div>
          <div className='flex justify-between'>

            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>Date du contrat</label>
              <input className='shadow-inner border' type="date" onChange={(e)=>{
                this.props.modifyField("date_contrat", e.target.value);
              }}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}

export default Etape3