import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from '../../../../../../../component/utils/Table/Table';

function VerificationDocument(props) {

    const [dataDocs, setDataDocs] = useState([]);

    useEffect(()=>{
        (async()=>{
            try {
                if(props.affaire_ouvrage){
                    let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/get_all_detail_document_for_affaire_ouvrage/${props.affaire_ouvrage}/`)
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
        // axios.get(`http://localhost:8000/getdocument/${props.ouvrage}/${props.affaire}/`).then(async res=>{
        //     let result = res.data.results;

        //     let data_for_table = await Promise.all(result.map(async data=>{
        //         let emetteur = await getOneConstructeur(data.emetteur_id);
        //         return {
        //             "id" : data.id,
        //             "Emetteur" : emetteur.raison_social,
        //             "N externe" : data.numero_externe,
        //             "Indice" : data.indice,
        //             "Titre" : data.titre,
        //             "Date reception" : data.date_de_reception,
        //             "Intervention technique" : "",
        //             "Intervenant" : "",
        //             "Valide le" : "",
        //             "Avis" : ""
        //         }
        //     }));

        //     setDataDocs(data_for_table);
        // })
    }, [props.affaire_ouvrage]);
    return (
        <div className='my-8'>
            {dataDocs.length!==0 && <Table datas={dataDocs}/>}
        </div>
    )
}

export default VerificationDocument