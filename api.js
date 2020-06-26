const option = {
  method: "GET",
  mode: "cors",
  cache: "default",
};

function callFetch() {
  fetch(`https://coronavirus-19-api.herokuapp.com/countries`, option).then(
    (response) => {
      response.json().then((data) => apiConstruction(data));
    }
  );
}

callFetch();

//ELEMENTO QUE RECEBE AVISOS
const headerElement = document.getElementsByTagName("header")[0];
let chartCountries1 = [
  "World",
  "Brazil",
  "USA",
  "France",
  "Italy",
];
let createdCountries = [];
let noPercentageCountries = [];
let selecter = 0;

function apiConstruction(data) {
  const actives = options1.series[0].data;
  const recovered = options1.series[1].data;
  const deaths = options1.series[2].data;
  const countryCalled = options1.xaxis.categories;
  const newObjCasesPerMillion = options2.series;
  const newObjDeathsPerMillion = options3.series;
  const newObjTestPerMillion = options4.series;

  const country = chartCountries1.forEach( element => {
    console.log(element)
  const arrSearch = data.filter((arr) => arr.country === element)[0];
  if (createdCountries.includes(arrSearch.country) === true) {
    return;
  }

  newObjCasesPerMillion.push({
    name: arrSearch.country,
    data: [arrSearch.casesPerOneMillion],
  });
  newObjDeathsPerMillion.push({
    name: arrSearch.country,
    data: [arrSearch.deathsPerOneMillion],
  });

  if (arrSearch.testsPerOneMillion === null) {
    arrSearch.testsPerOneMillion = 0;
  }
  newObjTestPerMillion.push({
    name: arrSearch.country,
    data: [arrSearch.testsPerOneMillion],
  });
  createdCountries.push(arrSearch.country);

  chart2.update();
  chart3.update();
  chart4.update();

  if (
    arrSearch.active === 0 ||
    arrSearch.recovered === 0 ||
    arrSearch.active === null ||
    arrSearch.recovered === null
  ) {
    noPercentageCountries.push(arrSearch.country);
    let div = document.getElementById("alertMessage");
    div.style.display = "block";
    div.innerHTML = `Ops, ${country} has no atives or recovereds numbers to be shown at the percentage chart`;
    headerElement.appendChild(div);
    setTimeout(function () {
      div.style.display = "none";
    }, 7000);
    return;
  }
  countryCalled.push(arrSearch.country);
  actives.push(arrSearch.active);
  recovered.push(arrSearch.recovered);
  deaths.push(arrSearch.deaths);

  chart.update();
 })
}

// bar chart defaults
const colors1 = [
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

const barChart = {
  toolbar: {
    show: false,
  },
  type: "bar",
  height: 350,
  foreColor: "#fff",
};

const barPlotOptions = {
  bar: {
    horizontal: false,
    columnWidth: "55%",
    endingShape: "rounded",
  },
};

const barLegends = {
  position: "top",
  horizontalAlign: "left",
  offsetX: 40,
  labels: {
    colors: "#fff",
  },
};

const barStroke = {
  show: true,
  width: 2,
  colors: ["transparent"],
};

var options1 = {
  series: [
    {
      name: "Actives",
      data: [],
    },
    {
      name: "Recovereds",
      data: [],
    },
    {
      name: "Deaths",
      data: [],
    },
  ],
  chart: {
    toolbar: {
      show: false,
    },
    type: "bar",
    foreColor: "#fff",
    height: 350,
    stacked: true,
    stackType: "100%",
    width: "100%",
  },
  colors: ["#1FA2B8", "#28A745", "#DC3545"],
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  stroke: {
    width: 1,
    colors: ["#ccc"],
  },
  title: {
    text: "percentage of actives, recovereds and deaths",
    align: "center",
    style: {
      color: "#fff",
    },
  },
  xaxis: {
    categories: [],
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val;
      },
    },
  },
  fill: {
    opacity: 1,
    colors: ["#1FA2B8", "#28A745", "#DC3545"],
    /* type: 'pattern',
    opacity: 1,
    pattern: {
      style: ['circles', 'slantedLines', 'verticalLines']
    }, */
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    offsetX: 40,
    labels: {
      colors: "#fff",
    },
    markers: {
      fillColors: ["#1FA2B8", "#28A745", "#DC3545"],
    },
  },
};
var chart = new ApexCharts(document.querySelector("#chart"), options1);

chart.render();

const optSelected = document.getElementsByClassName("countries")[0];
optSelected.addEventListener("change", function () {
  callFetch(optSelected.value);
});
const delCountry = document.getElementsByClassName("remove")[0];
delCountry.addEventListener("click", removingFromBarGraph);

var options2 = {
  series: [],
  chart: barChart,
  colors: colors1,
  plotOptions: barPlotOptions,
  dataLabels: {
    enabled: false,
  },
  stroke: barStroke,
  xaxis: {
    categories: ["countries"],
  },
  yaxis: {
    title: {
      text: "cases/million",
    },
  },
  fill: {
    opacity: 1,
  },
  legend: barLegends,
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " cases/million";
      },
    },
  },
  title: {
    text: "cases/million",
    align: "center",
    style: {
      color: "#fff",
    },
  },
};
var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
chart2.render();

var options3 = {
  series: [],
  chart: barChart,
  colors: colors1,
  plotOptions: barPlotOptions,
  dataLabels: {
    enabled: false,
  },
  stroke: barStroke,
  xaxis: {
    categories: ["countries"],
  },
  yaxis: {
    title: {
      text: "deaths/million",
    },
  },
  fill: {
    opacity: 1,
  },
  legend: barLegends,
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " deaths/million";
      },
    },
  },
  title: {
    text: "deaths/million",
    align: "center",
    style: {
      color: "#fff",
    },
  },
};

var chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
chart3.render();

var options4 = {
  series: [],
  chart: barChart,
  colors: colors1,
  plotOptions: barPlotOptions,
  dataLabels: {
    enabled: false,
  },
  stroke: barStroke,
  xaxis: {
    categories: ["countries"],
  },
  yaxis: {
    title: {
      text: "tests/million",
    },
  },
  fill: {
    opacity: 1,
  },
  legend: barLegends,
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " tests/million";
      },
    },
  },
  title: {
    text: "tests/million",
    align: "center",
    style: {
      color: "#fff",
    },
  },
};

var chart4 = new ApexCharts(document.querySelector("#chart4"), options4);
chart4.render();

function removingFromBarGraph() {
  let trSelected = document.querySelectorAll("tr");
  let countryToBeRemoved = "";
  const filtered = [...trSelected].filter(
    (selected) => selected.classList.contains("bg-danger") === true
  );
  countryToBeRemoved = filtered[0].classList.item(1);
  let indexToRemove = createdCountries.indexOf(countryToBeRemoved);
  if (indexToRemove === -1) return;
  createdCountries.splice(indexToRemove, 1);

  if (noPercentageCountries.includes(countryToBeRemoved) === false) {
    options1.series[0].data.splice(indexToRemove, 1);
    options1.series[1].data.splice(indexToRemove, 1);
    options1.series[2].data.splice(indexToRemove, 1);
    options1.xaxis.categories.splice(indexToRemove, 1);
  }
  options2.series.splice(indexToRemove, 1);
  options3.series.splice(indexToRemove, 1);
  options4.series.splice(indexToRemove, 1);

  chart.update();
  chart2.update();
  chart3.update();
  chart4.update();
  countryToBeRemoved = "";
}
