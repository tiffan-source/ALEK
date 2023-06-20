import ASO from "./ASO/ASO";
import Document from "./Document/Document";
import RICT from "./RICT/RICT";
import RapportVisite from "./RapportVisite/RapportVisite";
import Synthese from "./Synthese/Synthese";

export let matchCTC = {
    "Synthese des avis" : <Synthese/>,
    "ASO" : <ASO/>,
    "Documents" : <Document/>,
    "Rapports Visites" : <RapportVisite/>,
    "RICT" : <RICT/>
}