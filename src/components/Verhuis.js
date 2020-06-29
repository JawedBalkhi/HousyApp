import React,{Component} from 'react';
import {Grid,Cell} from 'react-mdl';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import datum from './data.json';
import img from "../img/gemeente.png";
import {bar,Line,Pie, Bar} from 'react-chartjs-2';
import { Button } from 'reactstrap';





class Verhuis extends Component {
   constructor(props){
       super(props);
       this.state={

     
        items:[],
        value: "",
        isLoaded: false,
        cities:[],
        value2: "",
        value3:[],
        chartData: null,
        totalIn: null,
        totalOut: null,



       }
       
       this.onCitySelect = this.onCitySelect.bind(this)
       //this.getchartData = this.getchartData.bind(this)
       

   }
      
        componentDidMount() {
         fetch("/woonplaatsen")
            .then(res => res.json())
            .then(json => json.data.woonplaatsen)
            .then(json => {
                this.setState({
                    isLoaded:true,
                    cities:json,
                })
            });
            //this.getchartData()
        
            
          
        }
      
     
        onCitySelect(){          
          fetch(`/bevolkingsmutatie/${this.state.value}/${this.state.value2}`)
          .then(res => res.json())
          .then(json => json.data)
          .then(json =>{
            console.log(json)
            const datasetInstroom = {
              data: Object.keys(json.in).map(key => json.in[key]),
              label: 'instroom',
              backgroundColor: 'rgba(124, 252, 0, 0.6)'
            }

            const datasetUitstroom = {
              data: Object.keys(json.uit).map(key => json.uit[key]),
              label: 'uitstroom',
              backgroundColor: 'rgba(255, 0, 0, 0.6)'
            }

            const chartData = {
              labels: ['18-30', '30-50', '50+'],
              datasets: [ datasetInstroom, datasetUitstroom ]
            } 

              this.setState({
                  isLoaded:true,
                  items2:json,
                  totalIn: json['total_in'],
                  totalOut: json['total_out'],
                  chartData
              })
          });
        }
   
    render() {
     const {isLoaded,totalIn,totalOut,cities,items,items2,value,value2,value3} = this.state;
  
     
     //const City = cities.map(item => (  item.name ))
     const woonplaatsen = [ 'zuidhorn', 'niekerk', 'groningen' ]
     const City = [...cities].filter(city => woonplaatsen.includes(city))

     const Years = datum.map(item => (  item.name ))

    
  
        if (!isLoaded){
            return <div>Loading.......</div>
        }
        else {
         return(
             <div>
            <Grid className="Landing-Grid">
            <Cell col ={5}>
            <div className= "verhuisstroominfo">
            <Dropdown options={City} onChange={e => { this.setState({ value: e.value})}} setState={this.value} value={value ? value: null} placeholder="Select an option" />            
           
 

            </div>
         
            </Cell>
                 <Cell col ={5}>
            <div  className= "verhuisstroominfo">
            <Dropdown options={Years} onChange={b => { this.setState({ value2: b.value})}} setState={this.value}  value={value2 ? value2: null} placeholder="Select an option" />                
            </div>
         </Cell>
         <Cell col={1}>
         <div className= "verhuisstroominfo">
         <Button
          className="bg-success" 
          onClick={( )=>this.onCitySelect()}>
                     Get Data 
        </Button>

                     </div>
                     </Cell>
        </Grid>
        <Grid className="Landing-Grid">
          <Cell col={12}>
            Hieronder Vindt u informatie over hoeveel mensen zijn er op door u geslecterde gemeente en jaar bij gekomen en weggegaan.
          </Cell>
        </Grid>
        <Grid  className="Landing-Grid">
            <Cell col ={6}>
                 <div className= "verhuisstroominfo">
               
                <div className = "img">
                <img src={img} width={'100%'} alt=" Smiley face"/>
                </div>
                </div>
         
          </Cell>
          <Cell col={6}>
            <ul >
          <li>
            <div> <h1> Gemeente : {value}</h1></div>
          </li>
          <li>
            <div><h1>Jaar : {value2}</h1></div>
          </li>
          <li>
            <div><h1>Aantal bewoners bijgekomen : {totalIn}</h1></div>
          </li>
          <li>
            <div><h1>Aantal bewoners vertrokken : {totalOut}</h1></div>
          </li>
        
      </ul>
                 </Cell>
                </Grid>
                <Grid  className="Landing-Grid">
            <Cell col ={12}>
           

            <div className="verhuisstroominfo">
            {this.state.chartData && 
              <Bar
                data={this.state.chartData}
                width={600}
                height={70}
                options={{
                  scales: {
                    yAxes: [{
                      display: true,
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  }

                }}
              />
            }
           
         </div>
                 </Cell>
                </Grid>
                </div> 
         )
        }
    }
}
   //test jordy  
    
    export default Verhuis;