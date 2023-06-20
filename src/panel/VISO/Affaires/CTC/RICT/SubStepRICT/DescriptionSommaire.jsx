import React, { useEffect } from 'react'
import constante from './constante'
import Button from '../../../../../../component/utils/Button/Button'
import { useState } from 'react'
import axios from 'axios';

function DescriptionSommaire({rict}) {

    const [descriptions, setDescriptions] = useState([])

    useEffect(()=>{
        (async()=>{
            let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_desription_sommaire_by_RICT/${rict.id}/`)
            setDescriptions(data)
        })()
    }, []);

    let handleDescription = (e, type)=>{
        let descriptionIndex = descriptions.findIndex(descri=>descri.type === type)

        if(descriptionIndex === -1){
            setDescriptions([...descriptions, {
                type : type,
                content : e.target.value,
                rict : rict.id
            }])
        }else{
            setDescriptions(descriptions.map((descri, index)=>{
                if(index === descriptionIndex){
                    return {
                        ...descri,
                        content : e.target.value
                    }
                }
                return descri;
            }))
        }
    }

    let enregistrer = async ()=>{
        await Promise.all(descriptions.map(async descri=>{
            if(descri.id){
                await axios.put(process.env.REACT_APP_STARTURIBACK + `/admin/description_sommaire/${descri.id}/`, descri, {withCredentials:true})
            }else{
                await axios.post(process.env.REACT_APP_STARTURIBACK + `/admin/description_sommaire/`, descri, {withCredentials : true})
            }
        }))
    }
    
    return (
        <div className='p-4'>
            <div><Button action={()=>{
                enregistrer()
            }}>Enregistrer</Button></div>
            <div className='grid grid-cols-[20rem_auto] gap-6 bg-gray-900 text-white p-2 mt-4'>
                <div className='font-bold'>Type description</div>
                <div className='font-bold'>Description</div>
            </div>

            {constante.typeDS.map((type, index)=>{
                return (
                    <div key={index} className='grid grid-cols-[20rem_auto] my-4 gap-6'>
                        <div>{type}</div>
                        <div>
                            <textarea className='w-full border border-gray-400'
                            value={descriptions.find(descri=>descri.type === type)?.content || ""} onChange={(e)=>{
                                handleDescription(e, type)
                            }}></textarea>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default DescriptionSommaire