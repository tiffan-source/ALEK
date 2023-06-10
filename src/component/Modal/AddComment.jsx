import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import LabelCheckbox from '../utils/LabelCheckbox/LabelCheckbox';
import Button from '../utils/Button/Button';

function AddComment(props) {
    const [comment, setComment] = useState('')
    const [asuivre, setAsuivre] = useState(props.avis === 'RMQ')

    return (
    <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto h-full flex justify-center items-center bg-[#000a]">
        <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700">
                <div className='flex justify-between items-center pr-6'>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white p-6">
                        Ajouter un commentaire
                    </h3>
                    <span className='text-xl cursor-pointer' onClick={()=>{
                        props.handleClose()
                    }}><FontAwesomeIcon icon={faXmark}/></span>
                </div>
                <div className="px-6 space-y-6">
                    <textarea name="" id="" className='w-full' rows="5" value={comment} onChange={(e)=>{
                        setComment(e.target.value);
                    }}></textarea>
                    <LabelCheckbox checked={asuivre} label="A suivre" onChange={(e)=>{
                        setAsuivre(e.target.checked);
                    }}/>
                </div>
                <div className="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <Button action={()=>{
                        props.handleClose();
                    }}>Retour</Button>
                    <Button action={()=>{
                        props.setComments([...props.comments, {
                            commentaire : comment,
                            a_suivre : asuivre
                        }])
                        props.handleClose();
                    }}>Creer</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddComment