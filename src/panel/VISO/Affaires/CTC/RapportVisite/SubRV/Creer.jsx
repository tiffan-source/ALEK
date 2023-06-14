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

function Creer() {

    const [options, setOptions] = useState({})
    const [optionsSelect, setOptionsSelect] = useState(null)
    const [objet, setObjet] = useState('');
    const [objet_control, setObjet_control] = useState('');
    const [modal, setModal] = useState(false);
    const [commentaire, setCommentaire] = useState([]);
    const [ouvrages, setOuvrages] = useState([]);
    const [ouvragesSelect, setOuvragesSelect] = useState([]);
    const [affaire, setAffaire] = useState(null);

    useEffect(()=>{
        (async()=>{
            try {
                let id = localStorage.getItem("planAffaire")
                let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/admin/planaffaire/${id}/`)
                let id_affaire = data.affaire;
                setAffaire(id_affaire)

                let {data: intervenantRes} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/all_intervenant/${id_affaire}/`)
                let {data: charge} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/find_charge_affaire_for_affaire/${id_affaire}/`)

                let for_option = {}
                for_option[charge.nom + " " + charge.prenom] = charge.id;
                setOptionsSelect(charge.id);

                intervenantRes.forEach(element => {
                    for_option[element.nom + " " + element.prenom] = element.id
                });

                setOptions(for_option);

                let {data: ouvragRes} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_ouvrage_affaire/${id_affaire}/`)

                setOuvrages(ouvragRes);
                if(ouvragRes.length > 0){
                    setOuvragesSelect(ouvragRes[0].id);
                }

            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    let create = async()=>{
        let {data : avisRes} = await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/avis_ouvrage/',
        {
            ouvrage : ouvragesSelect,
            objet : objet_control
        }, {withCredentials:true});

        await Promise.all(commentaire.map(async com=>{
            let form = new FormData()
            form.append('asuivre', com.a_suivre)
            form.append('commentaire', com.commentaire)
            form.append('image', com.image)
            form.append('avis', avisRes.id)
            await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/avis_commentaire/',
            form, {withCredentials:true})
        }));

        await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/rapport/visite/',
        {
            date : moment().format('YYYY-MM-DD'),
            redacteur : optionsSelect,
            affaire : affaire,
            objet : objet
        });

        window.location.reload();
    }

    return (
        <>
            {modal && <AddCommentRV commentaire={commentaire} setCommentaire={setCommentaire} handleClose={()=>{setModal(false)}}/>}
            <div>
                <div className='bg-white my-4'>
                    <h2 className='bg-gray-300 shadow-inner px-4 py-1'>Rapport de Visite</h2>
                    <div className='text-sm grid grid-cols-2 p-4 gap-4'>
                        <div>
                            <span>Date : </span>
                            <span>{moment().format('YYYY-MM-DD')}</span>
                        </div>
                        <LabelSelect label="Responsable d'affaire / Redacteur : " value={optionsSelect} options={options}
                        onChange={(e)=>{
                            setOptionsSelect(e.target.value)
                        }}/>

                        <div>
                            <span>Statut : </span>
                            <span>En cours</span>
                        </div>

                        <LabelInput label="objet" value={objet} onChange={(e)=>{
                            setObjet(e.target.value)
                        }}/>

                    </div>
                    <div className='p-4 flex justify-end'>
                        <Button action={()=>{
                            create()
                        }}>Creer</Button>
                    </div>
                </div>

                <div className='bg-white my-4 pb-6'>
                    <h2 className='bg-gray-300 shadow-inner px-4 py-1'>Texte du RV</h2>
                    <div className='text-sm grid grid-cols-2 p-4 gap-4'>
                        <LabelSelect label="Ouvrage" value={ouvragesSelect} options={ouvrages.reduce((prev, curr)=>{
                            let key = curr.ouvrage.libelle;
                            prev[key] = curr.id;
                            return prev;
                        }, {})} onChange={(e)=>{
                            setOuvragesSelect(e.target.value);
                        }}/>

                        <LabelInput label="objet du controle" value={objet_control} onChange={(e)=>{
                            setObjet_control(e.target.value)
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
                            {commentaire.map(comm=>{
                                return (
                                <tr className='grid grid-cols-6'>
                                    <td className='flex justify-center col-span-1'><input type="checkbox" name="" id="" checked={comm.a_suivre} /></td>
                                    <td className='flex justify-center col-span-4'>{comm.commentaire}</td>
                                    <td className='flex justify-center col-span-1'>{comm.image && <img className='w-[2rem]' src={image} alt='my_default_icon'/>}</td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}

export default Creer