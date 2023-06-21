import axios from 'axios';
import React, { useEffect, useState } from 'react'

function GestionRemarque({id}) {

	let [ouvrages, setOuvrages] = useState([])

	useEffect(()=>{
		(async()=>{
			try {
				let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/all_avis_from_RV/${id}/`);
				setOuvrages(data);
			} catch (error) {
				
			}
		})()
	}, []);

	return (
		<div className='bg-white p-4'>
			{ouvrages.map((ouvrage, index)=>{
				return (
					<div className='my-6' key={index}>
						<div>
							<span>{ouvrage.libelle}</span>
						</div>
						<table className='text-sm w-full'>
							<thead>
								<tr className='grid grid-cols-[2rem_16rem_auto]'>
									<th className='border border-gray-400'>id</th>
									<th className='border border-gray-400'>Objet de l'avis</th>
									<th className='border border-gray-400'>Commentaire</th>
								</tr>
							</thead>
							<tbody>
								{ouvrage.all_avis.map((avis, index)=>{
									return(
										<tr key={index} className='grid grid-cols-[2rem_16rem_auto]'>
											<td>{avis.id}</td>
											<td>{avis.objet}</td>
											<td>
												{avis.comments.map((comment, index)=>{
													return (
														<div key={index}>
															<input type="checkbox" disabled className='mr-4' checked={comment.asuivre} />
															<span>{comment.commentaire}</span>
														</div>
													)
												})}
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				)
			})}
		</div>
	)
}

export default GestionRemarque