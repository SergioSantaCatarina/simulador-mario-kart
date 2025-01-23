/* definindo os players como objetos */
const player1 ={
    nome:"Mario",
    velocidade: 4,
    manobrabilidade:3,
    poder:3,
    pontosRace:0,
    pontosRound:0,
    habilidadeRound:"",
    habilidadeRoundValue:0,
    rollDiceRoundVallue:0
}

const player2 ={
    nome:"Luigi",
    velocidade: 3,
    manobrabilidade:4,
    poder:4,
    pontosRace:0,
    pontosRound:0,
    habilidadeRound:"",
    habilidadeRoundValue:0,
    rollDiceRoundVallue:0
}

/* função asyncrona para rolar o dado e retornar o resultado */
async function rollDice() {
  return Math.floor(Math.random() * 6) +1;
};

/* função asyncrona para sortear o bloco reta/curva/confronto */
async function getRandomBlock() {
  let random =Math.random();
  let result;
  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  };
  return result;
};

/* declarando a função playRaceEngine, que executará a disputa, recebendo os dois players */
async function playRaceEngine(block, runner) {
  
  // lançar dado para corredor recebido
  let diceResult = await rollDice();
  runner.rollDiceRoundVallue = diceResult;

  //calculando pontos do round para o corredor recebido conforme o bloco recebido
  if(block === "RETA") {
    runner.habilidadeRound = "Velocidade";
    runner.habilidadeRoundValue = runner.velocidade;
    runner.pontosRound = diceResult + runner.velocidade;
  }else if(block === "CURVA") {
    runner.habilidadeRound = "Manobrabilidade";  
    runner.habilidadeRoundValue = runner.manobrabilidade;
    runner.pontosRound = diceResult + runner.manobrabilidade;
   
  }else if(block === "CONFRONTO") {
    runner.habilidadeRound = "Poder";  
    runner.habilidadeRoundValue = runner.poder;
    runner.pontosRound = diceResult + runner.poder; 
  };
};

async function checkRoundWinner(block,runner1,runner2) {

  if ((block === "RETA") || (block === "CURVA")) {
    if(runner1.pontosRound > runner2.pontosRound) {
      runner1.pontosRace++;
    }else if(runner2.pontosRound > runner1.pontosRound) {
      runner2.pontosRace++;
    }
  }else if(block === "CONFRONTO") {
    if((runner1.pontosRound > runner2.pontosRound) && (runner2.pontosRace>0)) {
      runner2.pontosRace--;
    }else if((runner2.pontosRound > runner1.pontosRound) && (runner1.pontosRace>0)) {
      runner1.pontosRace--;
    }
  }
  
}

async function getRaceWinner(runner1,runner2) {

  if(runner1.pontosRace > runner2.pontosRace) {
    return runner1;
  }else if(runner2.pontosRace > runner1.pontosRace){
    return runner2;
  }else {
    return "EMPATE";
  }
  
}

/* declarando a função main, que controlará todo o fluxo do jogo, assincrona e auto invocada */
(async function main() {
  
  console.log(`🏁🚨Corrida entre ${player1.nome} e ${player2.nome} começando ...\n`);

// executando as 5 rodadas da corrida
  for (let round = 1; round <= 5; round++) {

    // sortear bloco
    let block = await getRandomBlock();

    // executa a rodada para cada um dos dois corredores
    await playRaceEngine( block, player1);
    await playRaceEngine( block, player2);

    // Verifica e pontua vencedor da rodada
    await checkRoundWinner( block, player1, player2);

    // lista resultado da rodada e escore atual da competição
    console.log (`🚨RODADA 0${round} - ${block} ...\n`);
    console.log (`${player1.nome} ${player1.habilidadeRound}: ${player1.habilidadeRoundValue} Dado: ${player1.rollDiceRoundVallue} Pontuação round: ${player1.pontosRound} Pontuação acumulada: ${player1.pontosRace}` );
    console.log (`${player2.nome} ${player2.habilidadeRound}: ${player2.habilidadeRoundValue} Dado: ${player2.rollDiceRoundVallue} Pontuação round: ${player2.pontosRound} Pontuação acumulada: ${player2.pontosRace} \n` );

  }

  // verifica e lista vencedor da corrida e a situação de empate.
  let winner = await getRaceWinner(player1,player2);
    console.log(winner === "EMPATE" ? "E a corrida termina empatada 🏳️" : `E o vencedor da corrida é .... ${winner.nome} 🏁🏁🏁`)

})();
