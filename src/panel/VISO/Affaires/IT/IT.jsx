import React, {useState, useEffect} from 'react';
import mine from "../../../../assets/icon/mine.png";
import Table from '../../../../component/utils/Table/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../component/utils/Button/Button';
import axios from 'axios'
import getOneIT from '../../../../apiService/IT';
import getOneCollaborateur from '../../../../apiService/collaborateur';
function IT() {


    const [IT, setIT] = useState([]);
    const [collaborateur, setCollaborateur] = useState([]);

    useEffect(()=>{
        let id = localStorage.getItem("planAffaire");
        if(id){
            axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/planaffairefilter/' + id).then(async res=>{
                let data_for_it = await Promise.all(res.data.intervention_technique.map(async data => {
                    let it = await getOneIT(data);
                    return it;
                }));
                setIT(data_for_it);

                let data_for_intervenant = await Promise.all(res.data.affaires.intervenant.map(async data=>{
                    let intervenant = await getOneCollaborateur(data);
                    return {
                        "Nom collaborateur" : intervenant.last_name,
                        "Prenom" :  intervenant.first_name,
                        "N Service" : intervenant.numero_service //Il s'agit en realite de l'ID (tres important a corriger plus tard)
                    }
                }))
                setCollaborateur(data_for_intervenant);

            }).catch(err=>{console.log(err);localStorage.removeItem("planAffaire")})
        }
    }, []);

    return (
    <div>
        <div className='w-full h-full text-sm min-h-screen flex flex-col'>
        <h1 className='border-t border-gray-400 p-1 MissionPrestationbg-green-200 font-bold'>Aleatek</h1>

        <nav className='flex justify-between border-t border-gray-400 p-1 bg-green-200'>
            <h2 className='text-blue-800 flex items-center '>
                <img src={mine} alt="OilPump" className='w-[2rem] mr-2'/>
                Intervention Technique
            </h2>
        </nav>

        <div className='flex-grow'>
            <div className="my-8">
                <h2 className='font-bold text-sm text-center'>Liste des interventions techniques</h2>
                <div>
                    <Button>
                        <FontAwesomeIcon icon={faPlus}/>
                    </Button>
                    <Button>
                        <FontAwesomeIcon icon={faMinus}/>
                    </Button>
                </div>
                {IT.length!==0 && <Table datas={IT}/>}
            </div>
            <div className="my-8">
                <h2 className='font-bold text-sm text-center'>Liste des intervenants</h2>
                <div>
                    <Button>
                        <FontAwesomeIcon icon={faPlus}/>
                    </Button>
                    <Button>
                        <FontAwesomeIcon icon={faMinus}/>
                    </Button>
                </div>
                {collaborateur.length!==0 && <Table datas={collaborateur}/>}
            </div>
            <div className="my-8">
                <h2 className='font-bold text-sm text-center'>Liste des prestations associees</h2>
                <div>
                    <Button>
                        <FontAwesomeIcon icon={faPlus}/>
                    </Button>
                    <Button>
                        <FontAwesomeIcon icon={faMinus}/>
                    </Button>
                </div>
                <Table datas={[
                    {"Prestation" : "Prestation#1", "Libelle" : "Libelle#1", "Creer le" : "2023/12/12"},
                    {"Prestation" : "Prestation#1", "Libelle" : "Libelle#1", "Creer le" : "2023/12/12"},
                    {"Prestation" : "Prestation#1", "Libelle" : "Libelle#1", "Creer le" : "2023/12/12"},
                    {"Prestation" : "Prestation#1", "Libelle" : "Libelle#1", "Creer le" : "2023/12/12"},
                    ]}/>
            </div>
        </div>
    </div>
    </div>
  )
}

export default IT;
