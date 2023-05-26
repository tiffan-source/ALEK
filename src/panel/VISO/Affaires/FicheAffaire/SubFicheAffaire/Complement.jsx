import React from 'react';
import LabelInput from '../../../../../component/utils/LabelInput/LabelInput';
import Table from '../../../../../component/utils/Table/Table';
import Button from '../../../../../component/utils/Button/Button';

function Complement() {
  return (
    <>
      <div className='border border-gray-400 m-1'>
        <div className='flex flex-wrap'>
          <LabelInput col label="N Aleatek"/>
          <LabelInput col label="N Affaire"/>
          <LabelInput col label="Client"/>
          <LabelInput col label="N Plan"/>
          <LabelInput col label="Responsable d'Affaire"/>
        </div>
      </div>
      <div className='grid grid-cols-5 p-1 gap-4 flex-grow'>
        <div className='col-span-2 grid grid-row-7 gap-4 h-full'>
          <div className='raw-span-3'>
            <h2 className='text-sm font-bold'>Description sommaire de l'ouvrage</h2>
            <Table datas={[
              {"Paragraphes" : 'Premiere ligne'},
              {"Paragraphes" : 'Premiere ligne'},
              {"Paragraphes" : 'Premiere ligne'},
              {"Paragraphes" : 'Premiere ligne'},
              {"Paragraphes" : 'Premiere ligne'},
              {"Paragraphes" : 'Premiere ligne'},
              {"Paragraphes" : 'Premiere ligne'},
            ]}/>
          </div>
          <div className='raw-span-4'>
            <h2 className='text-sm font-bold'>Detail du paragraphe selectionne</h2>
            <p className='bg-white shadow-inner min-h-[16rem] text-gray-600 p-1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis, nulla quaerat! Saepe totam aperiam rerum.</p>
          </div>
        </div>
        <div className='col-span-3'>
          <Button>Caracteristique Project</Button>
          <h2 className='text-center text-sm font-bold'>Notes du charge d'affaire</h2>
          <p className='bg-white shadow-inner min-h-[28rem] text-gray-600 p-1'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, quod possimus. Quam quis molestiae, ipsum ipsam quas blanditiis suscipit tempora doloribus in repudiandae. Commodi totam dolores ea amet impedit vero.</p>
        </div>
      </div>
    </>
  )
}

export default Complement