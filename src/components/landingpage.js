import React,{Component} from 'react';
import {Grid,Cell} from 'react-mdl'
// import {Container,Row,Col} from 'reactstrap';


class Landing extends Component{
    render(){
        return(
         <div style={{width:'100%', margin:'auto'}}>
             <Grid className="Landing-Grid">
                 <Cell col ={12}>
                 
                 
                    <div className ='landing-text'>
                    <h2>Type wonningen</h2> 
                    
                              
                    <hr/>
                    <h1>hier komt test over het doel van deze website waarom deze website wat is doel van deze websitehier komt test over het doel van deze website waarom deze website wat is doel van deze websitehier komt test over het doel van deze website waarom deze website wat is doel van deze websitehier komt test over het doel van deze website waarom deze website wat is doel van deze websitehier komt test over het doel van deze website waarom deze website wat is doel van deze website</h1>
                    
                    <img 
                     src = "https://image.freepik.com/vrije-vector/echte-staat-logo-met-kleurrijke-huizen_1025-293.jpg"
                     alt='Tupe wonningen'
                     className='landing-image'
                     />
                     </div>


                 
                 
                 </Cell>

             </Grid>
        
            
         </div>
        )
    }
}
export default Landing;