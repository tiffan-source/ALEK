import React, { Component } from 'react'
import moment from 'moment';
import axios from 'axios';

class Etape4 extends Component{

  constructor(){
    super();
    this.state = {
      duree : 0,
      startChantier : "",
      endChantier : "",
      destinations : []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:8000/api/admin/ouvrages/destinations/'+this.props.dataFormAffaire().client,
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.props.modifyField("destination", data[0].id)
      this.setState({destination : data});
    });
  }

  setDebutChantier = (e) => {
    let debut = new Date(e.target.value);
    debut = moment(debut.toLocaleDateString());
    this.setState({startChantier : debut.format('YYYY-MM-DD')});
    this.props.modifyField("debut_chantier", debut.format('YYYY-MM-DD'));
  }

  setFinChantier = (e) =>{
    let value = parseInt(e.target.value);
    let start = new Date(this.props.dataFormAffaire().debut_chantier);
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
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>N° Affaire</label>
            <input className='shadow-inner border w-[12rem]' type="text" disabled value={this.props.dataFormAffaire().numero_contrat}/>
          </div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>N° Plan</label>
            <input value={1} className='shadow-inner border w-[8rem]' type="text" disabled/>
          </div>
        </div>

        <div className='flex justify-between'>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Libelle Affaire</label>
            <input className='shadow-inner border w-[12rem]' type="text" value={this.props.dataFormAffaire().libelle_affaire} disabled/>
          </div>
        </div>

        <div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Libele Plan Affaire </label>
            <input className='shadow-inner border' type="text" onChange={(e)=>{
                this.props.modifyField("libelle_plan_affaire", e.target.value);
              }}/>
          </div>
        </div>
      </div>

      <div className='border border-gray-400 p-2 mb-2'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <label htmlFor="" className=''>Montant des travaux</label>
            <input className='shadow-inner border w-[10rem]' type="text" onChange={(e)=>{
                this.props.modifyField("montant_des_travaux", e.target.value);
              }}/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="" className=''>Devise</label>
            <select className='shadow-inner border border-gray-800 bg-white p-1' type="text" onChange={(e)=>{
                this.props.modifyField("devise", e.target.value);
              }}>
              <option value="">€</option>
              <option value="">$</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="" className=''>(HT/TTC)</label>
            <select className='shadow-inner border border-gray-800 bg-white p-1' type="text" onChange={(e)=>{
                this.props.modifyField("type_montant", e.target.value);
              }}>
              <option value="">HT</option>
              <option value="">TTC</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="" className=''>Destination</label>
            <select className='shadow-inner border border-gray-800 bg-yellow-200 px-2 py-1 text-sm' type="text" onChange={(e)=>{
                this.props.modifyField("destination", e.target.value);
              }}>
                {this.state.destinations.map((destination, index)=>{
                  return (
                    <option key={index} value={destination.id}>{destination.name}</option>
                  )
                })}
            </select>

          </div>
        </div>

        <div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Date début Prestation BV</label>
            <input className='shadow-inner border w-[10rem]' type="date" onChange={(e)=>{
                this.props.modifyField("debut_prestation_bv", e.target.value);
              }}/>
          </div>
        </div>

        <div className='flex justify-between'>
          <div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>Date de début du chantier</label>
              <input value={this.state.startChantier} className='shadow-inner border w-[10rem]' type="date" onChange={this.setDebutChantier}/>
            </div>
          </div>
  
          <div className='flex justify-between gap-4'>
            <div className='flex gap-4 items-center'>
              <label htmlFor="">Duree</label>
              <div className='flex items-center'>
                <input type="number" className='w-[3rem] shadow-inner border' value={this.state.duree} onChange={this.setFinChantier}/>
              </div>
              <span>Mois</span>
            </div>
          </div>
  
        </div>

        <div>
          <div className='flex items-center gap-2 py-1'>
            <label htmlFor="" className=''>Date de fin</label>
            <input className='shadow-inner border w-[10rem]' type="date" value={this.state.endChantier} onChange={this.setDureeChantier}/>
          </div>
        </div>

        <div className='flex justify-between'>
          <div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>Nb document a examiner</label>
              <input className='shadow-inner border w-[6rem]' type="text" onChange={(e)=>{
                this.props.modifyField("nb", e.target.value);
              }}/>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-2 py-1'>
              <label htmlFor="" className=''>Nb visites/reunions prevues</label>
              <input className='shadow-inner border w-[6rem]' type="text" onChange={(e)=>{
                this.props.modifyField("visite_reunions", e.target.value);
              }}/>
            </div>
          </div>
        </div>
  
      </div>


      <div>
          <span>Adresse du Chantier</span>
          <div className='grid grid-cols-2 gap-2'>
  
            <div className='border border-gray-600 p-1'>
              <div className='flex items-center gap-2 py-1'>
                <label htmlFor="" className='w-[7rem]'>Cplt Geo</label>
                <input className='shadow-inner border w-[12rem]' type="text" onChange={(e)=>{
                this.props.modifyField("cplt_geo", e.target.value);
              }}/>
              </div>
              <div className='flex items-center gap-2 py-1'>
                <label htmlFor="" className='w-[7rem]'>N et voie</label>
                <input className='shadow-inner border w-[12rem]' type="text" onChange={(e)=>{
                this.props.modifyField("numero_voie", e.target.value);
              }}/>
              </div>
              <div className='flex items-center gap-2 py-1'>
                <label htmlFor="" className='w-[7rem]'>Lieu dit</label>
                <input className='shadow-inner border w-[12rem]' type="text" onChange={(e)=>{
                this.props.modifyField("lieu_dit", e.target.value);
              }}/>
              </div>
              <div className='flex items-center gap-2 py-1'>
                <label htmlFor="" className='w-[7rem]'>CP/VIlle</label>
                <input className='shadow-inner border w-[12rem]' type="text" /> {/* Quel choix faire */}
              </div>
              <div className='flex items-center gap-2 py-1'>
                <label htmlFor="" className='w-[7rem]'>Departement</label>
                <input className='shadow-inner border w-[12rem]' type="text" />
              </div>
              <div className='flex items-center gap-2 py-1'>
                <label htmlFor="" className='w-[7rem]'>Province</label>
                <input className='shadow-inner border w-[12rem]' type="text" />
              </div>
              <div className='flex items-center gap-2 py-1'>
                <label htmlFor="" className='w-[7rem]'>Pays</label>
                <input className='shadow-inner border w-[12rem]' type="text"  onChange={(e)=>{
                this.props.modifyField("pays", e.target.value);
              }}/>
              </div>
            </div>
            
            <div className='flex flex-col justify-between border border-gray-600 p-1'>
              <div>
                <input type="checkbox" />
                <label htmlFor="">Utiliser l'adresse postal pour l'envoi des courriers</label>
              </div>
              <div>
                <div className='flex flex-col mb-2'>
                  <label htmlFor="" className=''>Boite Postal</label>
                  <input className='shadow-inner border w-[6rem]' type="text" />
                </div>
  
                <div className='flex justify-between'>
                  <div className='flex flex-col'>
                    <label htmlFor="" className=''>CP</label>
                    <input className='shadow-inner border w-[4rem]' type="text" />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="" className=''>Bureau distributeur</label>
                    <input className='shadow-inner border w-[12rem]' type="text" />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="" className=''>Cedex</label>
                    <input className='shadow-inner border w-[4rem]' type="text" />
                  </div>
                </div>
            </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  
}

export default Etape4