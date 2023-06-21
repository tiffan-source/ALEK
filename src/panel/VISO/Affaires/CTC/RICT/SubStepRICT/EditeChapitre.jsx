import React, { useEffect, useState } from 'react'
import Button from '../../../../../../component/utils/Button/Button'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import AddCommentAvisArticle from '../../../../../../component/Modal/AddCommentAvisArticle'
import MiniLoader from '../../../../../../component/utils/Loader/MiniLoader'
import Flash from '../../../../../../component/utils/Flash/Flash'

function EditeChapitre({chapitre, retour, rict}) {

    const [articles, setArticles] = useState([]);
    const [affaire, setAffaire] = useState(null);

    const [dispositions, setDispositions] = useState([]);
    const [avis, setAvis] = useState([]);
    const [articleSelect, setArticleSelect] = useState(null);
    const [load, setLoad] = useState(true);
    const [action, setAction] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState(false);

    useEffect(()=>{
        (async ()=>{
            let i;
            let {data:dataAffaire} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/admin/planaffaire/${localStorage.getItem("planAffaire")}/`);
            setAffaire(dataAffaire.affaire)
            
            let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_article_for_mission/${chapitre.chapitre.id}/${dataAffaire.affaire}/`);
            
            data = data.map(article=>{
                for (i = 0; i < article.childs.length; i++) {
                    article.childs[i].depli = false
                }
                return article
            })
            
            setArticles(data);

            let {data:dataDispo} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_disposition_by_RICT_and_mission/${rict.id}/${chapitre.chapitre.id}/`);
            setDispositions(dataDispo)

            let {data:dataAvis} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_avis_by_RICT_and_mission/${rict.id}/${chapitre.chapitre.id}/`)
            setAvis(dataAvis)

            setLoad(false)
        })()
    }, [chapitre]);
    
    let enregistrer = async()=>{
        try {
            await Promise.all(dispositions.map(async dispo=>{
                if(dispo.id){
                    await axios.put(process.env.REACT_APP_STARTURIBACK + `/admin/disposition/${dispo.id}/`,
                    dispo, {withCredentials: true})
                }else{
                    await axios.post(process.env.REACT_APP_STARTURIBACK + `/admin/disposition/`,
                    dispo, {withCredentials: true})
                }
            }));
    
            await Promise.all(avis.map(async avis=>{
                if(avis.id){
                    if(avis.codification !== "false"){
                        await axios.put(process.env.REACT_APP_STARTURIBACK + `/admin/avis_article/${avis.id}/`,
                        avis, {withCredentials: true})
    
                        await Promise.all(avis.commentaires.map(async commentaire=>{
                            if(!commentaire.id){
                                await axios.post(process.env.REACT_APP_STARTURIBACK + `/admin/commentaire_avis_article/`,
                                {...commentaire, id_avis : avis.id})
                            }
                        }))
                    }else{
                        await axios.delete(process.env.REACT_APP_STARTURIBACK + `/admin/avis_article/${avis.id}/`, {withCredentials: true})    
                    }
                }else{
                    if(avis.codification !== "false"){
                        let {data} = await axios.post(process.env.REACT_APP_STARTURIBACK + `/admin/avis_article/`,
                        avis, {withCredentials: true})
                        
                        await Promise.all(avis.commentaires.map(async commentaire=>{
                            if(!commentaire.id){
                                await axios.post(process.env.REACT_APP_STARTURIBACK + `/admin/commentaire_avis_article/`,
                                {...commentaire, id_avis : data.id})
                            }
                        }))
                    }
                }
            }));
            setSuccess(true)
            window.location.reload()
            
        } catch (error) {
            setErrors(error.toString())
            setAction(false)
        }
    }

    let handleAvis = (e, article)=>{
        let indexAvis = avis.findIndex(avis=>article.id===avis.article)

        if(indexAvis === -1){
            setAvis([...avis, {
                rict : rict.id,
                article : article.id,
                codification : e.target.value,
                commentaires : []
            }])
        }else{
            setAvis(avis.map((avis, index)=>{
                if(index === indexAvis){
                    return {
                        ...avis,
                        codification : e.target.value
                    }
                }
                return avis
            }))
        }
    }

    let handleDisposition = (e, article)=>{
        let indexDispo = dispositions.findIndex(dispo=>article.id===dispo.article)

        if(indexDispo === -1){
            setDispositions([...dispositions, {
                rict : rict.id,
                article : article.id,
                commentaire : e.target.value
            }])
        }else{
            setDispositions(dispositions.map((dispo, index)=>{
                if(index === indexDispo){
                    return {
                        ...dispo,
                        commentaire : e.target.value
                    }
                }
                return dispo
            }))
        }
    }

    if(load)
        return <MiniLoader/>

    return (
        <div>
            {success && <Flash type={"success"} setFlash={setSuccess}>Operation reussie</Flash> }
            {articleSelect && <AddCommentAvisArticle handleClose={()=>{setArticleSelect(null)}} avis={avis} setAvis={setAvis} article={articleSelect}/>}
            {errors && <Flash setFlash={setErrors}>{errors}</Flash>}
            <div>
                <Button action={()=>{retour()}}>Retour</Button>
                {!action ? <Button action={()=>{
                    setAction(true)
                    enregistrer()
                }}>Valider</Button> : <span className='text-green-600'>Opertation en cours de traitement</span> }
            </div>
            <div className='mt-6'>
                {/* En tete du systeme */}
                <div className='grid grid-cols-[30rem_16rem_auto_8rem]'>
                    <span className='border border-gray-400'>Referentiel</span>
                    <span className='border border-gray-400'>Disposition prevues</span>
                    <span className='border border-gray-400'>Avis/Remarques</span>
                    <span className='border border-gray-400'>Commentaires</span>
                </div>

                {/* Corps du systeme */}
                <div className='relative'>
                {articles.map((article, index)=>{
                    return (
                        // Premier niveau
                        <div key={index}>
                            <div className='grid grid-cols-[30rem_16rem_auto_8rem]'>
                                <div className='inline-block'>{article.parent.titre}</div>
                                <div className='inline-block p-3'>
                                    <textarea className='w-full border border-gray-600' type="text" onChange={(e)=>{handleDisposition(e, article.parent)}}
                                    value={dispositions.find(dispo=>dispo.article===article.parent.id)?.commentaire || ""}></textarea>
                                </div>
                                <div className='inline-block p-3'>
                                    <div className='text-sm flex gap-6'>
                                        <select name="" id="" className='bg-white border border-gray-500' onChange={(e)=>{handleAvis(e, article.parent)}}
                                        value={avis.find(avis=>avis.article===article.parent.id)?.codification || ""}>
                                            <option value={false}>Aucun</option>
                                            <option value="F">F</option>
                                            <option value="RMQ">RMQ</option>
                                            <option value="SO">SO</option>
                                            <option value="IM">IM</option>
                                            <option value="HM">HM</option>
                                        </select>
                                        <Button action={()=>{
                                            setArticleSelect(article.parent)
                                        }}> <FontAwesomeIcon icon={faPlus}/> </Button>
                                    </div>
                                    <div>
                                        {avis.find(avis=>avis.article===article.parent.id)?.commentaires.map((commentaire, index)=>{
                                            return (
                                                <div key={index} className='text-sm p-1 bg-cyan-50 my-2 flex gap-4'>
                                                    <input type="checkbox" disabled checked={commentaire.a_suivre}/>
                                                    <pre className='text-gray-800'>{commentaire.commentaire}</pre>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                                <div className='inline-block'></div>
                            </div>
                            {article.childs.map((child, index)=>{
                                // Deuxieme niveau
                                return (
                                    <div key={index}>
                                        <div className='grid grid-cols-[30rem_16rem_auto_8rem]'>
                                            <div className='inline-block pl-4'>
                                                <span className='mr-2 cursor-pointer' onClick={()=>{
                                                    setArticles(articles.map(art=>{
                                                        let index = art.childs.findIndex(chil=>chil.parent.id===child.parent.id)
                                                        if(index !== -1)
                                                            art.childs[index].depli = !art.childs[index].depli
                                                        return art;
                                                    }
                                                ))}}>
                                                    {child.depli ? 
                                                    <FontAwesomeIcon icon={faCaretDown}/> :
                                                    <FontAwesomeIcon icon={faCaretRight}/>}
                                                </span>
                                                {child.parent.titre}
                                            </div>
                                            <div className='inline-block p-3'>
                                                <textarea className='w-full border border-gray-600' type="text" onChange={(e)=>{handleDisposition(e, child.parent)}}
                                                value={dispositions.find(dispo=>dispo.article===child.parent.id)?.commentaire || ""}></textarea>
                                            </div>
                                            <div className='inline-block p-3'>
                                                <div className='text-sm flex gap-6'>
                                                    <select name="" id="" className='bg-white border border-gray-500' onChange={(e)=>{handleAvis(e, child.parent)}}
                                                    value={avis.find(avis=>avis.article===child.parent.id)?.codification || ""}>
                                                        <option value={false}>Aucun</option>
                                                        <option value="F">F</option>
                                                        <option value="RMQ">RMQ</option>
                                                        <option value="SO">SO</option>
                                                        <option value="IM">IM</option>
                                                        <option value="HM">HM</option>
                                                    </select>
                                                    <Button action={()=>{
                                                        setArticleSelect(child.parent)
                                                    }}> <FontAwesomeIcon icon={faPlus}/> </Button>
                                                </div>
                                                <div>
                                                    {avis.find(avis=>avis.article===child.parent.id)?.commentaires.map((commentaire, index)=>{
                                                        return (
                                                            <div key={index} className='text-sm p-1 bg-cyan-50 my-2 flex gap-4'>
                                                                <input type="checkbox" disabled checked={commentaire.a_suivre}/>
                                                                <pre className='text-gray-800'>{commentaire.commentaire}</pre>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <div className='inline-block'></div>
                                        </div>
                                        {child.depli && child.childs.map((child, index)=>{
                                            // Troisieme niveau
                                            return (
                                                <div key={index}>
                                                    <div className='grid grid-cols-[30rem_16rem_auto_8rem]'>
                                                        <div className='inline-block pl-8'>{child.parent.titre}</div>
                                                        <div className='inline-block p-3'>
                                                            <textarea className='w-full border border-gray-600' type="text" onChange={(e)=>{handleDisposition(e, child.parent)}}
                                                            value={dispositions.find(dispo=>dispo.article===child.parent.id)?.commentaire || ""}></textarea>
                                                        </div>
                                                        <div className='inline-block p-3'>
                                                            <div className='text-sm flex gap-6'>
                                                                <select name="" id="" className='bg-white border border-gray-500' onChange={(e)=>{handleAvis(e, child.parent)}}
                                                                value={avis.find(avis=>avis.article===child.parent.id)?.codification || ""}>
                                                                    <option value={false}>Aucun</option>
                                                                    <option value="F">F</option>
                                                                    <option value="RMQ">RMQ</option>
                                                                    <option value="SO">SO</option>
                                                                    <option value="IM">IM</option>
                                                                    <option value="HM">HM</option>
                                                                </select>
                                                                <Button action={()=>{
                                                                    setArticleSelect(child.parent)
                                                                }}> <FontAwesomeIcon icon={faPlus}/> </Button>
                                                            </div>
                                                            <div>
                                                                {avis.find(avis=>avis.article===child.parent.id)?.commentaires.map((commentaire, index)=>{
                                                                    return (
                                                                        <div key={index} className='text-sm p-1 bg-cyan-50 my-2 flex gap-4'>
                                                                            <input type="checkbox" disabled checked={commentaire.a_suivre}/>
                                                                            <pre className='text-gray-800'>{commentaire.commentaire}</pre>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div className='inline-block'></div>
                                                    </div>
                                                    {child.childs.map((child, index)=>{
                                                        // Quatrieme niveau
                                                        return (
                                                            <div key={index} className='grid grid-cols-[30rem_16rem_auto_8rem]'>
                                                                <div className='inline-block pl-12'>{child.parent.titre}</div>
                                                                <div className='inline-block p-3'>
                                                                    <textarea className='w-full border border-gray-600' type="text" onChange={(e)=>{handleDisposition(e, child.parent)}}
                                                                    value={dispositions.find(dispo=>dispo.article===child.parent.id)?.commentaire || ""}></textarea>
                                                                </div>
                                                                <div className='inline-block p-3'>
                                                                    <div className='text-sm flex gap-6'>
                                                                        <select name="" id="" className='bg-white border border-gray-500' onChange={(e)=>{handleAvis(e, child.parent)}}
                                                                        value={avis.find(avis=>avis.article===child.parent.id)?.codification || ""}>
                                                                            <option value={false}>Aucun</option>
                                                                            <option value="F">F</option>
                                                                            <option value="RMQ">RMQ</option>
                                                                            <option value="SO">SO</option>
                                                                            <option value="IM">IM</option>
                                                                            <option value="HM">HM</option>
                                                                        </select>
                                                                        <Button action={()=>{
                                                                            setArticleSelect(child.parent)
                                                                        }}> <FontAwesomeIcon icon={faPlus}/> </Button>
                                                                    </div>
                                                                    <div>
                                                                        {avis.find(avis=>avis.article===child.parent.id)?.commentaires.map((commentaire, index)=>{
                                                                            return (
                                                                                <div key={index} className='text-sm p-1 bg-cyan-50 my-2 flex gap-4'>
                                                                                    <input type="checkbox" disabled checked={commentaire.a_suivre}/>
                                                                                    <pre className='text-gray-800'>{commentaire.commentaire}</pre>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                                <div className='inline-block'></div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}                        
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default EditeChapitre