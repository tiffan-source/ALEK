import React, { Component } from 'react'
import LabelSelect from '../utils/LabelSelect/LabelSelect'
import LabelInput from '../utils/LabelInput/LabelInput'
import LabelTextArea from '../utils/LabelTextArea/LabelTextArea'

export default class CreateExamen extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    
  }

  render() {
    if(this.props.document)
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>N Aleatek</th>
              <th>Emetteur</th>
              <th>Nature</th>
              <th>N Externe</th>
              <th>Indice</th>
              <th>Titre</th>
              <th>Ouvrage</th>
              <th>Date Reception</th>
              <th>Affecte le</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tbody>
        </table>

        <div>
          <LabelSelect label="Emetteur"/>
          <LabelSelect label="Ouvrage"/>
          <LabelSelect label="Avis"/>
          <LabelInput label="Affecte par" disabled/>
          <LabelTextArea label="Commentaire"/>
        </div>
      </div>
    )
    else
      return (
        <div>Selectionner un document prealablement</div>
      )
  }
}