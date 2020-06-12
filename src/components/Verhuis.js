import React,{Component} from 'react';
import {Grid,Cell} from 'react-mdl';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import datum from './data.json';
import img from "../img/gemeente.png"



class Verhuis extends Component {
   constructor(props){
       super(props);
       this.state={
        items:[],
        value: "",
        isLoaded: false,
        items2:[],
        value2: "",
        
     
       }
       
       this.onCitySelect = this.onCitySelect.bind(this)
       

   }

  //  componentWillMount() {
  //   axios.get('../public/users.json') // JSON File Path
  //     .then( response => {
  //       this.setState({
  //       userList: response.data
  //     });
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  //  }
  componentDidUpdate(){

     if ( this.state.value && this.state.value2 )
      this.onCitySelect();
  }
      
        componentDidMount() {
         fetch( "http://localhost:3000/Location")
            .then(res => res.json())
            .then(json =>{
                this.setState({
                    isLoaded:true,
                    items:json,
                })
            });
        
            
          
        }
      
     
        onCitySelect(){          

          fetch( "http://localhost:3000/"+this.state.value+this.state.value2)
          .then(res => res.json())
          .then(json =>{
              this.setState({
                  isLoaded:true,
                  items2:json,
              })
          });
        

        }
   
    render() {

     const {isLoaded,items,items2,value,value2} = this.state;
  
     
     const name = items.map(item => (  item.name ))
     const bewonersin = items2.map(item => (  item.in ))
     const bewonersout = items2.map(item => (  item.out ))
     const data = datum.map(item => (  item.name ))
    
  
        if (!isLoaded){
            return <div>Loading.......</div>
        }
        else {
         return(
             <dic>
            <Grid className="Landing-Grid">
            <Cell col ={6}>
            <div className= "verhuisstroominfo">
            <Dropdown options={name} onChange={e => { this.setState({ value: e.value})}} setState={this.value} value={value ? value: null} placeholder="Select an option" />;                
          
            </div>
         
            </Cell>
                 <Cell col ={6}>
            <div  className= "verhuisstroominfo">
            <Dropdown options={data} onChange={b => { this.setState({ value2: b.value})}} setState={this.value}  value={value2 ? value2: null} placeholder="Select an option" />;                
         
            </div>
         </Cell>
        </Grid>
        <Grid  className="Landing-Grid">
            <Cell col ={12}>
                 <div className= "verhuisstroominfo">
                <h1>Hieronder Vindt u informatie over hoeveel mensen zijn er op door u geslecterde gemeente en jaar bij gekomen en weggegaan.</h1>
                <div className = "img">
                <img src={img} alt=" Smiley face"/>
                </div>
         <ul >
       
          <li>
            <div> <h1> Gemment : {value}</h1></div>
          </li>
          <li>
            <div><h1>Jaar : {value2}</h1></div>
          </li>
          <li>
            <div><h1>Aantal bewonner Bijgekomen : {bewonersin}</h1></div>
          </li>
          <li>
            <div><h1>Aantal bewonner Vertrokken : {bewonersout}</h1></div>
          </li>
      
      </ul>
            </div>
                 </Cell>
                </Grid>
                
                </dic> 
         )
        }
    }
}
     
    
    export default Verhuis;