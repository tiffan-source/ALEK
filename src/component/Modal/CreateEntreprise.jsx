import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import LabelInput from '../utils/LabelInput/LabelInput';
import Adresse from '../Adresse/Adresse';
import Button from '../utils/Button/Button';
import axios from 'axios';
import Flash from '../utils/Flash/Flash';
import validator from 'validator';

function CreateEntreprise(props) {
    
    const [stringErrors, setStringError] = useState("");
    const [flash, setFlash] = useState(false);
    const [success, setSuccess] = useState(false)
  
    const [lines, setLines] = useState([]);
    const [newLine, setNewLine] = useState({
        nom : "",
        prenom : "",
        email : ""
    });
    const [entreprise, setEntrepise] = useState({
        raison_sociale : "",
        activite : "",
        siret: ""
    });
    const [adress, setAdress] = useState({
        cplt_geo : "",
        numero_voie : "",
        lieu_dit : "",
        code_postal : "",
        ville : "",
        pays : "",
        departement : "",
        province : "",
    });

    useEffect(()=>{
        (async()=>{
            if(props.edition){
                let {data:entreprise} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/entreprise_and_responsable/${props.edition}/`);
                setEntrepise({
                    id : entreprise.id,
                    raison_sociale : entreprise.raison_sociale,
                    activite : entreprise.activite,
                    siret : entreprise.siret.toString()
                });
                setAdress(entreprise.adresse)
                setLines(entreprise.responsables)
            }
        })();
    }, [props.edition]);

    let validate = ()=>{
        let {cplt_geo, numero_voie, lieu_dit, code_postal, ville, pays, departement, province} = adress;
        let {raison_sociale, activite, siret} = entreprise;
        if(validator.isEmpty(raison_sociale)){
          setStringError('Entrez une raison sociale')
          return;
        }
        if(validator.isEmpty(activite)){
          setStringError('Entrez une activite')
          return;
        }
        if(validator.isEmpty(siret) || !validator.isNumeric(siret)){
          setStringError('Entrez un siret valid')
          return;
        }
        if(validator.isEmpty(cplt_geo)){
          setStringError('Entrez une adresse')
          return;
        }
        if(validator.isEmpty(numero_voie) || !validator.isNumeric(numero_voie)){
          setStringError('Entrez un numero de voie valide')
          return;
        }
        if(validator.isEmpty(lieu_dit)){
          setStringError('Entrez un lieu dit')
          return;
        }
        if(validator.isEmpty(code_postal) || !validator.isPostalCode(code_postal, 'FR')){
          setStringError('Entrez un code postal valid')
          return;
        }
        if(validator.isEmpty(ville)){
          setStringError('Entrez une ville valide')
          return;
        }
        if(validator.isEmpty(pays)){
          setStringError('Entrez un pays')
          return;
        }
        if(validator.isEmpty(departement)){
          setStringError('Entrez un departement')
          return;
        }
        if(validator.isEmpty(province)){
          setStringError('Entrez une province')
          return;
        }
        setStringError('');
    }


    useEffect(()=>{
        validate()
    }, [entreprise, adress])

    let createEntreprise = async () => {
        try {
            let resAdresse, resEntreprise;

            if(props.edition){
                resAdresse = await axios.put(process.env.REACT_APP_STARTURIBACK + `/admin/adresse/${adress.id}/`,
                adress, {withCredentials : true});
            }else{
                resAdresse = await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/adresse/',
                adress, {withCredentials : true});
            }

            if(props.edition){
                resEntreprise = await axios.put(process.env.REACT_APP_STARTURIBACK + `/admin/entreprise/${props.edition}/`,
                {...entreprise, adresse : resAdresse.data.id}, {withCredentials : true});                    
            }else{
                resEntreprise = await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/entreprise/',
                {...entreprise, adresse : resAdresse.data.id}, {withCredentials : true});                    
            }

            await Promise.all(lines.map(async line=>{
                if(!line.id){
                    await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/responsable/',
                    {...line, entreprise : resEntreprise.data.id}, {withCredentials: true})    
                }
            }));

            if(props.isCollab && !props.edition){
                let id = localStorage.getItem('planAffaire')
                let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/planaffaire/' + id + '/')
                let id_affaire = data.affaire;

                await axios.post(process.env.REACT_APP_STARTURIBACK + '/admin/entreprise_affaire/', 
                {
                    entreprise : resEntreprise.data.id,
                    affaire : id_affaire
                }, {withCredentials: true})
            }

            setSuccess(true);

            setTimeout(()=>{
                window.location.reload();
            }, 3000)
        } catch (error) {
        }
    }

    return (
    <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto h-full flex justify-center items-center bg-[#000a]">
        <div className="relative w-full max-w-4xl max-h-full">
            <div className="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700 text-sm">
                <div className='flex justify-between items-center pr-6'>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white p-6">
                        Assistant de création d'une entreprise
                    </h3>
                    <span className='text-xl cursor-pointer' onClick={()=>{
                        props.close()
                    }}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </span>
                </div>
                <div className="p-2">
                    <div className='ml-4'>
                        <Button action={()=>{
                            if(!stringErrors && success === false){
                                createEntreprise();
                                setFlash(false);
                            }else{
                                setFlash(true);
                            }
                        }}>{props.edition ? 'Editer' : 'Creer'}</Button>
                    </div>
                    <div className='bg-gray-100 m-4'>
                        <h2 className='p-2 bg-gray-200 shadow-inner'>Details Entrepise</h2>
                        <div className='grid grid-cols-2 gap-4 mx-4'>
                            <LabelInput label_w="10" label="Raison Sociale" value={entreprise.raison_sociale} onChange={(e)=>{
                                setEntrepise({...entreprise, raison_sociale : e.target.value})
                            }}/>
                            <LabelInput label_w="10" label="Siret" value={entreprise.siret} onChange={(e)=>{
                                setEntrepise({...entreprise, siret : e.target.value})
                            }}/>
                            <LabelInput label_w="10" label="Activite" value={entreprise.activite} onChange={(e)=>{
                                setEntrepise({...entreprise, activite : e.target.value})
                            }}/>
                        </div>
                    </div>
                    <div className='bg-gray-100 m-4'>
                        <h2 className='p-2 bg-gray-200 shadow-inner'>Adresse</h2>
                        <Adresse adress={adress} setAdress={setAdress}/>
                    </div>
                    <div className='bg-gray-100 m-4'>
                        <h2 className='p-2 bg-gray-200 shadow-inner'>Media de communication</h2>
                        <div className='p-4'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='text-start'>Nom</th>
                                        <th className='text-start'>Prenom</th>
                                        <th className='text-start'>Email</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className=''><input type="text" value={newLine.nom}
                                        onChange={(e)=>{
                                            setNewLine({...newLine, nom : e.target.value})
                                        }}/></td>
                                        <td className=''><input type="text" value={newLine.prenom}
                                        onChange={(e)=>{
                                            setNewLine({...newLine, prenom : e.target.value})
                                        }}/></td>
                                        <td className=''><input type="email" value={newLine.email}
                                        onChange={(e)=>{
                                            setNewLine({...newLine, email : e.target.value})
                                        }}/></td>
                                        <td className='text-center'>
                                            <Button action={()=>{
                                                let {nom, prenom, email} = newLine
                                                if(nom && prenom && email && validator.isEmail(email)){
                                                    setLines([...lines, newLine]);
                                                    setNewLine({
                                                        nom : "",
                                                        prenom : "",
                                                        email : ""
                                                    })     ;
                                                    setFlash(false);                                           
                                                }else{
                                                    if(nom || prenom || email){
                                                        setStringError('Les informations renseigne sur le responsable semblent etre incorrect');
                                                        setFlash(true)    
                                                    }
                                                }
                                            }}><FontAwesomeIcon icon={faPlus}/></Button>
                                        </td>
                                    </tr>
                                    {lines.map((line, index)=>(
                                        <tr key={index}>
                                            <td className='text-center'>{line.nom}</td>
                                            <td className='text-center'>{line.prenom}</td>
                                            <td className='text-center'>{line.email}</td>
                                            <td className='text-center'>
                                                <Button action={async()=>{
                                                    if(line.id){
                                                        await axios.delete(process.env.REACT_APP_STARTURIBACK + `/admin/responsable/${line.id}/`)
                                                    }
                                                    setLines(lines.filter((l,i)=>i!==index))
                                                }}><FontAwesomeIcon icon={faTrash}/></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {flash && <Flash setFlash={setFlash}>{stringErrors}</Flash>}
                {success && <Flash setFlash={setSuccess} type='success'>{props.edition ? 'Entreprise editer' : 'Entreprise creer avec success'}</Flash>}
            </div>
        </div>
    </div>
  )
}

export default CreateEntreprise