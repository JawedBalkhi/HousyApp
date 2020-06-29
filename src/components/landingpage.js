import React,{Component} from 'react';
import {Grid,Cell} from 'react-mdl'
import {Container, Row, Col} from 'reactstrap';
import Volkan from "../img/Volkan.png"
import Thiewes from "../img/Thiewes.png"
import Jawed from "../img/Jawed.PNG"
import Jordy from "../img/Jordy.jpg"


class Landing extends Component{
    render(){
        return(
         <div style={{width:'100%', margin:'auto'}}>
             <Grid className="Landing-Grid">
                 <Cell col={12} className="text-center">
                     <h1>Housy</h1>
                 </Cell>

                 <Cell col={12}>
                    <div className="landing-text p-3">
                        <div className="border-bottom mb-2">
                            <h3>Project definition</h3>
                        </div>
                            IlionX adviseert de gemeente Zuidhorn over het bouwen van een type woning. IlionX zet hier, in hun proof of concept, machine learning voor in. Het is nu aan studenten van de Hogeschool Rotterdam om op dit proof of concept verder te bouwen met als doel de applicatie commercieel te kunnen uitbaten. Door de woningnood en vooral het gebrek aan de gevraagde woningtypes in bepaalde gemeenten, wil IlionX door middel van een tool hun klanten, gemeenten, adviseren de juiste woningtypes te bouwen.
                            Wij zullen als groep data verzamelen, structureren en modelleren. Dat zal helpen onze onderzoeksvraag te beantwoorden. We zullen een datawarehouse op gaan bouwen, gevuld met data bedoeld als input voor het machine learning algoritme. Dit datawarehouse zal voor de machine learning tool benaderbaar worden door middel van een REST api.
                            De duur van dit project is 20 weken en zal op een nader te bepalen datum opgeleverd worden.
                            Aangezien Ilionx het product wil verkopen aan zijn klanten en zij momenteel met Python werken, zullen wij dit ook doen. We zullen gebruik maken van PyCharm IDE. Om de tool compatibel te maken met de codebase van Ilionx, wordt er gebruik gemaakt.
                   </div>
                 </Cell>

                 <Cell col={6}>
                    <div className="landing-text p-3">
                        <div className="border-bottom mb-2">
                            <h3>Over ons</h3>
                        </div>
                        Als derde jaar studenten van Hogeschool Rotterdam moeten we in het 3e jaar een interne minor
                        volgen. Wij hebben voor de minor Date Engineering gekozen. Binnen deze minor waren er
                        verschillende keuzes om als project te volgen bij verschillende bedrijven. Ons team heeft ervoor
                        gekozen om het project van Ilionx te volgen. Door middel van de skills die we opdoen tijdens deze
                        minor zal er een applicatie gebouwd worden, welke gebruikt wordt om advies te geven aan de
                        gemeentelijke overheid.
                    
                    <Grid>
                        <Cell col={3}>
                            <img src={Volkan} width={100} height={100} />
                        </Cell>
                        <Cell col={3}>
                            <img src={Jawed} width={100} height={100} />
                        </Cell>
                        <Cell col={3}>
                            <img src={Thiewes} width={100} height={100} />
                        </Cell>
                        <Cell col={3}>
                            <img src={Jordy} width={100} height={100} />
                        </Cell>   
                    </Grid>
                    
                    </div>                 
                 </Cell>

                 <Cell col={6}>
                    <div className="landing-text p-3">
                        <div className="border-bottom mb-2">
                            <h3>Product owner</h3>
                        </div>
                        IlionX is een IT-dienstverlener die organisaties helpt voorop te blijven lopen. Sinds de oprichting in 2002 ondersteunt IlionX haar klanten als digitale partner op het gebied van onder andere artificial intelligence, management consultancy, business analytics, cloud, mobile, security en professional services.
                        Nederland kampt momenteel met een woningcrisis. Ilionx heeft een tool gebouwd om gemeenten te helpen beslissen wat voor soort woningen die ze zouden moeten bouwen. De tool gebruikt algoritmen voor machine learning om te voorspellen welke soorten woningen moeten worden gebouwd.
                        IlionX wil de proof of concept omzetten naar een daadwerkelijk product. De studenten krijgen de mogelijkheid om het product mee te ontwerpen en een echte data science product te bouwen. Hierin zijn de studenten vrij om nieuwe ideeën en technologieën voor te stellen.
                    </div>
                 </Cell>

             </Grid>
            
         </div>
        )
    }
}
export default Landing;