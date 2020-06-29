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
      .get("http://localhost:3000/Rotterdam2015")
      .then(res => {
        console.log(res);
        for (const dataObj of res.data) {
          empSal.push(parseInt(dataObj.employee_salary));
          empAge.push(parseInt(dataObj.employee_age));
        }
        setChartData({
          labels: empAge,
          datasets: [
            {
              label: "Van een Gemeente",
              data: empAge,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderColor : "black",
           
              borderWidht :2
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
  
      </Grid>
   </div>
    
  );
};

export default Dankmemes;