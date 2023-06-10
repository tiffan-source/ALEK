import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from '../../../../../../../component/utils/Button/Button';

function ListDiffusion({id}) {

    const [diffusions, setDiffusions] = useState([]);
    const [ouvrageDiffusion, setOuvrageDiffusion] = useState(false);

    useEffect(()=>{
        (async()=>{
            let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/all_entreprise_concerne_by_aso/${id}/`);
            let {data: affaireOuvrage} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/affaire_ouvrage_concerne_by_aso/${id}/`)
            setDiffusions(data);
            setOuvrageDiffusion(affaireOuvrage.diffusion)
        })();
    }, []);

    return (
        <>
            <div className='my-4 text-end mx-4'><Button>Enregistrer</Button> </div>
            <table className='w-full'>
                <thead>
                    <tr className='grid grid-cols-[3rem_15rem_12rem_12rem_auto]'>
                        <th className='border border-gray-400'></th>
                        <th className='border border-gray-400'>Raison Sociale</th>
                        <th className='border border-gray-400'>Siret</th>
                        <th className='border border-gray-400'>Activite</th>
                        <th className='border border-gray-400'>Liste des emails</th>
                    </tr>
                </thead>
                <tbody>
                    {diffusions.map((diffusion, index)=>{
                        return (
                            <tr className='grid grid-cols-[3rem_15rem_12rem_12rem_auto]' key={index}>
                                <td className='text-center'> <input type="checkbox" name="" id="" checked={diffusion.diffusion || ouvrageDiffusion} /> </td>
                                <td> {diffusion.detail_entreprise.raison_sociale} </td>
                                <td>{diffusion.detail_entreprise.siret}</td>
                                <td>{diffusion.detail_entreprise.activite}</td>
                                <td className='flex flex-col'>{diffusion.responsables.map((respo, index)=>{
                                    return <span key={index}>{respo.email}</span>
                                })}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        
        </>
    )
}

export default ListDiffusion