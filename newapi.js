const newoption = {
  method: "GET",
  mode: "cors",
  cache: "default",
};


fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json', newoption).then(
  (response) => {
    response.json().then((data) => testeConstruction(data));
  }
);
let toGoChartCountries = ['brazil', 'world', 'spain', 'italy', 'france', 'united states'];
let alreadyCreated = [];
let countryToBeCreated = ""

function testeConstruction (data) {
  let testArr = Object.values(data)

  for( i = 0; i < testArr.length ; i += 1) {
    console.log(testArr[i][0])
    for ( j = 0 ; j < toGoChartCountries.length ; j += 1) {
      if ( testArr[i][0].location.toLowerCase() === toGoChartCountries[j]) {
        alreadyCreated.push(toGoChartCountries[j])
      }
    }
  }
  console.log(alreadyCreated)

  let indexOf = finder(testArr, countryToBeCreated)
    function finder(data, country) {
      for (i = 0; i < data.length; i += 1) {
        if (testArr[i][0].location.toLowerCase() === country) {
          return i;
        }
      }
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
  
      //DADO A SER IMPLEMENTADO
      for (let index = 0; index < data.length; index += 1) {
        newData.data.push(data[index].Deaths);
      }
  
      dataSetsInfo.datasets.push(newData);
      myChart.data.dataset = dataSetsInfo.dataset;
    }

  
}

  //GERADOR DE CORES ALEATÓRIAS
function randomColor() {
    let r = Math.floor(Math.random() * 205 + 50);
    let g = Math.floor(Math.random() * 205 + 50);
    let b = Math.floor(Math.random() * 205 + 50);
    return `rgb(${r}, ${g}, ${b})`;
}