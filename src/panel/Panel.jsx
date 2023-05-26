import React from 'react';
import { strutures } from '../structure';
import { panelMaker } from '../utils/panelMaker';

function Panel() {
  return (
    <nav className='h-full border-r-2 border-gray-400'>
      <h2 className='text-lg text-center py-2 bg-gray-200 border-b-2 border-gray-400'>
        Aleatek App Tool
      </h2>
      <div className='p-4 shadow-inner'>
        {panelMaker(strutures, null)}
      </div>
    </nav>
  )
}

export default Panel