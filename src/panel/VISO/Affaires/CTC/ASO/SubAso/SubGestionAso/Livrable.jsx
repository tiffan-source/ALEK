import { Document, PDFViewer, Page, View, StyleSheet, Image, Text } from '@react-pdf/renderer'
import React, { useEffect, useState } from 'react';
import logo from '../../../../../../../assets/images/aleatek.jpeg';
import axios from 'axios';

const styles = StyleSheet.create({
    body : {
        width : '100%'
    },

    sectionImage:{
        alignItems: 'center',
    },

    image: {
      marginBottom: 20,
      width: 200,
      objectFit: 'cover',
    },

    sectionTextCoordonne : {
        fontSize : '10px',
        width : '50%',
        borderRight : '2px #888 solid'
    },

    sectionAffaireInfo : {
        fontSize : '12px',
        width : '50%'
    },

    marginLeftTab : {
        marginLeft : '14px'
    },

    headSectionFirst : {
        marginHorizontal : '50px',
        display : 'flex',
        flexDirection : 'row',
        gap : 4
    },

    asoTitleFirstSection : {
        marginTop : '10px',
        marginHorizontal : '50px',
        fontSize : '13px'
    },

    miniHead : {
        marginVertical : '4px'
    },

    blockAdress : {
        width : '150px'
    },

    blockMail : {
        marginVertical : '10px'
    },

    flexcol:{
        display: 'flex',
        flexDirection : 'col',
        marginVertical : '10px'
    },

    affaireBlock : {
        backgroundColor : '#888',
        padding : 8,
        marginBottom : 20
    },

    destinataireBlock : {
        padding : 8,
        marginBottom : 20
    },

    ouvrageBlock : {
        backgroundColor : '#888',
        padding : 8,
        marginBottom : 20
    },

    constanteMiniSection : {
        fontSize : '10px'
    },

    titleAso : {
        textAlign : 'center',
        padding : 6,
        backgroundColor : '#888'
    },

    secondSousEnTete : {
        backgroundColor : '#999',
        display  : 'flex',
        justifyContent : 'space-between',
        marginHorizontal : '50px',
        fontSize : '10px',
        flexDirection : 'row',
        padding : '8px',
        marginVertical : '40px'
    },

    avisMain : {
        marginHorizontal : '50px',
        fontSize : '10px',
        // flexDirection : 'row',
        // padding : '8px',
        marginVertical : '20px' 
    },

    avisMainEnd : {
        marginHorizontal : '50px',
        fontSize : '10px',
        flexDirection : 'row',
        // padding : '8px',
        display : 'flex',
        justifyContent : 'space-between'
    }


});



function Livrable(props) {

    let [aso, setAso] = useState({});

    useEffect(()=>{
        (async () =>{
            let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + `/data_for_aso/${props.id}/`)

            setAso(data)
        })();
    }, [props.id])
    const ASO = (asos)=>{
        let {adresse} = asos.charge;
        let {charge} = asos
        return (
            <Document>
                <Page size="A4" >
                    {/* En tete */}
                    <View>
                        {/* Logo section */}
                        <View  style={styles.sectionImage}>
                            <Image src={logo} style={styles.image}/>
                        </View>

                        {/* Head Section */}
                        <View style={styles.headSectionFirst}>
                            {/* Coordonne and data affaire */}
                            <View style={styles.sectionTextCoordonne}>
                                <Text style={styles.miniHead}>
                                    Coordonnees du responsable d'affaire
                                </Text>
                                <Text style={styles.blockAdress}>
                                    {
                                    adresse.cplt_geo + " " + adresse.numero_voie +
                                    " " + adresse.lieu_dit + " " + adresse.code_postal + " " +
                                    adresse.ville + " " + adresse.pays + " " + adresse.departement 
                                    + " " + adresse.province
                                    }
                                </Text>
                                <Text style={styles.blockMail}>
                                    {
                                        charge.email
                                    }
                                </Text>
                                <Text>
                                    Adresse postale :
                                </Text>
                                <Text style={styles.blockAdress}>
                                    
                                </Text>
                                <Text>
                                    ASO N{asos.aso.id}
                                </Text>
                                <Text>
                                    N° affaire : {asos.affaire.numero}
                                </Text>
                                <Text style={styles.blockAdress}>
                                    Mission(s) signée(s) : {asos.mission.reduce((prev, curr, index, arr)=>{
                                        prev += curr.code_mission
                                        if(index !== arr.length - 1)
                                        prev += ' - '
                                        return prev;
                                    }, '')}
                                </Text>
                                <View style={styles.flexcol}>
                                    <Text>
                                        Chargé d'affaire : {charge.email}
                                    </Text>
                                    <Text>
                                        Diffusé par : {charge.first_name + " " + charge.last_name}
                                    </Text>
                                    <Text>
                                        Intervenant technique : 
                                    </Text>
                                </View>
                            
                            </View>
                            {/* Affaire - Client - Ouvrage */}
                            <View style={styles.sectionAffaireInfo}>
                                <View style={styles.affaireBlock}>
                                    <Text>
                                        Affaire : {asos.affaire.libelle}
                                    </Text>
                                </View>
                                <View style={styles.destinataireBlock}>
                                    <Text>
                                        Destinataire : {asos.client.raison_sociale}
                                    </Text>
                                </View>
                                <View style={styles.ouvrageBlock}>
                                    <Text>
                                        Ouvrage examnie : {asos.ouvrage.libelle}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* sous entete */}
                    <View style={styles.asoTitleFirstSection}>
                        <Text style={styles.titleAso}>ASO n°{asos.aso.id} | Avis sur Ouvrage| du {asos.aso.date}</Text>
                        <Text style={styles.constanteMiniSection}>
                            Dans le cadre de la mission qui nous a été confiée, veuillez trouver l'avis formulé sur l'ouvrage ou élément d'équipement faisant suite à
                            l'examen des documents d'exécution référencés ci-dessous.
                            Nous vous remercions de bien vouloir nous indiquer les suites qui seront données à nos observations. Les observations restées sans
                            suite seront reprises dans le rapport final.
                        </Text>
                    </View>

                    {/* Mapper les avis */}

                    {asos.documents.map(doc=>{
                        return (
                            <View style={styles.avisMain}>
                                <View>
                                    {doc.avis.map(a=>{
                                        return (
                                            <Text>- {a.commentaire}</Text>
                                        )
                                    })}
                                    <Text>-------------------------------------------------------------------------------------------------------------------------------------------------------</Text>
                                    <Text> {">"} Plan N {doc.document.nature} {doc.document.titre} {doc.document.numero_externe} {doc.document.numero_indice}</Text>
                                </View>
                            </View>
                        )
                    })}
                    
                    {/* Fin Map */}

                    {/* Deuxieme sous en tete */}
                    <View style={styles.secondSousEnTete}>
                        <Text>
                            Document examine relatifs a l'ouvrage
                        </Text>
                        <Text>Examen</Text>
                    </View>

                    {asos.documents.map(doc=>{
                        return (
                            <View style={styles.avisMainEnd}>
                                <View>
                                    <Text> {">"} Plan N {doc.document.nature} {doc.document.titre} {doc.document.numero_externe} {doc.document.numero_indice}</Text>
                                </View>
                                <View>
                                    <Text>{doc.codification}</Text>
                                </View>
                            </View>
                        )
                    })}
                </Page>
            </Document>
        )

    }
        
    
    return (
        <div>
            <h2 className='my-4 text-center font-bold text-lg'>Previsualisation du pdf</h2>

            <div className='h-[42rem]'>
                <PDFViewer style={{ height: '100%', width: '100%' }}>
                    {Object.keys(aso).length > 0 && ASO(aso)}
                </PDFViewer>
            </div>
        </div>
    )
}

export default Livrable