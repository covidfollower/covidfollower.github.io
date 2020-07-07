//fetch options
const newoption = {
  method: "GET",
  mode: "cors",
  cache: "default",
};

//function that capsules fetch
function newCallFetch() {
  fetch(
    "https://covid.ourworldindata.org/data/owid-covid-data.json",
    newoption
    ).then((response) => {
      response.json().then((data) => testeConstruction(data));
    });
  }
  
  //default onload countries
  let chartCountries = [
    "World",
    "Brazil",
    "USA",
    "Russia",
    "Italy",
    "France",
  ];
  
  //array that holds already created countries, avoid doubling
  let alreadyCreated = [];
  
  //string that holds the country about to be created
  let countryToBeCreated = "";
  
  //default initiation
  newCallFetch();
  
  //main functions that constroys line charts
  function testeConstruction(data) {
    //function that fixes initial null data
    const fixer = data["OWID_WRL"].data.length;

    const chartInitialFixer = (arr) => {
      if (arr.length < fixer) {
      arr.unshift(0);
      chartInitialFixer(arr);
    }
  };
  //END

  //GETTING RID OF COUNTRIES INITIALS OF JSON
  const arr = Object.values(data);

  const countriesAbbreviations = {
    'USA' : 'United States',
    'UK' : 'United Kingdom',
    'CAR' : 'Central African Republic',
    'DRC' : 'Democratic Republic of Congo',
    'Cabo Verde' : 'Cape Verde',
    'Curaรงao' : 'Curacao',
    'Czechia' : 'Czech Republic',
    'Eswatini' : 'Swaziland',
    'Ivory Coast' :"Cote d'Ivoire",
    'North Macedonia' : 'Macedonia',
    'S. Korea' : 'South Korea',
    'Sint Maarten' : 'Sint Maarten (Dutch part)',
    'St. Vincent Grenadines' : 'Saint Vincent and the Grenadines',
    'Timor-Leste' : 'Timor',
    'Turks and Caicos' : 'Turks and Caicos Islands',
    'UAE' : 'United Arab Emirates',
    'Vatican City': 'Vatican'
  }

  //
  chartCountries.forEach((element) => {
    if (Object.keys(countriesAbbreviations).includes(element) === true ) {
     element = countriesAbbreviations[element]; 
    }
    
    

    countryToBeCreated = element;
    let indexArrayFiltered = arr.filter(
      (id) => id.location === countryToBeCreated
      );
    if (alreadyCreated.includes(countryToBeCreated) === false) {
      createTotalCasesData(indexArrayFiltered);
      createCasesPerDayData(indexArrayFiltered);
      createTotalDeathsData(indexArrayFiltered);
      createDeathsPerDayData(indexArrayFiltered);
      alreadyCreated.push(countryToBeCreated);
    }
  });
  //total cases chart creation
  function createTotalCasesData(data) {
    newChartNameTotalCases = data[0].location;
    newChartDataTotalCases = [];

    for (let index = 0; index < data[0].data.length; index += 1) {
      newChartDataTotalCases.push(data[0].data[index].total_cases);
    }
    chartInitialFixer(newChartDataTotalCases);
    newObjTotalCases.push({
      name: newChartNameTotalCases,
      data: newChartDataTotalCases,
    });
    chart6.update();
  }
  //end of total cases chart creation

  //cases per day chart creation
  function createCasesPerDayData(data) {
    newChartNameCasesPerDay = data[0].location;
    newChartDataCasesPerDay = [];

    for (let index = 0; index < data[0].data.length; index += 1) {
      if (data[0].data[index].new_cases >= 0) {
        newChartDataCasesPerDay.push(data[0].data[index].new_cases);
      } else {
        newChartDataCasesPerDay.push(0);
      }
    }
    chartInitialFixer(newChartDataCasesPerDay);
    newObjCasesPerDay.push({
      name: newChartNameCasesPerDay,
      data: newChartDataCasesPerDay,
    });

    chart7.update();
  }
  //end of cases per day chart creation

  //total deaths chart creation
  function createTotalDeathsData(data) {
    newChartNameTotalDeaths = data[0].location;
    newChartDataTotalDeaths = [];

    for (let index = 0; index < data[0].data.length; index += 1) {
      newChartDataTotalDeaths.push(data[0].data[index].total_deaths);
    }

    chartInitialFixer(newChartDataTotalDeaths);
    newObjTotalDeaths.push({
      name: newChartNameTotalDeaths,
      data: newChartDataTotalDeaths,
    });

    chart8.update();
  }
  //end of total deaths chart creation

  //deaths per day chart creation
  function createDeathsPerDayData(data) {
    newChartNameDeathsPerDay = data[0].location;
    newChartDataDeathsPerDay = [];

    for (let index = 0; index < data[0].data.length; index += 1) {
      if (data[0].data[index].new_deaths >= 0) {
        newChartDataDeathsPerDay.push(data[0].data[index].new_deaths);
      } else {
        newChartDataDeathsPerDay.push(0);
      }
    }
    chartInitialFixer(newChartDataDeathsPerDay);
    newObjDeathsPerDay.push({
      name: newChartNameDeathsPerDay,
      data: newChartDataDeathsPerDay,
    });
    chart9.update();
  }
  //end of deaths per day chart creation
}


//const that holds the selected country and the event
const countryChange = document.getElementsByClassName("countries")[0];
countryChange.addEventListener("change", function () {
  chartCountries.push(countryChange.value);
  newCallFetch();
});

//X axis construction
let label2 = [];
for (let index = 0; index < 200; index += 1) {
  label2.push(index);
}


//removing from graph function
function removingFromGraph() {
  //gets the selected by the classlist with bg-danger
  let trSelected = document.querySelectorAll("tr");
  let countryToBeRemoved = "";
  const filtered = [...trSelected].filter(
    (selected) => selected.classList.contains("bg-danger") === true
  );
  countryToBeRemoved = filtered[0].classList.item(1);

  if( countryToBeRemoved.includes('-') === true) {
    for (let i = 0; i<countryToBeRemoved.length; i += 1) {
    countryToBeRemoved = countryToBeRemoved.replace('-', ' ')
    }
  }
 
  
  let indexToRemove = chartCountries.indexOf(countryToBeRemoved);
  if (indexToRemove === -1) return;
  chartCountries.splice(indexToRemove, 1)
  newObjTotalCases.splice(indexToRemove, 1)
  newObjCasesPerDay.splice(indexToRemove, 1)
  newObjTotalDeaths.splice(indexToRemove, 1)
  newObjDeathsPerDay.splice(indexToRemove, 1)
  alreadyCreated.splice(indexToRemove, 1)

  chart6.update()
  chart7.update()
  chart8.update()
  chart9.update()
}

//instancing removal button and function
const removeBut = document.getElementsByClassName("remove")[0];
removeBut.addEventListener("click", removingFromGraph);


//chart defaults
const lineChart = {
  type: "line",
  height: 350,
  foreColor: "#fff",
  zoom: {
    enabled: false,
  },
  toolbar: {
    show: false,
  },
  animations: {
    enabled: false
  }
};

const colors = [
  "rgb(210, 33, 41)",
  "rgb(40, 163, 73)",
  "rgb(249, 239, 30)",
  "rgb(35, 61, 148)",
  "rgb(246, 127, 33)",
  "rgb(255, 255, 255)",
  "rgb(245, 36, 156)",
  "rgb(151, 145, 141)",
  "rgb(89, 160, 198)",
  "rgb(143, 25, 179)",
  "rgb(87, 123, 97)",
  "rgb(92, 57, 35)",
  "rgb(118, 119, 30)",
  "rgb(141, 18, 39)",
  "rgb(35, 223, 156)",
  "rgb(35, 168, 187)",
];
const lineChartLegend = {
  position: "top",
  horizontalAlign: "center",
  offsetX: 40,
  labels: {
    colors: "#fff",
  },
};
const lineChartTooltipCases = {
  y: {
    formatter: function (val) {
      return val + " cases";
    },
  },
};

const lineChartTooltipDeaths = {
  y: {
    formatter: function (val) {
      return val + " deaths";
    },
  },
};

const lineChartStroke = {
  curve: "smooth",
};
//end of chart defaults

//total cases chart
let options6 = {
  chart: lineChart,
  colors: colors,
  stroke: lineChartStroke,
  series: [],
  xaxis: {
    type: "numeric",
    categories: label2,
    tickAmount: 10,
    title: {
      text: "days from day one",
      offsetY: 10,
    },
  },
  yaxis: {
    title: {
      text: "cases",
    },
  },
  legend: lineChartLegend,
  tooltip: lineChartTooltipCases,
  title: {
    text: "total accumulated cases",
    align: "center",
  },
};
let chart6 = new ApexCharts(document.querySelector("#chart6"), options6);
chart6.render();
//end of new cases chart

//new cases chart
let options7 = {
  chart: lineChart,
  colors: colors,
  stroke: lineChartStroke,
  series: [],
  xaxis: {
    type: "numeric",
    categories: label2,
    tickAmount: 10,
    title: {
      text: "days from day one",
      offsetY: 10,
    },
  },
  yaxis: {
    title: {
      text: "cases",
    },
  },
  legend: lineChartLegend,
  tooltip: lineChartTooltipCases,
  title: {
    text: "new cases/day",
    align: "center",
  },
};
let chart7 = new ApexCharts(document.querySelector("#chart7"), options7);
chart7.render();
//end of new cases chart

//total death chart
let options8 = {
  chart: lineChart,
  colors: colors,
  stroke: lineChartStroke,
  series: [],
  xaxis: {
    type: "numeric",
    categories: label2,
    tickAmount: 10,
    title: {
      text: "days from day one",
      offsetY: 10,
    },
  },
  yaxis: {
    title: {
      text: "deaths",
    },
  },
  legend: lineChartLegend,
  tooltip: lineChartTooltipDeaths,
  title: {
    text: "total deaths",
    align: "center",
  },
};
let chart8 = new ApexCharts(document.querySelector("#chart8"), options8);
chart8.render();
//end of death chart

//deaths per day chart
let options9 = {
  chart: lineChart,
  colors: colors,
  stroke: lineChartStroke,
  series: [],
  xaxis: {
    type: "numeric",
    categories: label2,
    tickAmount: 10,
    title: {
      text: "days from day one",
      offsetY: 10,
    },
  },
  yaxis: {
    title: {
      text: "deaths",
    },
  },
  legend: lineChartLegend,
  tooltip: lineChartTooltipDeaths,
  title: {
    text: "new deaths/day",
    align: "center",
  },
};
let chart9 = new ApexCharts(document.querySelector("#chart9"), options9);
chart9.render();
//end of deaths per day chart

//objects that receives data in charts
const newObjTotalCases = options6.series;
const newObjCasesPerDay = options7.series;
const newObjTotalDeaths = options8.series;
const newObjDeathsPerDay = options9.series;
