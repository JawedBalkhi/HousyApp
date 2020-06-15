import React,{Component} from 'react';
import {Grid,Cell} from 'react-mdl';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import datum from './data.json';
import img from "../img/gemeente.png";
import {bar,Line,Pie, Bar} from 'react-chartjs-2'




class Verhuis extends Component {
   constructor(props){
       super(props);
       this.state={

     
        items:[],
        value: "",
        isLoaded: false,
        items2:[],
        value2: "",
        value3:[],



        chartData:{ }
       }
       
       this.onCitySelect = this.onCitySelect.bind(this)
       

   }

   getchartData(){
    this.setState({
       chartData:{
       labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
       datasets:[
          {
             label:'Population',
             data:[
               617594,
               181045,
               153060,
               106519,
               105162,
               95072
             ],
             backgroundColor:[
               'rgba(255, 99, 132, 0.6)',
               'rgba(54, 162, 235, 0.6)',
               'rgba(255, 206, 86, 0.6)',
               'rgba(75, 192, 192, 0.6)',
               'rgba(153, 102, 255, 0.6)',
               'rgba(255, 159, 64, 0.6)',
               'rgba(255, 99, 132, 0.6)'
             ]
          }
       ]
     }   
    });
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
//   componentDidUpdate(){

//      if ( this.state.value && this.state.value2 )
//       this.onCitySelect();
//   }
      
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
          console.log("run")
          fetch( "http://localhost:3000/"+this.state.value+this.state.value2)
          .then(res => res.json())
          .then(json =>{
             console.log(json)
              this.setState({
                  isLoaded:true,
                  items2:json,
                  data: { in: json[0].in   ,  out: json[0].out}
              })
          });
        }
   
    render() {
     const {isLoaded,items,items2,value,value2,value3} = this.state;
  
     
     const name = items.map(item => (  item.name ))
     const bewonersin = items2.map(item => (  item.in ))
     const bewonersout = items2.map(item => (  item.out ))
     const data = datum.map(item => (  item.name ))
     const leeftijdin = items2.map(item => ( { in: item.in, out: item.out } ) )
    
  
        if (!isLoaded){
            return <div>Loading.......</div>
        }
        else {
         return(
             <div>
            <Grid className="Landing-Grid">
            <Cell col ={5}>
            <div className= "verhuisstroominfo">
            <Dropdown options={name} onChange={e => { this.setState({ value: e.value})}} setState={this.value} value={value ? value: null} placeholder="Select an option" />;                
           
         {leeftijdin.map(item=>(`in: ${item.in}, uit:"${item.out} `)) }

            </div>
         
            </Cell>
                 <Cell col ={5}>
            <div  className= "verhuisstroominfo">
            <Dropdown options={data} onChange={b => { this.setState({ value2: b.value})}} setState={this.value}  value={value2 ? value2: null} placeholder="Select an option" />;                
     {`${value3.in}, ${value3.out}` }
            </div>
         </Cell>
         <Cell col ={2}>
         <div className= "verhuisstroominfo">
         <button onClick={( )=>this.onCitySelect()}>
                     Get verhuisstroom info </button>

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
                <Grid  className="Landing-Grid">
            <Cell col ={12}>
           

            <div className="verhuisstroominfo">
           <Bar
           data={this.state.chartData}
           width={600}
           height={70}
           options={{
            
           }}
           />
         </div>
                 </Cell>
                </Grid>
                </div> 
         )
        }
    }
}
     
    
    export default Verhuis;