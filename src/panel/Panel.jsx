import React from 'react';
import { strutures } from '../structure';
import { panelMaker } from '../utils/panelMaker';

function Panel() {
  return (
    <nav className='p-4'>
        {panelMaker(strutures, null)}
    </nav>
  )
}

export default Panel