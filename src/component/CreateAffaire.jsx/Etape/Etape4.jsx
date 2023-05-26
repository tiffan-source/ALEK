import React, { Component } from 'react'
import moment from 'moment';
import axios from 'axios';
import LabelInput from '../../utils/LabelInput/LabelInput';
import LabelSelect from '../../utils/LabelSelect/LabelSelect';
import LabelCheckbox from '../../utils/LabelCheckbox/LabelCheckbox';

class Etape4 extends Component{

  constructor(){
    super();
    this.state = {
      duree : 0,
      startChantier : "",
      endChantier : "",
      destinations : [],
      products : []
    }
  }

  componentDidMount(){
    this.props.modifyField("devise", "€");
    this.props.modifyField("numero_plan", "1");
    this.props.modifyField("type_montant", "HT");
    this.props.modifyField("type_affaire", "CTC");
    this.props.modifyField("risque", "Normal");

    axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/ouvrage/destinations',
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.props.modifyField("destination", data[0].id)
      this.setState({destinations : data});
    });

    axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/product',
    { withCredentials: true}).then(response=>{
      let data = response.data.results;
      this.props.modifyField("produit", data[0].id)
      this.setState({products : data});
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
          <LabelInput label="N° Affaire" disabled value={this.props.dataFormAffaire().numero_contrat}/>
          <LabelInput label="N° Plan" disabled value={1}/>
        </div>

        <LabelInput label="Libelle Affaire" value={this.props.dataFormAffaire().libelle_affaire} disabled/>

        <LabelInput label="Libele Plan Affaire" onChange={(e)=>{
          this.props.modifyField("libelle_plan_affaire", e.target.value);
        }}/>
      </div>

      <div className='border border-gray-400 p-2 mb-2'>
        <div className='flex items-center justify-between'>
          <LabelInput label="Montant travaux" onChange={(e)=>{
            this.props.modifyField("montant_des_travaux", e.target.value);
          }}/>

          <LabelSelect col label="Devise" onChange={(e)=>{
            this.props.modifyField("devise", e.target.value);
          }} options={{
            "€" : "€",
            "$" : "$"
          }}/>

          <LabelSelect col label="(HT/TTC)" onChange={(e)=>{
            this.props.modifyField("type_montant", e.target.value);
          }} options={{
            "HT" : "HT",
            "TTC" : "TTC"
          }}/>

          <LabelSelect col label="Destination" onChange={(e)=>{
            this.props.modifyField("destination", e.target.value);
          }} options={
            this.state.destinations.reduce((prev, curr)=>{
              let key = curr.nom;
              prev[key] = curr.id;
              return prev
            }, {})
          }/>
        </div>

        <LabelInput label="Date début Prestation" type="date" onChange={(e)=>{
          this.props.modifyField("debut_prestation_bv", e.target.value);
        }}/>

        <div className='flex justify-between'>
          <LabelInput label="Date de début du chantier" value={this.state.startChantier} type="date" onChange={this.setDebutChantier}/>
          <LabelInput label="Duree" type="number" value={this.state.duree} onChange={this.setFinChantier} span_info="Mois"/>
        </div>

        <LabelInput label="Date de fin" type="date" value={this.state.endChantier} onChange={this.setDureeChantier}/>

        <div className='flex justify-between'>
          <LabelInput label="Nb document a examiner" type="number" onChange={(e)=>{
            this.props.modifyField("nb", e.target.value);
          }}/>

          <LabelInput label="Nb visites/reunions prevues" type="number" onChange={(e)=>{
            this.props.modifyField("visite_reunions", e.target.value);
          }}/>
        </div>

        <div className="flex justify-between">
          <LabelSelect label="Type d'affaire" onChange={e=>{
            this.props.modifyField("destination", e.target.value);
          }} options={{
            "CTC" : "CTC",
            "VT" : "VT"
          }} />

          <LabelSelect label="Produit" onChange={(e)=>{
            this.props.modifyField("produit", e.target.value);
          }} options={
            this.state.products.reduce((prev, curr)=>{
              let key = curr.name;
              prev[key] = curr.id;
              return prev
            }, {})
          }/>

          <LabelSelect label="Risque"  onChange={e=>{
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
              <LabelInput label="Cplt Geo" onChange={(e)=>{
                this.props.modifyField("cplt_geo", e.target.value);
              }}/>
              <LabelInput label="N et voie" onChange={(e)=>{
                this.props.modifyField("numero_voie", e.target.value);
              }}/>
              <LabelInput label="Lieu dit" onChange={(e)=>{
                this.props.modifyField("lieu_dit", e.target.value);
              }}/>
              <LabelInput label="CP/VIlle" onChange={(e)=>{
                if(Number.isInteger(parseInt(e.target.value)))
                  this.props.modifyField("compte_postal", e.target.value);
                else
                  this.props.modifyField("ville", e.target.value);
              }}/>
              <LabelInput label="Departement" onChange={(e)=>{
                this.props.modifyField("departement", e.target.value);
              }}/>
              <LabelInput label="Province" onChange={(e)=>{
                this.props.modifyField("province", e.target.value);
              }}/>
              <LabelInput label="Pays" onChange={(e)=>{
                this.props.modifyField("pays", e.target.value);
              }}/>
            </div>
            
            <div className='flex flex-col justify-between border border-gray-600 p-1'>
              <LabelCheckbox label="Utiliser l'adresse postal pour l'envoi des courriers"/>

              <div>
                <LabelInput label="Boite Postal" col/>
  
                <div className='flex justify-between'>
                  <LabelInput label="CP" type="number" col/>
                  <LabelInput label="Bureau distributeur" col/>
                  <LabelInput label="Cedex" type="number" col/>
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