// import React,{Component} from 'react';
// import {Grid,Cell} from 'react-mdl';
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
// import axios from 'axios';
// import data from '../data.json'


// class Verhuis extends Component {
//    constructor(props){
//        super(props);
//        this.state={
//         items:[],
//         value: "",
//         isLoaded: true,
     
//        }
//        this.onCitySelect = this.onCitySelect.bind(this)

//    }

//    componentWillMount() {
//     axios.get('../public/users.json') // JSON File Path
//       .then( response => {
//         this.setState({
//         userList: response.data
//       });
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//    }
  
      
//         // componentDidMount() {
//         //  fetch( "https://jsonplaceholder.typicode.com/users")
//         //     .then(res => res.json())
//         //     .then(json =>{
//         //         this.setState({
//         //             isLoaded:true,
//         //             items:json,
//         //         })
//         //     });
          
//         // }
//         componentDidMount() {
//             fetch("src/data.json")
//             .then(function(data) {
//               console.log(data);
              
//             });
//         }
//         onCitySelect(e){

//           // // fetch( "https://jsonplaceholder.typicode.com/users" + value)
//           // .then(res => res.json())
//           // .then(json =>{
//           //     this.setState({
//           //         isLoaded:true,
//           //         items:json,
//           //     })
//           // });
        

//         }
   
//     render() {

//      const {isLoaded,items} = this.state;
  
     
//      const name = items.map(item => (  item.name ))
  
//         if (!isLoaded){
//             return <div>Loading.......</div>
//         }
//         else {
//          return(
//             <Grid className="verhuis-Grid">
//             <Cell col ={8}>
//             <div>
//             <Dropdown options={name} onChange={e => { this.onCitySelect(e); this.setState({ value: e.value})}} setState={this.value} placeholder="Select an option" />;                
            
//             {this.state.value}
//             </div>
//             <div>
               
         
//          </div>
        
//                  </Cell>
//                  </Grid>
//          )
//         }
//     }
// }
     
    
//     export default Verhuis;