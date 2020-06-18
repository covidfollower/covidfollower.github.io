const newoption = {
  method: "GET",
  mode: "cors",
  cache: "default",
};

function newCallFetch(){
fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json', newoption).then(
  (response) => {
    response.json().then((data) => testeConstruction(data));
  }
);
};



let InitiateChartCountries = ['Brazil', 'Spain', 'Italy', 'France', 'United States'];
let alreadyCreated = [];
let countryToBeCreated = ""
//CHARTS TOTAL ACUMULATED DEATHS PER DAY
let dataSetsInfo1 = {
  datasets: [],
};
//CHART DEATHS PER DAY 
let dataSetsInfo2 = {
  datasets: [],
};
//GRAFICO CASES PER MILLION 
let dataSetsInfo3 = {
  datasets: [],
};
//GRAFICO DEATHS PER MILLION 
let dataSetsInfo4 = {
  datasets: [],
};

function testeConstruction (data) {
  const arr = Object.values(data)
  
  InitiateChartCountries.forEach( element => {

  countryToBeCreated = element  
  let indexArrayFiltered = arr.filter( id => (id[0].location === countryToBeCreated))
  if(alreadyCreated.includes(countryToBeCreated) === false) {
  let newColor = randomColor()
  createTotalDeathChartData(indexArrayFiltered, newColor)
  createDeathsPerDayChartData(indexArrayFiltered, newColor)
  createCasesPerMillionChartData(indexArrayFiltered, newColor)
  createDeathsPerMillionChartData(indexArrayFiltered, newColor)
  alreadyCreated.push(countryToBeCreated) 
  };

  });
    //MORTES TOTAIS ********************************************************************************************************************************************************
    function createTotalDeathChartData(data, color) {
      let newData1 = {
        data: [],
        backgroundColor: color,
        borderColor: color,
        borderWidth: 3,
        pointRadius: 0,
        label: data[0][0].location,
        fill: false,
      };
  
      //DADO A SER IMPLEMENTADO
      for (let index = 0; index < data[0].length; index += 1) {
        newData1.data.push(data[0][index].total_deaths);
      }
      
      dataSetsInfo1.datasets.push(newData1);
      myChart1.data.dataset = dataSetsInfo1.dataset;
      myChart1.update()
    }
    //MORTES POR DIA ********************************************************************************************************************************************************
    function createDeathsPerDayChartData(data, color) {
      let newData2 = {
        data: [],
        backgroundColor: color,
        borderColor: color,
        borderWidth: 3,
        pointRadius: 0,
        label: data[0][0].location,
        fill: false,
      };
  
      //DADO A SER IMPLEMENTADO
      for (let index = 0; index < data[0].length; index += 1) {
        newData2.data.push(data[0][index].new_deaths);
      }
      
      dataSetsInfo2.datasets.push(newData2);
      myChart2.data.dataset = dataSetsInfo2.dataset;
      myChart2.update()
    }
    //CASES/MILLION ********************************************************************************************************************************************************
    function createCasesPerMillionChartData(data, color) {
      let newData3 = {
        data: [],
        backgroundColor: color,
        borderColor: color,
        borderWidth: 3,
        pointRadius: 0,
        label: data[0][0].location,
        fill: false,
      };
  
      //DADO A SER IMPLEMENTADO
      for (let index = 0; index < data[0].length; index += 1) {
        newData3.data.push(Math.round(data[0][index].new_cases_per_million));
      }
      
      dataSetsInfo3.datasets.push(newData3);
      myChart3.data.dataset = dataSetsInfo3.dataset;
      myChart3.update()
    }
    //DEATHS/MILLION ********************************************************************************************************************************************************
    function createDeathsPerMillionChartData(data, color) {
      let newData4 = {
        data: [],
        backgroundColor: color,
        borderColor: color,
        borderWidth: 3,
        pointRadius: 0,
        label: data[0][0].location,
        fill: false,
      };
  
      //DADO A SER IMPLEMENTADO
      for (let index = 0; index < data[0].length; index += 1) {
        newData4.data.push(Math.round(data[0][index].new_deaths_per_million));
      }
      
      dataSetsInfo4.datasets.push(newData4);
      myChart4.data.dataset = dataSetsInfo4.dataset;
      myChart4.update()
    }
}

//GERADOR DE CORES ALEATÓRIAS
function randomColor() {
  let r = Math.floor(Math.random() * 205 + 50);
    let g = Math.floor(Math.random() * 205 + 50);
    let b = Math.floor(Math.random() * 205 + 50);
    return `rgb(${r}, ${g}, ${b})`;
}

const countryChange = document.getElementsByClassName('countries')[0]
countryChange.addEventListener('change', function(){
InitiateChartCountries.push(countryChange.value)
newCallFetch()
  
});

let label2 = [];
for (let index = 0; index < 200; index += 1) {
  label2.push(index);
};
//ESTRUTURA DO GRAFICO TOTAL DE MORTES ACUMULADAS POR DIA ****************************************************************************************************************************************************************
let ctx1 = document.getElementById("myChart1").getContext("2d");
let myChart1 = new Chart(ctx1, {
  type: "line",
  data: {
    labels: label2,
    datasets: dataSetsInfo1.datasets,
  },
  options: {
    tooltips: {
      mode: "nearest",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      yAxes: [
        {
          type: "linear",
          scaleLabel: {
            display: true,
            labelString: "Total Deaths",
            fontSize: 18,
          },
          ticks: {
            display: true,
            fontSize: 15,
            fontColor: "#eee",
            min: 0,
            suggestedMax: 30000,
            stepSize: 15000,
            maxTicksLimit: 30,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Days from day one",
            fontSize: 18,
          },
          ticks: {
            display: true,
            fontSize: 15,
            fontColor: "#eee",
            maxRotation: 0,
            stepSize: 20,
            maxTicksLimit: 17,
          },
        },
      ],
    },
    responsive: true,
    legend: {
      labels: {
        fontColor: "#eee",
        fontSize: 15,
      },
    },
    title: {
      display: true,
      text: "TOTAL DEATHS FROM DAY ONE",
      fontSize: 18,
      fontColor: "#eee",
    },
  },
});
//ESTRUTURA DO GRAFICO MORTES POR DIA ****************************************************************************************************************************************************************
let ctx2 = document.getElementById("myChart2").getContext("2d");
let myChart2 = new Chart(ctx2, {
  type: "line",
  data: {
    labels: label2,
    datasets: dataSetsInfo2.datasets,
  },
  options: {
    tooltips: {
      mode: "nearest",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      yAxes: [
        {
          type: "linear",
          scaleLabel: {
            display: true,
            labelString: "Total Deaths",
            fontSize: 18,
          },
          ticks: {
            display: true,
            fontSize: 15,
            fontColor: "#eee",
            min: 0,
            suggestedMax: 1000,
            stepSize: 800,
            maxTicksLimit: 30,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Days from day one",
            fontSize: 18,
          },
          ticks: {
            display: true,
            fontSize: 15,
            fontColor: "#eee",
            maxRotation: 0,
            stepSize: 20,
            maxTicksLimit: 17,
          },
        },
      ],
    },
    responsive: true,
    legend: {
      labels: {
        fontColor: "#eee",
        fontSize: 15,
      },
    },
    title: {
      display: true,
      text: "DEATHS PER DAY",
      fontSize: 18,
      fontColor: "#eee",
    },
  },
}); 
//ESTRUTURA DO GRAFICO CASOS POR MILHAO ****************************************************************************************************************************************************************
let ctx3 = document.getElementById("myChart3").getContext("2d");
let myChart3 = new Chart(ctx3, {
  type: "line",
  data: {
    labels: label2,
    datasets: dataSetsInfo3.datasets,
  },
  options: {
    tooltips: {
      mode: "nearest",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      yAxes: [
        {
          type: "linear",
          scaleLabel: {
            display: true,
            labelString: "Total Deaths",
            fontSize: 18,
          },
          ticks: {
            display: true,
            fontSize: 15,
            fontColor: "#eee",
            min: 0,
            suggestedMax: 50,
            stepSize: 20,
            maxTicksLimit: 30,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Days from day one",
            fontSize: 18,
          },
          ticks: {
            display: true,
            fontSize: 15,
            fontColor: "#eee",
            maxRotation: 0,
            stepSize: 20,
            maxTicksLimit: 17,
          },
        },
      ],
    },
    responsive: true,
    legend: {
      labels: {
        fontColor: "#eee",
        fontSize: 15,
      },
    },
    title: {
      display: true,
      text: "CASES PER MILLION (estimated)",
      fontSize: 18,
      fontColor: "#eee",
    },
  },
});
//ESTRUTURA DO GRAFICO MORTES POR MILHAO ****************************************************************************************************************************************************************
let ctx4 = document.getElementById("myChart4").getContext("2d");
let myChart4 = new Chart(ctx4, {
  type: "line",
  data: {
    labels: label2,
    datasets: dataSetsInfo4.datasets,
  },
  options: {
    tooltips: {
      mode: "nearest",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      yAxes: [
        {
          type: "linear",
          scaleLabel: {
            display: true,
            labelString: "Deaths/million",
            fontSize: 18,
          },
          ticks: {
            display: true,
            fontSize: 15,
            fontColor: "#eee",
            min: 0,
            suggestedMax: 30,
            stepSize: 3,
            maxTicksLimit: 30,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Days from day one",
            fontSize: 18,
          },
          ticks: {
            display: true,
            fontSize: 15,
            fontColor: "#eee",
            maxRotation: 0,
            stepSize: 20,
            maxTicksLimit: 17,
          },
        },
      ],
    },
    responsive: true,
    legend: {
      labels: {
        fontColor: "#eee",
        fontSize: 15,
      },
    },
    title: {
      display: true,
      text: "DEATHS PER MILLION (estimated)",
      fontSize: 18,
      fontColor: "#eee",
    },
  },
});
newCallFetch()