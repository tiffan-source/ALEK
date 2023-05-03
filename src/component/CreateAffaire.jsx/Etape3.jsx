import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'

class Etape3 extends Component {

  constructor(){
    super();
    this.state = {
      client : null
    }
  }

  componentDidMount(){
    axios.get('http://localhost:8000/api/admin/client/',
    { withCredentials: true}).then(response=>{
    })
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
                this.props.modifyField("champ", e.target.value);
              }}/>
            </div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>N Plan</label>
              <input className='shadow-inner border w-[4rem]' type="text"  onChange={(e)=>{
                this.props.modifyField("champ", e.target.value);
              }}/>
            </div>
          </div>
  
          <div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>Libele Affaire</label>
              <input className='shadow-inner border' type="text"  onChange={(e)=>{
                this.props.modifyField("champ", e.target.value);
              }} />
            </div>
          </div>
  
          <div className='flex justify-between'>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>Statut affaire</label>
              <select className='shadow-inner border border-gray-800 bg-yellow-200 px-2 py-1 text-sm' type="text"  onChange={(e)=>{
                this.props.modifyField("champ", e.target.value);
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
            <input className='shadow-inner border' type="text" />
            <input className='shadow-inner border' type="text" />
          </div>
        </div>
  
        <div className='border border-gray-400 p-2 mb-2'>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Gerer par: Service N</label>
            <input className='shadow-inner border w-[6rem]' type="text" />
            <input className='shadow-inner border' type="text" />
            <input className='shadow-inner border' type="text" />
          </div>
        </div>
  
        <div className='border border-gray-400 p-2 mb-2'>
  
          <div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>Marque</label>
              <select className='shadow-inner border border-gray-800 bg-yellow-200 px-2 py-1 text-sm w-[10rem]' type="text">
                <option value="">Marque#1</option>
                <option value="">Marque#2</option>
              </select>
            </div>
          </div>

        </div>
  
        <div  className='border border-gray-400 p-2 mb-2'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>N Offre</label>
              <input className='shadow-inner border' type="text" />
            </div>

          </div>
          <div className='flex justify-between'>

            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>Date du contrat</label>
              <input className='shadow-inner border' type="date" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}

export default Etape3