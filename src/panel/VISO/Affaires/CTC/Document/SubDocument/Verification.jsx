import React, { useEffect, useState } from 'react';
import Button from '../../../../../../component/utils/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus, faWindowMaximize, faCheck } from '@fortawesome/free-solid-svg-icons';
import LabelSelect from '../../../../../../component/utils/LabelSelect/LabelSelect';
import axios from 'axios';
import AddComment from '../../../../../../component/Modal/AddComment';
import Flash from '../../../../../../component/utils/Flash/Flash';
import MiniLoader from '../../../../../../component/utils/Loader/MiniLoader';
import moment from 'moment';

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

  const [load, setLoad] = useState(true);

  const [codification, setCodification] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [action, setAction] = useState(false);
  const [authorize, setAuthorize] = useState(false);

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

        let {data: userOnDoc} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_collaborateur_affect_on_document/${props.document}/`)

        let canVerif = userOnDoc.includes(userResponse.id)
        setAuthorize(canVerif)

        if(canVerif){
          let {data: previousAvis} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/check_avis_on_document_by_collaborateur/${props.document}/${userResponse.id}/`);
          if(previousAvis.avis)
          {
            setAvis(previousAvis.avis.codification)
            setPrevAvis(previousAvis.avis)
  
            let {data:oldCommRes} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_comment_for_avis/${previousAvis.avis.id}/`)
            setOldComments(oldCommRes)
          }
  
          let {data: resCodif} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/documents/avis/${props.document}/`);
          setCodification(resCodif.codification);
        }

      } catch (error) {
        console.log(error);
      }

      setLoad(false);
    })();
  }, [props.document]);

  let enregistrer = async()=>{
    if(!action){
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
      setAction(false)
      setSuccess(true);
      window.location.reload()
    }
  }

  let valider = async () => {
    if(!action){
      if(codification){
        await axios.put(process.env.REACT_APP_STARTURIBACK + `/admin/documents/${document.id}/`, {
          ...document, validateur : user
        }, {withCredentials : true})
        setSuccess(true);
        window.location.reload();
      }
      else{
        setError("Ce document n'a pas encore recu d'avis");
      }

      setAction(false)
    }
  }

  let devalider = async () => {
    if(!action){
      if(document.aso){
        setError("Retirer le document de son ASO avant de le devalide");
        return;
      }
  
      await axios.put(process.env.REACT_APP_STARTURIBACK + `/admin/documents/${document.id}/`, {
        ...document, validateur : null
      }, {withCredentials : true})
      setSuccess(true);

      window.location.reload()
      setAction(false)

    }
  }

  let attacherAso = async () =>{
    if(!action){
      if(codification){
        let {data : affOuvrRes} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_affaire_ouvrage_from_document/${props.document}/`);
    
        let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/check_aso_current_for_affaire_ouvrage/${affOuvrRes.id}/`)
  
        if(data){
          console.log(data);
        }else{
          let {data:numberAsoRes} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/next_number_aso_for_affaire/${affOuvrRes.id_affaire}/`);
          console.log(numberAsoRes);
          let res = await axios.post(process.env.REACT_APP_STARTURIBACK + `/admin/aso/`, {
            date : moment().format('YYYY-MM-DD'),
            redacteur : user,
            affaireouvrage : affOuvrRes.id,
            order_in_affaire : numberAsoRes.position
          }, {withCredentials: true});

          data = res.data
        }
  
        await axios.put(process.env.REACT_APP_STARTURIBACK + `/admin/documents/${document.id}/`, {
          ...document, validateur : user, aso : data.id
        }, {withCredentials : true});
        setSuccess(true);

        window.location.reload()
      }else{
        setError("Ce document n'a pas encore recu d'avis")
      }
      setAction(false)

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

        <div className='m-4'>
          {props.document === null && <div className='text-sm text-red-600'>Selectioner un document</div>}
          {action && <span>Operation en cours</span>}
          {error && <Flash setFlash={setError}>{error}</Flash>}
          {success && <Flash type={"success"} setFlash={setSuccess}>Operation reussie</Flash>}
          <div className='flex justify-end'>
            {!load  ? (authorize && <Button action={()=>{
              setAction(true)
              enregistrer()
            }}>Enregistrer</Button>) : <MiniLoader/>}
          </div>

          <div className='bg-white my-4'>
            <h2 className='bg-gray-300 text-sm p-2 shadow-inner'>Rappel Affectations</h2>
            {!load ? <table className='text-sm p-2 w-full'>
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
            </table> : <MiniLoader/>}
            <div className='p-2'></div>
          </div>

          {authorize ? <div className='bg-white my-4'>
            <h2 className='bg-gray-300 text-sm p-2 shadow-inner'>Examen</h2>
            {!load ? <div className='mx-8 my-2 grid grid-cols-2 gap-4'>
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
                "HM" : "HM",
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
                <span>{document.validateur && (document.validateur.first_name + " " + document.validateur.last_name)}</span>
              </div>
              <div>
                <span className='font-bold text-sm'>Diffuse le : </span>
                <span></span>
              </div>
            </div> : <MiniLoader/>}

            {document && (document.aso ? <span className='mx-8 my-2 text-green-600'>Ce document a deja ete traite dans un ASO</span> : 
              <div className='mx-8 my-2'>
                {!document.validateur ? <div>
                  <Button action={()=>{
                    setAction(true)
                    valider()
                  }}>Valider</Button>
                  <Button action={()=>{
                    setAction(true)
                    attacherAso()
                  }}>Valider et attacher a l'ASO</Button>
                </div> : <Button action={()=>{
                  setAction(true)
                  devalider()
                }}>Devalider</Button> }
              </div>)
            }


          </div> : <div className='border border-red-600 bg-red-100 p-2 rounded-lg text-red-600'>Vous n'etes pas affecter au document</div>}

          {!load ? <div className='bg-white my-4'>
            <h2 className='bg-gray-300 text-sm p-2 shadow-inner'>Remarques associes</h2>
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
          </div> : <MiniLoader/>}
        </div>
    </>

  )
}

export default Verification