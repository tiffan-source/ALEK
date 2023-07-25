import React, { useEffect, useState } from 'react'
import Button from '../../../../../component/utils/Button/Button'
import axios from 'axios'
import MiniLoader from '../../../../../component/utils/Loader/MiniLoader';
import Flash from '../../../../../component/utils/Flash/Flash';

function GestionSynthese({dataSynthese, retour, table_statut, affaire}) {

    const [commentaires, setCommentaires] = useState({});
    const [load, setLoad] = useState(true);
    const [action, setAction] = useState(false);
    const [errors, setErrors] = useState(false);
    const [success, setSuccess] = useState(false);
    const [handle, setHandle] = useState(true);

    useEffect(()=>{
        (async()=>{
            if(dataSynthese.statut === 0){
                let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/all_avis_of_affaire/${affaire}/`);
                setCommentaires(data)    
            }else{
                let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/all_avis_of_synthese/${dataSynthese.id}/`);
                setCommentaires(data)    
            }
			//     await axios.get(process.env.REACT_APP_STARTURIBACK + `/devalidate_synthese_avis/${dataSynthese.id}/${affaire}/`);
			//     setSuccess(true)
			//     setHandle(!handle)
			// } catch (error) {
			//     setErrors("Une erreur est survenue")
			// }
			// setAction(false);
			// window.location.reload();
            setLoad(false)
        })()
    }, [handle])

    let valider = async()=>{
        // try {
        //     await axios.get(process.env.REACT_APP_STARTURIBACK + `/validate_synthese_avis/${dataSynthese.id}/${affaire}/`);
        //     setSuccess(true)
        //     setHandle(!handle)
        // } catch (error) {
        //     setErrors("Une erreur est survenue")
        // }
        // setAction(false);
		// window.location.reload();
    }

    let devalider = async()=>{
        // try {
        //     await axios.get(process.env.REACT_APP_STARTURIBACK + `/devalidate_synthese_avis/${dataSynthese.id}/${affaire}/`);
        //     setSuccess(true)
        //     setHandle(!handle)
        // } catch (error) {
        //     setErrors("Une erreur est survenue")
        // }
        // setAction(false);
		// window.location.reload();
    }

    let classer = async()=>{

    }

    if (load) {
        return <MiniLoader/>
    }

    return (
    <>
        {success && <Flash setFlash={setSuccess} type={'success'}>Operation reussie</Flash>}
        {errors && <Flash setFlash={setErrors}>{errors}</Flash>}
        <div className='bg-white m-4'>
            <div className='px-4 pt-4'>
                <Button action={()=>{
                    retour()
                }}>Retour</Button>
            </div>
            <div className='text-sm grid grid-cols-2 p-4 gap-4'>
                <div>
                    <span className='font-bold'>Date : </span>
                    <span>{dataSynthese.date}</span>
                </div>
                <div>
                    <span className='font-bold'>Statut : </span>
                    <span>{table_statut[dataSynthese.statut]}</span>
                </div>
                <div>
                    <span className='font-bold'>Createur : </span>
                    <span>{dataSynthese.createur.last_name} {dataSynthese.createur.first_name}</span>
                </div>
            </div>

            {!action ? <div className='p-4'>
            {parseInt(dataSynthese.statut) <= 1 && <div className='p-4'>
                {parseInt(dataSynthese.statut) === 0 ? <Button action={()=>{
                    setAction(true)
                    valider()
                }}>Valider</Button> : <div>
                    <Button action={()=>{
                        devalider()
                    }}>Devalider</Button>
                    <Button action={()=>{
                        classer()
                    }}>Classer</Button>
                </div> }
                </div>}
            </div> : <span>En cours</span> }
        </div>
        
        <div className='bg-white m-4 p-4'>
            <h2 className='font-bold'>Commentaire des documents</h2>
            <ul className='list-disc pl-4'>
                {/* {commentaires['commentaires_documents'].map((comment, index)=>{
                    return (
                        <li key={index}>{comment.commentaire}</li>
                    )
                })} */}
            </ul>
        </div>
        
        <div className='bg-white m-4 p-4'>
            <h2 className='font-bold'>Commentaire des rapports de visite</h2>
            <ul className='list-disc pl-4'>
                {/* {commentaires['commentaires_rv'].map((comment, index)=>{
                    return (
                        <li key={index}>{comment.commentaire}</li>
                    )
                })} */}
            </ul>
        </div>
        
        <div className='bg-white m-4 p-4'>
            <h2 className='font-bold'>Commentaire des RICT</h2>
            <ul className='list-disc pl-4'>
                {/* {commentaires['commentaires_rict'].map((comment, index)=>{
                    return (
                        <li key={index}>{comment.commentaire}</li>
                    )
                })} */}
            </ul>
        </div>
    </>
    )
}

export default GestionSynthese