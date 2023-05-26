import React, { Component } from 'react';
import LabelInput from '../utils/LabelInput/LabelInput';
import LabelSelect from '../utils/LabelSelect/LabelSelect';
import Button from '../utils/Button/Button';
import LabelCheckbox from '../utils/LabelCheckbox/LabelCheckbox';
import axios from 'axios';
import moment from 'moment';

class CreateDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pdfFiles: [],
        dataDocument : {
          "dossier": null,
          "nature": "",
          "numero_externe": null,
          "date_de_indice": null,
          "date_de_reception": null,
          "indice": "",
          "titre": "",
          "num_revision": "",
          "emetteur": null,
          "ouvrage": null,
          "numero_aleatek": null,
          "exam": [],
          "fichier_attache": [],
          "affectation": []
        },

        pdfData : {
          "nom_fichier" : "",
          "cree_le" : "",
        },

        id_affaire : null,

        ouvrages : [],
        emetteurs : []
    };
  }

  componentDidMount(){

    let id = localStorage.getItem("planAffaire");
    if(id){

      this.setState(state=>{
        return {dataDocument : {...state.dataDocument, dossier : "Execution"}}
      })

      axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/plan/affaire/' + id).then(res=>{
        this.setState({id_affaire : res.data.affaire})
        this.setState(state=>{
          return {dataDocument : {...state.dataDocument, numero_aleatek : res.data.affaire}}
        })
      }).catch(err=>localStorage.removeItem("planAffaire"));



      axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/ouvrages').then(res=>{
        this.setState({ouvrages : res.data.results});
        this.setState(state=>{
          return {dataDocument : {...state.dataDocument, ouvrage : res.data.results[0].id}}
        })
      });

      axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/entreprise/registration/').then(res=>{
        this.setState({emetteurs : res.data.results});
        this.setState(state=>{
          return {dataDocument : {...state.dataDocument, emetteur : res.data.results[0].id}}
        })
      });
    }
  }


  handleFileUpload = (event) => {
    let newFile = event.target.files[0];
    this.setState((prevState) => ({
      pdfFiles: [...prevState.pdfFiles, {
        ...prevState.pdfData, fichier : newFile
      }],
    }));
  };

  handleRemoveFile = (index) => {
    this.setState((prevState) => {
      const updatedFiles = [...prevState.pdfFiles];
      updatedFiles.splice(index, 1);
      return {
        pdfFiles: updatedFiles,
      };
    });
  };

  createDocument = ()=>{
    this.state.pdfFiles.forEach(pdfFile=>{
      let formData = new FormData();
      formData.append('fichier', pdfFile.fichier);
      formData.append('nom_fichier', pdfFile.nom_fichier);
      formData.append('cree_le', pdfFile.cree_le);

      axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/fichieratacher/',
      formData, {withCredentials : true}).then(res=>{
        this.setState(state=>{
          return {dataDocument : {...state.dataDocument, fichier_attache : [...state.dataDocument.fichier_attache, res.data.id]}}
        })
      })
    });

    axios.get("http://localhost:8000/connecte-users/").then(resUser=>{
      let idUser = resUser.data.results[0].id;
      axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/intervenant/', {
        "affecte_le": moment().format('YYYY-MM-DD'),
        "action": false,
        "affecte_par": idUser,
        "intervenant": [idUser],
        "intervention_technique": []
      }, {withCredentials : true}).then(dataAffectation=>{
        axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/document/', {...this.state.dataDocument, affectation : [dataAffectation.data.id]}, {withCredentials : true}).then(res=>{
          this.props.annuler();
        })
      });
    })
  }

  render() {
    return (
      <div className='m-2'>
        <div className='flex gap-8'>
          <div>
            <LabelInput label='N Affaire' disabled value={this.state.id_affaire}/>
            <LabelSelect label='Emetteur' options={
              this.state.emetteurs.reduce((prev, curr)=>{
                let key = curr.raison_social;
                prev[key] = curr.id;
                return prev
              }, {})
            } onChange={(e)=>{
              this.setState(state=>{
                return {dataDocument : {...state.dataDocument, emetteur : e.target.value}}
              })
            }}/>
            <LabelSelect label='Ouvrage' options={
              this.state.ouvrages.reduce((prev, curr)=>{
                let key = curr.libelle;
                prev[key] = curr.id;
                return prev
              }, {}) 
            } onChange={(e)=>{
              this.setState(state=>{
                return {dataDocument : {...state.dataDocument, ouvrage : e.target.value}}
              })
            }}/>
            <LabelInput label='N externe' onChange={(e)=>{
              this.setState(state=>{
                return {dataDocument : {...state.dataDocument, numero_externe : e.target.value}}
              })
            }}/>
            <LabelInput type='date' label='Date reception' onChange={(e)=>{
              this.setState(state=>{
                return {dataDocument : {...state.dataDocument, date_de_reception : e.target.value}}
              })
            }}/>
            <LabelInput label='Titre' onChange={(e)=>{
              this.setState(state=>{
                return {dataDocument : {...state.dataDocument, titre : e.target.value}}
              })
            }}/>
          </div>
          <div>
            <LabelInput label='N Revision' onChange={(e)=>{
              this.setState(state=>{
                return {dataDocument : {...state.dataDocument, num_revision : e.target.value}}
              })
            }} />
            <LabelSelect label='Dossier' onChange={(e)=>{
              this.setState(state=>{
                return {dataDocument : {...state.dataDocument, dossier : e.target.value}}
              })
            }} options={{
              "Execution" : "Execution",
              "Conception" : "Conception"
            }}/>
            <LabelInput label='Nature'  onChange={(e)=>{
              this.setState(state=>{
                return {dataDocument : {...state.dataDocument, nature : e.target.value}}
              })
            }}/>
            <LabelInput label='Indice' onChange={(e)=>{
              this.setState(state=>{
                return {dataDocument : {...state.dataDocument, indice : e.target.value}}
              })
            }} />
            <LabelInput type='date' label='Date indice' onChange={(e)=>{
              this.setState(state=>{
                return {dataDocument : {...state.dataDocument, date_de_indice : e.target.value}}
              })
            }} />
          </div>
        </div>

        <div className='flex gap-6 items-center bg-gray-400 p-2'>
          <LabelCheckbox label='Proprietaire' />
          <input
            id='pdf-upload'
            type='file'
            accept='application/pdf'
            className='hidden'
            onChange={this.handleFileUpload}
          />
          <LabelInput label='Nom fichier' value={this.state.pdfData.nom_fichier} onChange={(e)=>{
            this.setState(state=>{
              return {pdfData : {...state.pdfData, nom_fichier : e.target.value}};
            })
          }}/>
          <LabelInput label='Creer le' type='date' value={this.state.pdfData.cree_le} onChange={(e)=>{
            this.setState(state=>{
              return {pdfData : {...state.pdfData, cree_le : e.target.value}};
            })
          }}/>
          <label htmlFor='pdf-upload' className='text-blue-600 hover:underline cursor-pointer'>
            Ajouter le fichier
          </label>
        </div>

        <table className='text-sm w-full'>
          <thead>
            <tr className='grid grid-cols-6 border-b border-gray-600 py-2'>
              <th className='col-span-2 text-start'>Nom du fichier</th>
              <th className='col-span-1 text-start'>Creer le</th>
              <th className='col-span-2 text-start'>Fichier</th>
              <th className='col-span-1 text-start'>Retirer</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.pdfFiles.map((pdfFile, index)=>{
                return (
                  <tr key={index} className={'grid grid-cols-6 border-b border-gray-600'}>
                    <td className='col-span-2'>{pdfFile.nom_fichier}</td>
                    <td className='col-span-1'>{pdfFile.cree_le}</td>
                    <td className='col-span-2'>{pdfFile.fichier.name}</td>
                    <td className='col-span-1 text-center text-red-800'>
                      <span className='cursor-pointer' onClick={()=>{
                        this.handleRemoveFile(index);
                      }}>Retirer</span>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
          
        <div className='flex gap-6 mt-4'>
          <Button action={this.createDocument}>Creer le document</Button>
          <Button action={this.props.annuler}>Annuler</Button>
        </div>
      </div>
    );
  }
}

export default CreateDocument;
