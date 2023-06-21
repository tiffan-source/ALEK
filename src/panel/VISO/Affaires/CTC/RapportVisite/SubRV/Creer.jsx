import React, { useEffect, useState } from 'react';
import Button from '../../../../../../component/utils/Button/Button';
import moment from 'moment';
import LabelSelect from '../../../../../../component/utils/LabelSelect/LabelSelect';
import LabelInput from '../../../../../../component/utils/LabelInput/LabelInput';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddCommentRV from '../../../../../../component/Modal/AddCommentRV';
import image from '../../../../../../assets/icon/image.png'
import MiniLoader from '../../../../../../component/utils/Loader/MiniLoader';
import Flash from '../../../../../../component/utils/Flash/Flash';

function Creer() {

    const [userConnect, setUserConnect] = useState(null);
    const [ouvrages, setOuvrages] = useState([]);
    const [ouvragesSelect, setOuvragesSelect] = useState('');
    const [avis, setAvis] = useState([]);


    const [objet, setObjet] = useState('');
    const [modal, setModal] = useState(false);
    const [affaire, setAffaire] = useState(null);
    const [load, setLoad] = useState(true);
    const [action, setAction] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState('')

    useEffect(()=>{
        (async()=>{
            try {
                let id = localStorage.getItem("planAffaire")
                let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/admin/planaffaire/${id}/`)
                let id_affaire = data.affaire;
                setAffaire(id_affaire)

                let {data:user} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/utilisateur-connecte/`);

                let {data: userDetail} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/admin/collaborateurs/${user.id}/`);

                setUserConnect(userDetail);

                let {data: ouvragRes} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_ouvrage_affaire/${id_affaire}/`)

                setOuvrages(ouvragRes);
                if(ouvragRes.length > 0){
                    setOuvragesSelect(ouvragRes[0].id);
                }

            } catch (error) {
                console.log(error);
                setErrors(error.toString())
            }

            setLoad(false)
        })();
    }, []);

    let create = async()=>{
        try {
            let {data:dataPosition} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/next_number_rv_for_affaire/${affaire}/`)

            let {data:resRv} = await axios.post(process.env.REACT_APP_STARTURIBACK + `/admin/rapport/visite/`,
            {
                date : moment().format('YYYY-MM-DD'),
                affaire : affaire,
                objet : objet,
                order_in_affaire : dataPosition.position
            }, {withCredentials : true});

            await Promise.all(avis.map(async dataAvis=>{
                let {data: resAvisOuvrage} = await axios.post(process.env.REACT_APP_STARTURIBACK + `/admin/avis_ouvrage/`,
                {
                    redacteur : userConnect.id,
                    ouvrage : dataAvis.ouvrage,
                    objet : dataAvis.objet,
                    rv : resRv.id
                }, {withCredentials :true});

                await Promise.all(dataAvis.commentaires.map(async commentaire=>{
                    let formData = new FormData();
                    formData.append('asuivre', commentaire.asuivre)
                    formData.append('commentaire', commentaire.commentaire)
                    if(commentaire.image){
                        formData.append('image', commentaire.image)
                    }
                    formData.append('avis', resAvisOuvrage.id)
                    await axios.post(process.env.REACT_APP_STARTURIBACK + `/admin/avis_commentaire/`, formData, {withCredentials : true})
                }));
            }));

            setSuccess(true)

            window.location.reload();
        } catch (error) {
            setErrors(error.toString())
        }
        
    }

    return (
        <>
            {modal && <AddCommentRV avis={avis} setAvis={setAvis} ouvrage={ouvragesSelect} handleClose={()=>{setModal(false)}}/>}
            {success && <Flash type={"success"} setFlash={setSuccess}>Rapport de visite creer avec success</Flash>}
            {errors && <Flash setFlash={setErrors}>{errors}</Flash>}
            <div>
                {!load ? <div className='bg-gray-100 my-4'>
                    <h2 className='bg-gray-300 shadow-inner px-4 py-1'>Rapport de Visite</h2>
                    <div className='grid grid-cols-2 p-4 gap-4'>
                        <div>
                            <span className='font-bold'>Date : </span>
                            <span>{moment().format('YYYY-MM-DD')}</span>
                        </div>

                        { userConnect &&
                        <div>
                            <span className='font-bold'>Redacteur : </span>
                            <span>{userConnect.last_name + " " + userConnect.first_name}</span>
                        </div> }

                        <div>
                            <span className='font-bold'>Statut : </span>
                            <span>En cours</span>
                        </div>

                        <LabelInput label="Objet" value={objet} onChange={(e)=>{
                            setObjet(e.target.value)
                        }}/>

                    </div>
                    <div className='p-4 flex justify-end'>
                        {!action ? <Button action={()=>{
                            setAction(true)
                            create()
                        }}>Creer</Button> : <span className='text-green-600'>Rapport de visite en cours de creation</span> }
                    </div>
                </div> : <MiniLoader/>}

                {!load ? <div className='bg-gray-100 my-4 pb-6'>
                    <h2 className='bg-gray-300 shadow-inner px-4 py-1'>Texte du RV</h2>
                    <div className='text-sm grid grid-cols-2 p-4 gap-4'>
                        <LabelSelect col label="Ouvrage" value={ouvragesSelect} options={ouvrages.reduce((prev, curr)=>{
                            let key = curr.ouvrage.libelle;
                            prev[key] = curr.id;
                            return prev;
                        }, {})} onChange={(e)=>{
                            setOuvragesSelect(e.target.value);
                        }}/>

                        <LabelInput label="Objet du controle" value={avis.find(data=>{return data.ouvrage == ouvragesSelect})?.objet || ""} onChange={(e)=>{
                            let avisToSet = avis.findIndex((data)=>{
                                return data.ouvrage == ouvragesSelect;
                            })
                            if(avisToSet === -1){
                                setAvis([...avis, {
                                    ouvrage : ouvragesSelect,
                                    objet : e.target.value
                                }])
                            }else{
                                setAvis(avis.map((av, index)=>{
                                    if(index === avisToSet){
                                        av.objet = e.target.value
                                    }
                                    return av;
                                }))
                            }
                        }}/>
                        <div>
                            <Button action={()=>{
                                setModal(true)
                            }}> <FontAwesomeIcon icon={faPlus}/> </Button>

                        </div>
                    </div>
                    <table className='text-sm w-full'>
                        <thead>
                            <tr className='grid grid-cols-6'>
                                <th className='col-span-1'>A suivre</th>
                                <th className='col-span-4'>Remarque</th>
                                <th className='col-span-1'>Photos</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                avis.find(data=>{return data.ouvrage == ouvragesSelect})?.commentaires?.map((comm, index)=>{
                                    return (
                                    <tr className='grid grid-cols-6' key={index}>
                                        <td className='flex justify-center col-span-1'><input type="checkbox" name="" id="" checked={comm.asuivre} disabled/></td>
                                        <td className='flex justify-center col-span-4'>{comm.commentaire}</td>
                                        <td className='flex justify-center col-span-1'>{comm.image && <img className='w-[2rem]' src={image} alt='my_default_icon'/>}</td>
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

export default Creer