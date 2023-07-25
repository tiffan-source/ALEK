import React from 'react';
import LabelInput from '../../../../../component/utils/LabelInput/LabelInput';

const Detail = ({data}) => {
  return (
    <>
      <div className='border border-black m-1'>
        <div className='flex flex-wrap'>
          <LabelInput disabled value={data.numero} label="N Plan Affaire" />
          <LabelInput disabled value={data.libelle} label="Libelle Plan Affaire"/>
          <LabelInput disabled value={data.risque} label="Risque" />
        </div>
      </div>
      <div className='m-1 border border-gray-600 p-1'>
        <div className='flex gap-8 m-1'>
          <LabelInput disabled value={data.batiment} label="Destination"/>
          <LabelInput disabled value={data.type} label="Type d'affaire"/>
        </div>
        <LabelInput disabled value={data.charge_affaire.first_name + " " + data.charge_affaire.last_name} label="Charge affaire"/>

        <div className='flex justify-between my-1'>
          <div className=''>
            <LabelInput disabled value={data.prix} label="Montant des travaux"/>
            <div className='flex gap-6 text-md ml-1'>
              <span>{data.devise}</span>
              <span>{data.type_montant}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='m-1 grid grid-cols-3 gap-2'>
        <div className='border border-gray-600 col-span-1 p-1'>
          <LabelInput disabled value={data.debut_prestation} type="date" label="Date début Prestation BV"/>
          <LabelInput disabled value={data.debut_chantier} type="date" label="Date de début du chantier"/>                    

          <LabelInput disabled value={data.fin_chantier} type="date" label="Date de fin"/>
          <LabelInput disabled value={data.doc} type="number" label="Nb document a examiner"/>
        </div>

        <div className='border border-gray-600 col-span-2 p-1'>
          <div className='my-1 flex flex-col'>
            <LabelInput disabled value={data.risque} label="Risque"/>
            <div className='flex items-center gap-4'>
              <span>Nb prevus:</span>
              <div className='flex items-center'>
                <LabelInput disabled value={data.visite} label="Visite/Reunion" type="number"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
