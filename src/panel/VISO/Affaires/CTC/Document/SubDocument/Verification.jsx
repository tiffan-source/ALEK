import React, { useEffect, useState } from 'react';
import Button from '../../../../../../component/utils/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus, faWindowMaximize, faCheck } from '@fortawesome/free-solid-svg-icons';
import LabelSelect from '../../../../../../component/utils/LabelSelect/LabelSelect';
import axios from 'axios';
import AddComment from '../../../../../../component/Modal/AddComment';
import moment from 'moment';
import Flash from '../../../../../../component/utils/Flash/Flash';

/**
 * Principe
 * 
 * Tous les documents non attache a aso sont eligble a etre choisis pour l'ouvrage courante afin de faire l'ASO
 * Ils sont tous d'abord non traite
 * 
 * Une fois valider plus d'avis possible a moins de devalidation
 */

function Verification(props) {

  const [document, setDocument] = useState(null);

  const [modal, setModal] = useState(false);
  const [comments, setComments] = useState([]);

  const [avis, setAvis] = useState('F');

  const [user, setuser] = useState(null);

  const [oldComments, setOldComments] = useState([]);

  const [prevAvis, setPrevAvis] = useState(null);

  const [affaireOuvrage, setAffaireOuvrage] = useState({});

  const [flash, setFlash] = useState(false);

  const [checkAsoEnCours, setCheckAsoEnCours] = useState(false);

  useEffect(()=>{
    (async()=>{
      try {
        let id = localStorage.getItem('planAffaire')
        let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/planaffaire/' + id + '/')
        let id_affaire = data.affaire;
        let {data : singleDoc} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_detail_document/${id_affaire}/${props.document}/`);
        setDocument(singleDoc);
        let {data: userResponse} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/utilisateur-connecte/`)
        setuser(userResponse.id);

        let {data: previousAvis} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/check_avis_on_document_by_collaborateur/${props.document}/${userResponse.id}/`);
        if(previousAvis.avis)
        {
          setAvis(previousAvis.avis.codification)
          setPrevAvis(previousAvis.avis)

          let {data:oldCommRes} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_comment_for_avis/${previousAvis.avis.id}/`)
          setOldComments(oldCommRes)
        }

        let {data : affOuvrRes} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_affaire_ouvrage_from_document/${props.document}/`);
        setAffaireOuvrage(affOuvrRes);

        let {data:existAso} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/check_aso_current_for_affaire_ouvrage/${affOuvrRes.id}/`)
        setCheckAsoEnCours(existAso.has_current_aso);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [props.document]);

  let enregistrer = async()=>{
    if(prevAvis)
    {
      await axios.delete(process.env.REACT_APP_STARTURIBACK + `/admin/avis/${prevAvis.id}/`)
    }

    let {data: avisResponse} = await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/avis/',
    {
      id_document : props.document,
      codification : avis,
      collaborateurs : user
    }, {withCredentials: true});

    await Promise.all(comments.map(async comment=>{
      await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/commentaire/',
      {
        id_avis : avisResponse.id,
        commentaire : comment.commentaire,
        a_suivre : comment.a_suivre
      }, {withCredentials : true});
    }));

    await Promise.all(oldComments.map(async comment=>{
      await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/commentaire/',
      {...comment, id_avis : avisResponse.id}, {withCredentials : true});
    }));

    window.location.reload()
  }

  let valider = async () => {
    let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/check_if_can_validate_affaire_ouvrage/${affaireOuvrage.id}/`);
    if(data.can_validate){
      await axios.put(process.env.REACT_APP_STARTURIBACK + `/admin/affaireouvrage/${affaireOuvrage.id}/`, {
        id_affaire : affaireOuvrage.id_affaire,
        id_ouvrage : affaireOuvrage.id_ouvrage,
        validateur : user,
      }, {withCredentials : true})

      window.location.reload();
    }else{
      setFlash(true);
    }
  }

  let devalider = async () => {
    await axios.put(process.env.REACT_APP_STARTURIBACK + `/admin/affaireouvrage/${affaireOuvrage.id}/`, {
      id_affaire : affaireOuvrage.id_affaire,
      id_ouvrage : affaireOuvrage.id_ouvrage,
      validateur : null,
    }, {withCredentials : true})

    window.location.reload()
  }

  let createAso = async () =>{
    let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/check_if_can_validate_affaire_ouvrage/${affaireOuvrage.id}/`);
    if(data.can_validate){
      await axios.put(process.env.REACT_APP_STARTURIBACK + `/admin/affaireouvrage/${affaireOuvrage.id}/`, {
        id_affaire : affaireOuvrage.id_affaire,
        id_ouvrage : affaireOuvrage.id_ouvrage,
        validateur : user,
      }, {withCredentials : true});

      await axios.post(process.env.REACT_APP_STARTURIBACK + `/admin/aso/`,
      {
        redacteur : user,
        affaireouvrage : affaireOuvrage.id,
        date : moment().format('YYYY-MM-DD')
      }, {withCredentials: true});

      window.location.reload();
    }else{
      setFlash(true)
    }
  }

  return (
    <>
        {
          modal && <AddComment
          comments={comments}
          setComments={setComments}
          avis={avis}
          handleClose={()=>{setModal(false)}}/>
        }

        {flash && <Flash setFlash={setFlash}>
          Vous ne pouvez ni valider ni creer l'ASO si tous les documents n'ont pas ete verifier.
          Enregistrer votre verification courante ou valider tous les autres documents pour l'ouvrage concerne
          </Flash>}

        <div className='m-4'>
          {props.document === null && <div className='text-sm text-red-600'>Selectioner un document</div>}
          <div className='flex justify-end'>
            <Button action={()=>{
              enregistrer()
            }}>Enregistrer</Button>
          </div>

          <div className='bg-white my-4'>
            <h2 className='bg-gray-200 text-sm p-2 shadow-inner'>Rappel Affectations</h2>
            <table className='text-sm p-2 w-full'>
              <thead>
                <tr>
                  <th className='border border-gray-600'>Emetteur</th>
                  <th className='border border-gray-600'>Nature</th>
                  <th className='border border-gray-600'>N externe</th>
                  <th className='border border-gray-600'>Indice</th>
                  <th className='border border-gray-600'>Titre</th>
                  <th className='border border-gray-600'>Ouvrage</th>
                  <th className='border border-gray-600'>Date Reception</th>
                  <th className='border border-gray-600'>N Aviso</th>
                </tr>
              </thead>
              <tbody>
                {document && <tr>
                  <td>{document.entreprise.raison_sociale}</td>
                  <td>{document.nature}</td>
                  <td>{document.numero_externe}</td>
                  <td>{document.indice}</td>
                  <td>{document.titre}</td>
                  <td>{document.ouvrage.libelle}</td>
                  <td>{document.date_reception}</td>
                  <td>{document.id}</td>
                </tr>}
              </tbody>
            </table>
            <div className='p-2'></div>
          </div>

          <div className='bg-white my-4'>
            <h2 className='bg-gray-200 text-sm p-2 shadow-inner'>Examen</h2>
            <div className='mx-8 my-2 grid grid-cols-2 gap-4'>
              <div>
                <span className='font-bold text-sm'>Emetteur : </span>
                <span>{document && document.entreprise.raison_sociale}</span>
              </div>
              <div>
                <span className='font-bold text-sm'>Ouvrage : </span>
                <span>{document && document.ouvrage.libelle}</span>
              </div>
              <LabelSelect label="Avis" value={avis} options={{
                "F" : "F",
                "RMQ" : "RMQ",
                "FA" : "FA",
                "HM" : "HM",
                "SO" : "SO",
                "VI" : "VI"
              }} onChange={(e)=>{
                if(e.target.value === 'F')
                  setComments([])

                setAvis(e.target.value)
              }}/>
              <div>
                <span className='font-bold text-sm'>Affecte par : </span>
                <span></span>
              </div>
              <div>
                <span className='font-bold text-sm'>Valide par : </span>
                <span>{affaireOuvrage.detail_validateur && (affaireOuvrage.detail_validateur.last_name + " " + affaireOuvrage.detail_validateur.first_name)}</span>
              </div>
              <div>
                <span className='font-bold text-sm'>Diffuse le : </span>
                <span></span>
              </div>
            </div>

            {document && document.aso ? <span className='mx-8 my-2 text-green-600'>Ce document a deja ete traite dans un ASO</span> : 
              <div className='mx-8 my-2'>

                {!affaireOuvrage.validateur &&
                  <Button action={()=>{
                    valider()
                  }}>Valider</Button>
                }

                {affaireOuvrage.validateur &&
                  <Button action={()=>{
                    devalider()
                  }}>Devalider</Button>
                }

                {checkAsoEnCours ?
                <span className='mx-4 text-sm text-green-600'>Un ASO est deja en cours pour cet ouvrage</span>
                :
                <Button action={()=>{
                  createAso()
                }}>Creer l'ASO</Button> }

              </div>
            }


          </div>

          <div className='bg-white my-4'>
            <h2 className='bg-gray-200 text-sm p-2 shadow-inner'>Remarques associes</h2>
            <div className='p-2'>
              <Button disabled={avis === 'F'} action={()=>{
                setModal(true)
              }}> <FontAwesomeIcon icon={faPlus} /> </Button>
              <Button> <FontAwesomeIcon icon={faList} /> </Button>
              <Button> <FontAwesomeIcon icon={faWindowMaximize} /> </Button>
            </div>
            <table className='text-sm p-2 w-full'>
              <thead>
                <tr className='grid grid-cols-[5rem_auto]'>
                  <th className='border border-gray-600'>A suivre</th>
                  <th className='border border-gray-600'>Remarque</th>
                </tr>
              </thead>
              <tbody>
                {
                  comments.map((comment, index)=>{
                    return (
                      <tr className='grid grid-cols-[5rem_auto]' key={index}>
                        <td className='my-2 flex justify-center'>{comment.a_suivre && <FontAwesomeIcon icon={faCheck}/>}</td>
                        <td className='my-2'>{comment.commentaire}</td>
                      </tr>
                    )
                  })
                }
                {
                  oldComments.map((comment, index)=>{
                    return (
                      <tr className='grid grid-cols-[5rem_auto]' key={index}>
                        <td className='my-2 flex justify-center'>{comment.a_suivre && <FontAwesomeIcon icon={faCheck}/>}</td>
                        <td className='my-2'>{comment.commentaire}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
    </>

  )
}

export default Verification