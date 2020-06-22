const option = {
  method: "GET",
  mode: "cors",
  cache: "default",
};

function callFetch(country) {
  fetch(
    `https://coronavirus-19-api.herokuapp.com/countries`,
    option
  ).then((response) => {
    response.json().then((data) => apiConstruction(data, country));
  });
}

callFetch('World')
callFetch('Brazil');
callFetch('USA')
callFetch('Spain')
callFetch('France')
callFetch('Italy')

//GERADOR DE CORES ALEAT?RIAS
function randomColor() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}


const createdCountries = []

function apiConstruction(data, country) {
  const actives = options1.series[0].data
  const recovered = options1.series[1].data
  const deaths = options1.series[2].data
  const countryCalled = options1.xaxis.categories
  const newObjCasesPerMillion = options2.series
  const newObjDeathsPerMillion = options3.series
  const newObjTestPerMillion = options4.series
  const barColor = randomColor()

  const arrSearch = data.filter( arr => arr.country === country)[0];


  if (arrSearch.active === 0 || arrSearch.recovered === 0 ||  arrSearch.active === null || arrSearch.recovered === null || createdCountries.includes(arrSearch.country) === true) {
    return
  }
  
  countryCalled.push(arrSearch.country)
  createdCountries.push(arrSearch.country)
  actives.push(arrSearch.active)
  recovered.push(arrSearch.recovered)
  deaths.push(arrSearch.deaths)
  newObjCasesPerMillion.push({name : arrSearch.country, data : [arrSearch.casesPerOneMillion]})
  newObjDeathsPerMillion.push({name : arrSearch.country, data : [arrSearch.deathsPerOneMillion]})

  options2.fill.colors.push(barColor)
  options2.legend.markers.fillColors.push(barColor)
  options3.fill.colors.push(barColor)
  options3.legend.markers.fillColors.push(barColor)
  options4.fill.colors.push(barColor)
  options4.legend.markers.fillColors.push(barColor)

  if(arrSearch.testsPerOneMillion === null) {
    arrSearch.testsPerOneMillion = 0
  }
  newObjTestPerMillion.push({name : arrSearch.country, data : [arrSearch.testsPerOneMillion]})

  chart.update();
  chart2.update();
  chart3.update();
  chart4.update();
}


//ESTRUTURA PADR?O DO GRAFICO
var options1 = {
  series: [{
    name: 'Actives',
    data: []
  }, {
    name: 'Recovereds',
    data: []
  }, {
    name: 'Deaths',
    data: []
  }],
    chart: {
    toolbar: {
      show: false,
    },
    type: 'bar',
    foreColor: '#fff',
    height: 350,
    stacked: true,
    stackType: '100%',
    width: '100%',
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  stroke: {
    width: 1,
    colors: ['#ccc']
  },
  title: {
    text: 'Percentage of Actives, Recovereds and Deaths',
    align: 'center',
    style: {
      color: '#fff'
    }
  },
  xaxis: {
    categories: [],
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val 
      }
    }
  },
  fill: {
    opacity: 1,
    colors: ['#1FA2B8', '#28A745', '#DC3545'],
    /* type: 'pattern',
    opacity: 1,
    pattern: {
      style: ['circles', 'slantedLines', 'verticalLines']
    }, */
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    offsetX: 40,
    labels: {
      colors: '#fff',
    },
    markers: {
      fillColors: ['#1FA2B8', '#28A745', '#DC3545']
    }
  },
  };
var chart = new ApexCharts(document.querySelector("#chart"), options1);

chart.render();



const optSelected = document.getElementsByClassName('countries')[0];
optSelected.addEventListener('change', function () {  
  callFetch(optSelected.value)
})
const delCountry =  document.getElementsByClassName('remove')[0];
delCountry.addEventListener('click', removingFromBarGraph)

var options2 = {
  series: [],
  chart: {
  toolbar: {
    show : false,
  },
  type: 'bar',
  height: 350,
  foreColor: '#fff'
},
plotOptions: {
  bar: {
    horizontal: false,
    columnWidth: '55%',
    endingShape: 'rounded'
  },
},
dataLabels: {
  enabled: false
},
stroke: {
  show: true,
  width: 2,
  colors: ['transparent']
},
xaxis: {
  categories: ['Countries'],
},
yaxis: {
  title: {
    text: 'cases/million'
  }
},
fill: {
  opacity: 1,
  colors: []
},
legend: {
  position: 'top',
  horizontalAlign: 'left',
  offsetX: 40,
  labels: {
    colors: '#fff',
  },
  markers: {
    fillColors: []
  }
},
tooltip: {
  y: {
    formatter: function (val) {
      return val + " cases/million"
    }
  }
},
title: {
  text: 'Cases/Million',
  align: 'center',
  style: {
    color: '#17A2B8'
  },
}
}
var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
chart2.render();

var options3 = {
  series: [],
  chart: {
  toolbar : {
    show: false,
  },
  type: 'bar',
  height: 350,
  foreColor: '#fff'
},
plotOptions: {
  bar: {
    horizontal: false,
    columnWidth: '55%',
    endingShape: 'rounded'
  },
},
dataLabels: {
  enabled: false
},
stroke: {
  show: true,
  width: 2,
  colors: ['transparent']
},
xaxis: {
  categories: ['Countries'],
},
yaxis: {
  title: {
    text: 'deaths/million'
  }
},
fill: {
  opacity: 1,
  colors: [],
},
legend: {
  position: 'top',
  horizontalAlign: 'left',
  offsetX: 40,
  labels: {
    colors: '#fff',
  },
  markers: {
    fillColors: []
  }
},
tooltip: {
  y: {
    formatter: function (val) {
      return val + " deaths/million"
    }
  }
},
title: {
  text: 'Deaths/Million',
  align: 'center',
  style: {
    color: '#DC3545'
  },
}
}

var chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
chart3.render();

var options4 = {
  series: [],
  chart: {
  toolbar: {
    show : false,
  },
  type: 'bar',
  height: 350,
  foreColor: '#fff'
},
plotOptions: {
  bar: {
    horizontal: false,
    columnWidth: '55%',
    endingShape: 'rounded'
  },
},
dataLabels: {
  enabled: false,
},
stroke: {
  show: true,
  width: 2,
  colors: ['transparent']
},
xaxis: {
  categories: ['Countries'],
},
yaxis: {
  title: {
    text: 'tests/million'
  }
},
fill: {
  opacity: 1,
  colors: [],
},
legend: {
  position: 'top',
  horizontalAlign: 'left',
  offsetX: 40,
  labels: {
    colors: '#fff',
  },
  markers: {
    fillColors: []
  }
},
tooltip: {
  y: {
    formatter: function (val) {
      return val + " tests/million"
    }
  },
  marker: {
    show: false
  }
},
title: {
  text: 'Tests/Million',
  align: 'center',
  style: {
    color: '#0072D4'
  },
}
}

var chart4 = new ApexCharts(document.querySelector("#chart4"), options4);
chart4.render();


function removingFromBarGraph() {
  let trSelected = document.querySelectorAll("tr");
  let countryToBeRemoved = '';
  const filtered = [...trSelected].filter( selected => selected.classList.contains('bg-danger') === true);
  countryToBeRemoved = filtered[0].classList.item(1)

  let indexToRemove = createdCountries.indexOf(countryToBeRemoved);
  if(indexToRemove === -1) return
  console.log(indexToRemove)
  createdCountries.splice(indexToRemove, 1)
  options1.series[0].data.splice(indexToRemove, 1)
  options1.series[1].data.splice(indexToRemove, 1)
  options1.series[2].data.splice(indexToRemove, 1)
  options1.xaxis.categories.splice(indexToRemove, 1)
  options2.series.splice(indexToRemove, 1)
  options3.series.splice(indexToRemove, 1)
  options4.series.splice(indexToRemove, 1)
  
  chart.update()
  chart2.update()
  chart3.update()
  chart4.update()
  countryToBeRemoved = ''
};
