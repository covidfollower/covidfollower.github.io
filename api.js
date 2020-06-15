const option = {
  method: "GET",
  mode: "cors",
  cache: "default",
};
function callFetch(country) {
  fetch(
    `https://api.covid19api.com/total/dayone/country/${country}`,
    option
  ).then((response) => {
    response.json().then((data) => apiConstruction(data));
  });
}

// https://api.covid19api.com/dayone/country/china

// let buttonTest = document.getElementById("test");
// buttonTest.addEventListener("click", function () {

// });

let label = [];
let contador = 0;

for (let index = 0; index < 150; index += 1) {
  contador += 1;
  label.push(contador);
}
let dataSetsInfo = {
  datasets: [],
};
function apiConstruction(data) {
  let dayDeaths = [];

  for (let index = 0; index < data.length; index += 1) {
    dayDeaths.push(data[index].Deaths);
  }

  function randomColor() {
    let r = Math.floor(Math.random() * 205 + 50);
    let g = Math.floor(Math.random() * 205 + 50);
    let b = Math.floor(Math.random() * 205 + 50);

    return `rgb(${r}, ${g}, ${b})`;
  }
  
  function createChartData(data) {
    let newLineColor = randomColor();
    let newData = {
      data: [],
      backgroundColor: newLineColor,
      borderColor: newLineColor,
      borderWidth: 3,
      pointRadius: 0,
      label: data[1].Country,
      fill: false,
    };
    for (let index = 0; index < data.length; index += 1) {
      newData.data.push(data[index].Deaths);
    }

    let oldData = myChart.data.datasets[0];
    dataSetsInfo.datasets.push(newData);
    myChart.data.dataset = dataSetsInfo.dataset;
  }

  addData(myChart, createChartData(data));

  function addData(chart, data) {
    Object.assign(chart.data.datasets, data);
    chart.update();
  }
}

let ctx = document.getElementById("myChart2").getContext("2d");
let myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: label,
    datasets: dataSetsInfo.datasets,
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
            stepSize: 1000,
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

callFetch("brazil");
callFetch("france");
callFetch("united-states");
callFetch("italy");
callFetch("spain");
let arr = [];
let arrCriado = [
  "brazil",
  "world",
  "spain",
  "italy",
  "france",
  "united-states",
];

/* let generateGraphic = document.getElementsByClassName("countries")[0];
generateGraphic.addEventListener("change", graphicUpdate);
*/
const noData = [
        'anguilla', 
        'aruba',
        'australia',
        'bermuda', 
        'british-virgin-islands', 
        'caribbean-netherlands',
        'cayman-islands',
        'channel-islands',
        'china',
        'curaçao',
        'diamond-princess', 
        'faeroe-islands',
        'falkland-islands',
        'french-guiana',
        'french-polyanesia',
        'gibraltar',
        'greenland',
        'guadeloupe',
        'hong kong',
        'isle of man',
        'martinique',  
        'macao',
        'ms-zaandam',
        'reunion',
        'montserrat',
        'mayotte',
        'turks-and-caicos'
      ]
      let nameChange = [
        'car', 'central-african-republic',
        'congo','democratic-republic-of-the-congo',
        'drc','democratic-republic-of-the-congo',
        'iran, Islamic Republic of','iran',
        'timor-leste','east-timor',
        'usa', 'united-states'
      ]


let noDeathCountries = [];
function graphicUpdate() {
  let trInfo = document.querySelectorAll("tr");
  for (i = 1; i < trInfo.length; i += 1) {
    if(noData.includes(trInfo[i].classList.item(1).toLowerCase())){

    } else {
      arr.push(trInfo[i].classList.item(1).toLowerCase());
    }
  }
  

  for (let i = 0; i < arr.length; i += 1) {
    for ( let j = 0 ; j < nameChange.length ; j += 2) {
      if (arr[i] === nameChange[j]) { 
        arr[i] = nameChange[(j+1)];
      }
    }
    
    
    if (arr[i] !== "world") {
      if (arrCriado.includes(arr[i]) === false) {
        arrCriado.push(arr[i]);
        callFetch(arr[i]);
        
      }
    }
  }
}


let chartChange = document.getElementById("myChart2");

let removement = document.getElementsByClassName("remove")[0];

removement.addEventListener("click", removingFromGraph);

function removingFromGraph() {
  let trSelected = document.getElementsByTagName("tr");
  let countryToBeRemoved = "";
  for (let i = 0; i < trSelected.length; i += 1) {
    if (trSelected[i].classList.contains("bg-warning") === true) {
      countryToBeRemoved = trSelected[i].classList.item(1).toLowerCase();
    }
  }
  let toRemoveDatasetIndex;

  
    for ( let j = 0 ; j < nameChange.length ; j += 2) {
      if (countryToBeRemoved === 'usa') { 
        countryToBeRemoved = "united states of america";
      }
    }
  

    console.log(countryToBeRemoved);

  if (countryToBeRemoved !== "" && countryToBeRemoved !== "world") {
    let arrayToSearch = myChart.data.datasets;
    console.log(arrayToSearch)
    for (i = 0; i < arrayToSearch.length; i += 1) {
      if (arrayToSearch[i].label.toLowerCase() === countryToBeRemoved) {
        toRemoveDatasetIndex = i;
        arrCriado.splice(arrCriado.indexOf(countryToBeRemoved), 1);
        countryToBeRemoved = "";
      }
    }
  }
  if (toRemoveDatasetIndex !== undefined) {
    removeData(myChart, toRemoveDatasetIndex);
    toRemoveDatasetIndex = undefined;
    removingFromGraph();
  }
}

function removeData(chart, removedDatasetIndex) {
  chart.data.datasets.splice(removedDatasetIndex, 1);
  chart.update();
}

function dataNumberValidity() {
  let trInfo = document.querySelectorAll("tr");
  for (i = 1; i < trInfo.length; i += 1) {
    let rowClassPIcker = trInfo[i].classList.item(0);
    let newNdFinder = document.getElementsByClassName(rowClassPIcker);
    if (newNdFinder[4].innerHTML == 'N/D') {
      if (trInfo.classList === undefined) {
        noDeathCountries.push(newNdFinder[1].innerHTML);
        break;
      }
    }
  }
  return noDeathCountries;
}
