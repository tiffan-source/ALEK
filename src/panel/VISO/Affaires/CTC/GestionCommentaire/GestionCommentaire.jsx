import React, { useEffect, useState } from 'react';
import Flash from '../../../../../component/utils/Flash/Flash';
import Button from '../../../../../component/utils/Button/Button';

function GestionCommentaire() {
	const [errors, setErrors] = useState(false);
	const [success, setSuccess] = useState(false);
	const [action, setAction] = useState(false);
	const [load, setLoad] = useState(true);

	useEffect(()=>{
		(async()=>{
			// Je veux recuperer tous les commentaires des livrables classer de maniere catgorise
			
		})();
	}, []);

	return (
	<div className='w-full h-full'>
		{errors && <Flash setFlash={setErrors}>{errors}</Flash>}
		{success && <Flash type="success" setFlash={setSuccess}>Synthese d'avis cree avec success</Flash>}
		<h1 className='border-t border-gray-400 p-1 bg-green-200 font-bold'>ALEATEK</h1>
		<nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
			<h2 className='text-blue-800 flex items-center'>
			<img src={advice} alt="OilPump" className='w-[2rem]'/>
			Synhese des avis
			</h2>
		</nav>
	</div>
	)
}

export default GestionCommentaire