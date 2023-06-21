import React, {useState, useEffect} from 'react'
import LabelSelect from '../../../../../../../component/utils/LabelSelect/LabelSelect';
import LabelInput from '../../../../../../../component/utils/LabelInput/LabelInput';
import AddCommentRV from '../../../../../../../component/Modal/AddCommentRV';
import Button from '../../../../../../../component/utils/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import image from '../../../../../../../assets/icon/image.png';
import MiniLoader from '../../../../../../../component/utils/Loader/MiniLoader';
import Flash from '../../../../../../../component/utils/Flash/Flash';

function AjouterRemarque({id}) {
	const [avis, setAvis] = useState([]);
	const [ouvrages, setOuvrages] = useState([]);
    const [ouvragesSelect, setOuvragesSelect] = useState('');
	const [modal, setModal] = useState(false);
    const [load, setLoad] = useState(true);
    const [errors, setErrors] = useState('');
    const [userConnect, setUserConnect] = useState(null);
	const [success, setSuccess] = useState(false);
    const [action, setAction] = useState(false);

	let enregistrer = async()=>{
		try {
            await Promise.all(avis.map(async dataAvis=>{
                let {data: resAvisOuvrage} = await axios.post(process.env.REACT_APP_STARTURIBACK + `/admin/avis_ouvrage/`,
                {
                    redacteur : userConnect.id,
                    ouvrage : dataAvis.ouvrage,
                    objet : dataAvis.objet,
                    rv : id
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
            setErrors(error.toString());
			setAction(false);
        }
        
	}

    useEffect(()=>{
        (async()=>{
            try {
                let id = localStorage.getItem("planAffaire")
                let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/admin/planaffaire/${id}/`)
                let id_affaire = data.affaire;

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

	if(load)
		return <MiniLoader/>

	return (
	<div className='bg-gray-100 my-4 pb-6'>
		{modal && <AddCommentRV avis={avis} setAvis={setAvis} ouvrage={ouvragesSelect} handleClose={()=>{setModal(false)}}/>}
		{success && <Flash type={"success"} setFlash={setSuccess}>Avis ajouter avec success</Flash>}
		{errors && <Flash setFlash={setErrors}>{errors}</Flash>}

		<div className='bg-white px-4'>
			{!action ? <Button action={()=>{
				setAction(true)
				enregistrer()
			}}>Enregistrer</Button> : <span className='text-orange-600'>Avis en cours d'ajout</span> }
		</div>

		<div className='text-sm grid grid-cols-2 p-4 gap-4 bg-white'>
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
		<table className='text-sm w-full bg-white'>
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
	</div>
	)
}

export default AjouterRemarque