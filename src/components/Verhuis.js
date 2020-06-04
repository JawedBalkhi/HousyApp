import React,{Component} from 'react';
import {Grid,Cell} from 'react-mdl';
import Select from 'react-select';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class Verhuis extends Component {
   constructor(props){
       super(props);
       this.state={
        items:[],
        value: "",
        isLoaded: false
       }
   }
  
      
        componentDidMount() {
         fetch( "https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(json =>{
                this.setState({
                    isLoaded:true,
                    items:json,
                })
            });
          
        }
   
    render() {
     const {isLoaded,items} = this.state;
     
     const name = items.map(item => (  item.name ))
  
        if (!isLoaded){
            return <div>Loading.......</div>
        }
        else {
         return(
            <Grid className="verhuis-Grid">
            <Cell col ={8}>
            <div>
            <Dropdown options={name} onChange={e => this.setState({ value: e.value })}  setState={this.value}  placeholder="Select an option" />;                
        
            {this.state.value}
            </div>
                 </Cell>
                 </Grid>
         )
        }
    }
}
     
    
    export default Verhuis;