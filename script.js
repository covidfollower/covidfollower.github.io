const spanCases = document.getElementsByClassName("span-cases");
const spanCritical = document.getElementsByClassName("span-critical");
const spanDeaths = document.getElementsByClassName("span-deaths");
const spanTests = document.getElementsByClassName("span-tests");
const spanRecovered = document.getElementsByClassName("span-recovered");
const spanCasesMillion = document.getElementsByClassName("span-cases-million");
const spanDeathsMillion = document.getElementsByClassName(
  "span-deaths-million"
);
const spanTestsMillion = document.getElementsByClassName("span-tests-million");
const spanTodayCases = document.getElementsByClassName("span-today-cases");
const spanTodayDeaths = document.getElementsByClassName("span-today-deaths");
const totalCases = document.getElementById("total-cases");

const options = {
  method: "GET",
  mode: "cors",
  cache: "default",
};

fetch("https://coronavirus-19-api.herokuapp.com/countries", options).then(
  (response) => {
    response.json().then((data) => mainConstruction(data));
  }
);

const selectCountry = document.getElementById("countries");
if (selectCountry.className === "default") {
  selectCountry.style.color = "lightgray";
}
const tableHead = document.getElementById("tbHead");

function mainConstruction(data) {
  /* CONSTRUÇÃO DO OPTIONS DO SELECT */
  function optionConstruction(data) {
    let arr = [];
    for (let i = 0; i < data.length; i += 1) {
      arr.push(data[i].country);
    }
    arr.sort();
    for (let i = 0; i < arr.length; i += 1) {
      let options = document.createElement("option");
      options.value = arr[i];
      options.innerHTML = arr[i];
      selectCountry.appendChild(options);
    }
  }

  /* FUNCAO AUXILIAR NA BUSCA DO INDEX DO SELECT */
  function finder(data, country) {
    for (i = 0; i < data.length; i += 1) {
      if (data[i].country === country) {
        return i;
      }
    }
  }

  /* CONFIGURAÇÕES DO OPTION SELECIONADO */
  const customOneName = document.getElementById("customOneName");
  const customOneOpt = document.getElementById("countries");
  let index = 0;
  customOneOpt.addEventListener("change", function () {
    index = finder(data, customOneOpt.value);
    if (customOneOpt.value != "default") {
      tableConstructor(data, customOneOpt.value);
      customOneOpt.value = "default";
    }

    //customOneOpt.value = "default";
  });

  let posicao = 1;
  const headerElement = document.getElementsByTagName("header")[0];
  const thKeys = Object.keys(data[0]);
  function tableConstructor(data, country) {
    let div = document.getElementById("alertMessage");
    for (i = 0; i < tableDelete.length; i += 1) {
      if (tableDelete[i].classList.item(1) === country) {
        div.style.display = "block";
        div.innerHTML = `Ops, ${country} is being shown in the table, please choose another country for comparison`;
        headerElement.appendChild(div);
        setTimeout(function () {
          div.style.display = "none";
        }, 7000);
        return;
      }
    }

    const rowFather = document.getElementsByTagName("tbody")[0];
    let newRow = document.createElement("tr");
    newRow.classList.add(posicao);
    rowFather.appendChild(newRow);

    let newTH = document.createElement("th");
    newTH.innerHTML = posicao;
    newTH.scope = "row";
    newTH.classList.add("numero", posicao);

    let tableIndex = finder(data, country);

    // SOLUCIONANDO O PROBLEMA DE NOMES COM ESPAÇO ***************************
    let name = data[tableIndex][thKeys[0]].split(" ");
    if (name.length > 1) {
      name = name.join("-");
    }
    // FIM ********************************************************************
    newRow.classList.add(name);
    let totalCase = data[tableIndex][thKeys[1]];
    let todayCases = data[tableIndex][thKeys[2]];
    let totalDeaths = data[tableIndex][thKeys[3]];
    let todayDeaths = data[tableIndex][thKeys[4]];
    let comparsionCase = (todayCases / totalCase) * 100;
    let comparsionDeaths = (todayDeaths / totalDeaths) * 100;

    for (i = 0; i < 12; i += 1) {
      let newData = document.createElement("td");
      newRow.appendChild(newData);
      if (data[tableIndex][thKeys[i]] != null) {
        newData.innerHTML = data[tableIndex][thKeys[i]].toLocaleString("pt-BR");
        newData.className = "text-center";
        newData.classList.add(posicao);
        newData.classList.add("data" + i);
      }
      if (newData.innerHTML == "") {
        newData.innerHTML = 0;
        newData.className = "text-center";
        newData.classList.add(posicao);
        newData.classList.add("data" + i);
      }

      if (thKeys[i] === "todayCases") {
        if (data[tableIndex][thKeys[i]] != 0) {
          newData.innerHTML = `${data[tableIndex][thKeys[i]].toLocaleString(
            "pt-BR"
          )} <span class="text-info" style="font-size: 12px">(${comparsionCase.toFixed(
            2
          )}%)<i class="fas fa-level-up-alt"></i></span> `;
        }
      }
      if (thKeys[i] === "todayDeaths") {
        if (data[tableIndex][thKeys[i]] != 0) {
          newData.innerHTML = `${data[tableIndex][thKeys[i]].toLocaleString(
            "pt-BR"
          )} <span class="text-danger" style="font-size: 12px">(${comparsionDeaths.toFixed(
            2
          )}%)<i class="fas fa-level-up-alt"></i></span> `;
        }
      }
    }

    posicao += 1;
  }


  tableConstructor(data, "World");
  tableConstructor(data, "Brazil");
  tableConstructor(data, "USA");
  tableConstructor(data, "Russia");
  tableConstructor(data, "Italy");
  tableConstructor(data, "France");
  optionConstruction(data);
}
const deletedRow = document.getElementsByTagName("tbody")[0];
let deletePosition = 1000;
deletedRow.addEventListener("click", selectToDelete);
let tableDelete = document.getElementsByTagName("tr");
function selectToDelete(event) {
  let target = event.target;
  let compare = target.classList.item(1);

  for (i = 0; i < tableDelete.length; i += 1) {
    if (tableDelete[i].classList.contains(compare)) {
      if (tableDelete[i].classList.contains("bg-danger")) {
        tableDelete[i].classList.remove("bg-danger");
      } else {
        for (let j = 0; j < tableDelete.length; j += 1) {
          tableDelete[j].classList.remove("bg-danger");
        }
        tableDelete[i].classList.add("bg-danger");
        deletePosition = i;
      }
    }
  }
}

let deleteButton = document.getElementsByClassName("remove")[0];
deleteButton.addEventListener("click", function () {
  deleteAll();
  function deleteAll() {
    for (i = 0; i < tableDelete.length; i += 1) {
      if (tableDelete[i].classList.contains("bg-danger")) {
        deletedRow.removeChild(tableDelete[i]);
        deleteAll();
      }
    }
  }
});

let numberCorrection = document.getElementsByClassName("numero");
