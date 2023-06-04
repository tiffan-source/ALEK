import ASO from "./ASO/ASO";
import CRCT from "./CRCT/CRCT";
import Document from "./Document/Document";
import OuvrageDiffusion from "./OuvrageDiffusion/OuvrageDiffusion";
import RapportVisite from "./RapportVisite/RapportVisite";
import Synthese from "./Synthese/Synthese";

export let matchCTC = {
    "Synthese des avis" : <Synthese/>,
    "CRCT" : <CRCT/>,
    "ASO" : <ASO/>,
    "Documents" : <Document/>,
    "Ouvrages Diffusion" : <OuvrageDiffusion/>,
    "Rapports Visites" : <RapportVisite/>
}