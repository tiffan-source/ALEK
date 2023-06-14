import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from '../../../../../../../component/utils/Table/Table';

/**
 * Si aso en cours on prends tous les donc sans aso
 * 
 * Si aso non en cours doc lie a l'aso
 */

function VerificationDocument(props) {

    const [dataDocs, setDataDocs] = useState([]);

    useEffect(()=>{
        (async()=>{
            try {
                if(props.affaire_ouvrage){

                    let data;
                    if(parseInt(props.asoData.statut) === 0){
                        data = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_detail_document_for_affaire_ouvrage/${props.affaire_ouvrage}/`);
                    }
                    else{
                        data = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_detail_document_for_affaire_ouvrage_aso_version/${props.asoData.id}/`);
                    }

                    data = data.data;
                    
                    let pre_table = await Promise.all(data.map(async dt=>{
                        let {data: avis_doc} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/documents/avis/${dt.id}/`)
                        let {data: planAff} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/admin/planaffaire/${localStorage.getItem("planAffaire")}/`)
                        
                        let {data: all_IT} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/all_mission/${planAff.affaire}/`)
                        return {
                            "id" : dt.id,
                            "Emetteur" : dt.entreprise.raison_sociale,
                            "N externe" : dt.numero_externe,
                            "Indice" : dt.indice,
                            "Titre" : dt.titre,
                            "Date reception" : dt.date_reception,
                            "Intervention technique" : all_IT.reduce((prev, curr, index, arr)=>{
                                prev += curr.code_mission
                                if(index !== arr.length - 1)
                                  prev += ' - '
                                return prev;
                            }, ''),
                            "Avis" : avis_doc.codification
                        }
                    }));

                    setDataDocs(pre_table)
                }
            } catch (error) {
                
            }
        })();

    }, [props.affaire_ouvrage, props.asoData.id, props.asoData.statut]);
    return (
        <div className='my-8'>
            {dataDocs.length!==0 && <Table datas={dataDocs}/>}
        </div>
    )
}

export default VerificationDocument