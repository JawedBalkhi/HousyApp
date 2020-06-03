import React, { useState, useEffect } from "react";
import { Line,defaults} from "react-chartjs-2";
import axios from 'axios';
import {Grid,Cell} from 'react-mdl';
defaults.global.defaultFontColor='Black';

const Dankmemes = () => {
  const [chartData, setChartData] = useState({});



  const chart = () => {
    let empSal = [];
    let empAge = [];
    axios
      .get("http://dummy.restapiexample.com/api/v1/employees")
      .then(res => {
        console.log(res);
        for (const dataObj of res.data.data) {
          empSal.push(parseInt(dataObj.employee_salary));
          empAge.push(parseInt(dataObj.employee_age));
        }
        setChartData({
          labels: empAge,
          datasets: [
            {
              label: "Van een Gemeente",
              data: [50,60,20,50,60,20,50,60,20,50,60,20,50,60,20,50,60,20,50,60,20,50,60,20],
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderColor : "black",
           
              borderWidht :2
            },{
                label: "Naar een Gemeente",
                backgroundColor: "rgba(0,255,0,0.75)",
                borderColor : "black",
                borderWidht :2,
                fontColor: '#black',
                data: empAge,

                }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(empSal, empAge);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">


        
<Grid className="verhuis-Grid">
            <Cell col ={8}>

    
           
            
            

           

      <h1>Verhuizstrommen</h1>
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Test", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
        
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
                Hier komt uitlet over diagram wat hier af te lezen is
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is  
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is     Hier komt uitlet over diagram wat hier af te lezen is
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is  
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is     Hier komt uitlet over diagram wat hier af te lezen is
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is  
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is 
                Hier komt uitlet over diagram wat hier af te lezen is     Hier komt uitlet over diagram wat hier af te lezen is
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
   </div>
    
  );
};

export default Dankmemes;