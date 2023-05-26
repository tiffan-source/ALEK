import React, { Component } from 'react'
import oilPump from '../../../../assets/icon/oil-pump.png';
import Tabs from '../../../../component/utils/Tabs/Tabs';

import Complement from './SubFicheAffaire/Complement';
import Detail from './SubFicheAffaire/Detail';
import Fiche from './SubFicheAffaire/Fiche';

class FicheAffaire extends Component {

  render(){
    return (
      <div className='w-full h-full text-sm'>
        <h1 className='border-t border-gray-400 p-1 bg-green-200 font-bold'>ALEATEK</h1>

        <nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
          <h2 className='text-blue-800 flex items-center'>
            <img src={oilPump} alt="OilPump" className='w-[2rem]'/>
            Fiche Affaire
          </h2>
        </nav>
        <Tabs tabs={[
            {title : "Fiche Affaire", content : <Fiche/>},
            {title : "Detail du Plan d'Affaire", content : <Detail/>},
            {title : "Complement du Plan d'Affaire", content : <Complement/>},
        ]}/>
      </div>
    )
  }
}

export default FicheAffaire