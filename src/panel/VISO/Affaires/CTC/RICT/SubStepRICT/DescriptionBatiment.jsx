import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MiniLoader from '../../../../../../component/utils/Loader/MiniLoader';

function DescriptionBatiment({rict}) {

	const [criteres, setCriteres] = useState([]);
	const [handleCheck, setHandleCheck] = useState(true);
	const [affaire, setAffaire] = useState(null);
	const [load, setLoad] = useState(true);

	useEffect(()=>{
		(async()=>{
			let {data:dataPlan} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/admin/planaffaire/${localStorage.getItem("planAffaire")}/`);
			let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_critere_for_affaire/${dataPlan.affaire}/`);
			setAffaire(dataPlan.affaire)
			setCriteres(data);
			setLoad(false)
		})()
	}, [handleCheck])

	let handleCritereSelect = async(e, critere)=>{
		if(e.target.checked){
			await axios.get(process.env.REACT_APP_STARTURIBACK + `/add_article_select_for_affaire/${affaire}/${critere.id}/`);
		}else{
			await axios.get(process.env.REACT_APP_STARTURIBACK + `/delete_article_select_for_affaire/${affaire}/${critere.id}/`);
		}

		setHandleCheck(!handleCheck);
	}

	if(load)
		return <MiniLoader/>

	return (
		<div className='p-3'>
			<div>
				<h2 className='p-4 text-2xl text-gray-400'>Description du bati</h2>
				<div className='p-4'>
					<div className='grid grid-cols-[2rem_10rem_20rem_auto] bg-gray-900 text-white'>
						<span className='p-2'></span>
						<span className='p-2'>Groupe</span>
						<span className='p-2'>Critere</span>
						<span className='p-2'>Description</span>
					</div>
					{
						criteres.filter(critere=>critere.mission===1||critere.mission===23||critere.mission===2).map((critere, index)=>{
							return (
								<div className={`grid grid-cols-[2rem_10rem_20rem_auto] ${index%2===0 ? 'bg-gray-300' : 'bg-gray-300'}`} key={index}>
									<span className='p-2'> <input type="checkbox" checked={critere.select} onChange={(e)=>{
										handleCritereSelect(e, critere);
									}}/> </span>
									<span className='p-2'>{critere.parent.titre}</span>
									<span className='p-2'>{critere.titre}</span>
									<span className='p-2'></span>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}

export default DescriptionBatiment