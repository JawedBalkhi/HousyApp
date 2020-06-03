import React,{Component} from 'react';
import {Line,defaults } from 'react-chartjs-2';
import {Grid,Cell} from 'react-mdl';
defaults.global.defaultFontColor='Black';

class Verhuis extends Component{
   
        constructor (props){
            super(props);


            let data = [50,5,1,10,32,2]

            this.state ={
                data:{
                    labels:["Januarie","Februarie","Maart","Aprile","Mei","june"],
                    datasets:[
                        {label: "Van een gemeente",
                        backgroundColor :"rgba(255,0,B,0.75)",
                        data: data
                     },{
                     label: "Naar een Gemeente",
                     backgroundColor: "rgba(0,255,0,0.75)",
                       data : [20,1,21,0,12,4]

                     }
                    ]
                }
            }
        }

        setGradientColor=(canvas,color)=>{
            const ctx = canvas.getContext("2d");
            const gradient = ctx.createLinearGradient(0,0,600,500);
            gradient.addColorStop(0,color);
            gradient.addColorStop(0.80,"rgba(133,122,144,0.5)");
            return gradient;
        }

        getChartData = canvas => {
            const data = this.state.data;
            if (data.datasets){
                let colors =["rgba(255,0,255,0.75)","rgba(0,255,0.75)"];
                data.datasets.forEach((set,i)=>{
                  set.backgroundColor = this.setGradientColor(canvas, colors[i]);
                  set.borderColor = "black";
                  set.borderWidht = 2;
                  set.fontColor = "black"; 
                  set.fontColor= 'red';
                });
            }
            return data;
        }
        

        render(){
        return(


            <Grid className="verhuis-Grid">
            <Cell col ={8}>

    
        
            
            <div className ='verhuis-diagram' >
            <h1>verhuis strommen </h1>
            <div className = 'diagran'>
            <Line 
            options={{
                responsive : true
            }}

            data={this.getChartData}

            />

</div>
            </div>

           
            
            

            </Cell>


            <Cell col ={4}>
            <div className ='verhuis-tekst'>

                <h1>Infor over diagram</h1>

                <h2>

                Hier komt uitlet over diagram wat hier af te lezen is
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is  
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
               


                </h2>


            </div>
            </Cell>

        </Grid>
         
        )
    }
}
export default Verhuis;