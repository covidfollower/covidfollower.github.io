/* FUNÇAO QUE CRIA O BOX WORLD */
function showAllWorldCases(data) {
  const cases = data[0].cases;
  const recovered = data[0].recovered;
  const todayCases = data[0].todayCases;
  const todayDeaths = data[0].todayDeaths;
  const active = data[0].active;
  const critical = data[0].critical;
  const totalTests = data[0].totalTests;
  const casesPerOneMillion = data[0].casesPerOneMillion;
  const deathsPerOneMillion = data[0].deathsPerOneMillion;
  const testsPerOneMillion = data[0].testsPerOneMillion;
  const deaths = data[0].deaths;
  
  /* CONDIÇÃO PARA CASOS IGUAL 0 */
  if(cases === 0){
    spanCases
    [0].innerHTML = '-'
  } else{
    spanCases[0].innerHTML = cases.toLocaleString('pt-BR');
  }
  /* CONDIÇÃO PARA MORTES IGUAL A 0 */
  if(deaths === 0){
    spanDeaths[0].innerHTML = '-'
  } else{
    spanDeaths[0].innerHTML = deaths.toLocaleString('pt-BR');
  }
  /* CONDIÇÃO PARA CRITICAL IGUAL 0 */
  if(critical === 0){
    spanCritical[0].innerHTML = '-'
  } else{
    spanCritical[0].innerHTML = critical.toLocaleString('pt-BR');
  }
  /* CONDIÇÃO PARA TESTES IGUAL 0 */
  if(totalTests === 0){
    spanTests[0].innerHTML = '-'
  } else{
    spanTests[0].innerHTML = totalTests.toLocaleString('pt-BR');
  }
  /* CONDIÇÃO PARA RECOVERED IGUAL 0 */
  if(recovered === 0){
    spanRecovered[0].innerHTML = '-'
  } else {
    spanRecovered[0].innerHTML = recovered.toLocaleString('pt-BR');
  }
  /* CONDIÇÃO PARA CASOS POR MILHAO IGUAL 0 */
  if(casesPerOneMillion === 0){
    spanCasesMillion[0].innerHTML = '-'
  } else{
    spanCasesMillion[0].innerHTML = casesPerOneMillion.toLocaleString('pt-BR');
  }
  /* CONDIÇÃO PARA MORTES POR MILHAO IGUAL 0 */
  if(deathsPerOneMillion === 0){
    spanDeathsMillion[0].innerHTML = '-'
  } else{
    spanDeathsMillion[0].innerHTML = deathsPerOneMillion.toLocaleString('pt-BR');
  }
  /* CONDIÇÃO PARA CASOS HOJE IGUAL 0 */
  if(todayCases=== 0){
    spanTodayCases[0].innerHTML = '-'
  } else{
    spanTodayCases[0].innerHTML = todayCases.toLocaleString('pt-BR');
  }
  /* CONDICAO PARA MORTES HOJE IGUAL 0*/
  if(todayDeaths === 0) {
    spanTodayDeaths[0].innerHTML = '-';
  } else {
    spanTodayDeaths[0].innerHTML = todayDeaths.toLocaleString('pt-BR');
  }
  /* CONDIÇÃO PARA TESTES POR MILHAO IGUAL A 0 */
  if(testsPerOneMillion === 0) {
    spanTestsMillion[0].innerHTML = '-';
  } else {
    spanTestsMillion[0].innerHTML = testsPerOneMillion.toLocaleString('pt-BR');
  }
} 


/* FUNÇAO QUE CRIA O BOX BRAZIL */
  function showAllBrazilCases(data) {
    const index = finder(data, 'Brazil');
    const cases = data[index].cases;
    const recovered = data[index].recovered;
    const todayCases = data[index].todayCases;
    const todayDeaths = data[index].todayDeaths;
    const active = data[index].active;
    const critical = data[index].critical;
    const totalTests = data[index].totalTests;
    const casesPerOneMillion = data[index].casesPerOneMillion;
    const deathsPerOneMillion = data[index].deathsPerOneMillion;
    const testsPerOneMillion = data[index].testsPerOneMillion;
    const deaths = data[index].deaths;
    
    /* CONDIÇÃO PARA CASOS IGUAL 0 */
     if(cases === 0){
       spanCases
       [1].innerHTML = '-'
      } else{
      spanCases[1].innerHTML = cases.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA MORTES IGUAL A 0 */
    if(deaths === 0){
      spanDeaths[1].innerHTML = '-'
    } else{
      spanDeaths[1].innerHTML = deaths.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA CRITICAL IGUAL 0 */
    if(critical === 0){
      spanCritical[1].innerHTML = '-'
    } else{
      spanCritical[1].innerHTML = critical.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA TESTES IGUAL 0 */
    if(totalTests === 0){
      spanTests[1].innerHTML = '-'
    } else{
      spanTests[1].innerHTML = totalTests.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA RECOVERED IGUAL 0 */
    if(recovered === 0){
      spanRecovered[1].innerHTML = '-'
    } else {
      spanRecovered[1].innerHTML = recovered.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA CASOS POR MILHAO IGUAL 0 */
    if(casesPerOneMillion === 0){
      spanCasesMillion[1].innerHTML = '-'
    } else{
      spanCasesMillion[1].innerHTML = casesPerOneMillion.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA MORTES POR MILHAO IGUAL 0 */
    if(deathsPerOneMillion === 0){
      spanDeathsMillion[1].innerHTML = '-'
    } else{
      spanDeathsMillion[1].innerHTML = deathsPerOneMillion.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA CASOS HOJE IGUAL 0 */
    if(todayCases=== 0){
      spanTodayCases[1].innerHTML = '-'
    } else{
      spanTodayCases[1].innerHTML = todayCases.toLocaleString('pt-BR');
    }
    /* CONDICAO PARA MORTES HOJE IGUAL 0*/
    if(todayDeaths === 0) {
      spanTodayDeaths[1].innerHTML = '-';
    } else {
      spanTodayDeaths[1].innerHTML = todayDeaths.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA TESTES POR MILHAO IGUAL A 0 */
    if(testsPerOneMillion === 0) {
      spanTestsMillion[1].innerHTML = '-';
    } else {
      spanTestsMillion[1].innerHTML = testsPerOneMillion.toLocaleString('pt-BR');
    }
  } 


  /* FUNÇAO QUE CRIA O BOX CUSTOMIZADO */
  function showAllCustom1Cases(data, index) {
    
    customOneName.innerHTML = data[index].country
    const cases = data[index].cases;
    const recovered = data[index].recovered;
    const todayCases = data[index].todayCases;
    const todayDeaths = data[index].todayDeaths;
    const active = data[index].active;
    const critical = data[index].critical;
    const totalTests = data[index].totalTests;
    const casesPerOneMillion = data[index].casesPerOneMillion;
    const deathsPerOneMillion = data[index].deathsPerOneMillion;
    const testsPerOneMillion = data[index].testsPerOneMillion;
    const deaths = data[index].deaths;
    
    
    /* CONDIÇÃO PARA CASOS IGUAL 0 */
    if(cases === 0){
      spanCases
      [2].innerHTML = '-'
    } else{
      spanCases[2].innerHTML = cases.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA MORTES IGUAL A 0 */
    if(deaths === 0){
      spanDeaths[2].innerHTML = '-'
    } else{
      spanDeaths[2].innerHTML = deaths.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA CRITICAL IGUAL 0 */
    if(critical === 0){
      spanCritical[2].innerHTML = '-'
    } else{
      spanCritical[2].innerHTML = critical.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA TESTES IGUAL 0 */
    if(totalTests === 0){
      spanTests[2].innerHTML = '-'
    } else{
      spanTests[2].innerHTML = totalTests.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA RECOVERED IGUAL 0 */
    if(recovered === 0){
      spanRecovered[2].innerHTML = '-'
    } else {
      spanRecovered[2].innerHTML = recovered.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA CASOS POR MILHAO IGUAL 0 */
    if(casesPerOneMillion === 0){
      spanCasesMillion[2].innerHTML = '-'
    } else{
      spanCasesMillion[2].innerHTML = casesPerOneMillion.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA MORTES POR MILHAO IGUAL 0 */
    if(deathsPerOneMillion === 0){
      spanDeathsMillion[2].innerHTML = '-'
    } else{
      spanDeathsMillion[2].innerHTML = deathsPerOneMillion.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA CASOS HOJE IGUAL 0 */
    if(todayCases=== 0){
      spanTodayCases[2].innerHTML = '-'
    } else{
    spanTodayCases[2].innerHTML = todayCases.toLocaleString('pt-BR');
  }
  /* CONDICAO PARA MORTES HOJE IGUAL 0*/
  if(todayDeaths === 0) {
      spanTodayDeaths[2].innerHTML = '-';
    } else {
      spanTodayDeaths[2].innerHTML = todayDeaths.toLocaleString('pt-BR');
    }
    /* CONDIÇÃO PARA TESTES POR MILHAO IGUAL A 0 */
    if(testsPerOneMillion === 0) {
      spanTestsMillion[2].innerHTML = '-';
    } else {
      spanTestsMillion[2].innerHTML = testsPerOneMillion.toLocaleString('pt-BR');
    }

  };