import React,{Component} from 'react';
import {Grid,Cell} from 'react-mdl';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import items from './data.json';
import axios from 'axios';



class Test extends Component {
   constructor(props){
       super(props);
       this.state={
        items,
        locatie: "",
        jaar:"",
        isLoaded: true,
        jawed:''
      
     
     
       }
       
   }

   
      
   componentDidMount() {
    axios.get("data.json") // JSON File Path
   .then( response => {
     this.setState({
     items: response.data,
     isLoaded:true,
   });
 })

  };
  onCitySelect(e,locatie){

    axios.get("dataRijswijk.json") // JSON File Path
    .then( response => {
      this.setState({
      jawed: response.data,
      isLoaded:true,
        })
    });
  

  }

 
   
    render() {

     const {isLoaded,items} = this.state;
  
     
     const name = items.map(item => (  item.name ))
     const jaren =[2017,2020,2022]
  
        if (!isLoaded){
            return <div>Loading.......</div>
        }
        else {
         return(
            <Grid className="verhuis-Grid">
            <Cell col ={4}>
            <div>
       
            <Dropdown options={name} onChange={e => { this.onCitySelect(e); this.setState({ locatie: e.value})}} setState={this.locatie} placeholder="Select an locatie" />;     
         <h1>{name}</h1>
            {this.state.locatie}
            </div>
            <div>
               
         
         </div>
        
                 </Cell>
                 <Cell col ={4}>
            <div>
       
            <Dropdown options={jaren} onChange={e => this.setState({  jaar: e.value})} setState={this.jaar} placeholder="Select an option" />;           
         <h1>{jaren}</h1>
            {this.state.jaar}
            </div>
           
               
         </Cell>
        

                 </Grid>
         )
        }
    }
}
     
    
    export default Test;