/* definindo os players como objetos */
const player1 ={
    nome:"Mario",
    velocidade: 4,
    manobrabilidade:3,
    poder:3,
    pontos:0
}

const player2 ={
    nome:"Luigi",
    velocidade: 3,
    manobrabilidade:4,
    poder:4,
    pontos:0
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
async function playRaceEngine(runner1, runner2) {
  for (let round = 1; round <= 5; round++) {
    // sortear bloco
    let block = await getRandomBlock();
    // lançar dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();
    //calculando pontos por round conforme o bloco
    let totalRoundSkill1 = 0;
    let totalRoundSkill2 = 0;
    let atributoRunner1 = "";
    let atributoRunner2 = "";
    if(block === "RETA") {
      totalRoundSkill1 = diceResult1 + runner1.velocidade;
      atributoRunner1 = `Velocidade: ${runner1.velocidade}`;
      totalRoundSkill2 = diceResult2 + runner2.velocidade;
      atributoRunner2 = `Velocidade: ${runner2.velocidade}`;
      if(totalRoundSkill1 > totalRoundSkill2){
        runner1.pontos++;
      }else if (totalRoundSkill2 > totalRoundSkill1){
        runner2.pontos++;
      };
    } else if(block === "CURVA") {
      totalRoundSkill1 = diceResult1 + runner1.manobrabilidade;
      atributoRunner1 = `Manobrabilidade: ${runner1.manobrabilidade}`;
      totalRoundSkill2 = diceResult2 + runner2.manobrabilidade;
      atributoRunner2 = `Manobrabilidade: ${runner2.manobrabilidade}`;
      if(totalRoundSkill1 > totalRoundSkill2){
        runner1.pontos++;
      }else if(totalRoundSkill2 > totalRoundSkill1){
        runner2.pontos++;
      };     
    }else if(block === "CONFRONTO") {
      totalRoundSkill1 = diceResult1 + runner1.poder;
      atributoRunner1 = `Poder: ${runner1.poder}`;
      totalRoundSkill2 = diceResult2 + runner2.poder;
      atributoRunner2 = `Poder: ${runner2.poder}`;
      if(totalRoundSkill1 > totalRoundSkill2){
        if(runner2.pontos > 0){
          runner2.pontos--;
        };
      }else if(totalRoundSkill2 > totalRoundSkill1){
        if(runner1.pontos > 0){
          runner1.pontos--;
        };
      };     
    };
    // lista o resultado da rodada
    console.log(`🏁 Rodada ${round} ${block} ${runner1.nome} ${atributoRunner1} dado:${diceResult1} Total = ${totalRoundSkill1} Pontos = ${runner1.pontos}`)
    console.log(`🏁 Rodada ${round} ${block} ${runner2.nome} ${atributoRunner2} dado:${diceResult2} Total = ${totalRoundSkill2} Pontos = ${runner2.pontos}`)
  };
  
  // no final, testa e lista vencedor
  if(runner1.pontos > runner2.pontos) {
    console.log(`O vencedor é ${runner1.nome} com ${runner1.pontos} pontos contra ${runner2.pontos} de ${runner2.nome}.`)
  }else if(runner2.pontos > runner1.pontos){
    console.log(`O vencedor é ${runner2.nome} com ${runner2.pontos} pontos contra ${runner1.pontos} de ${runner1.nome}.`)
  }else {
    console.log(`A corrida terminou empatada com ${runner1.pontos} pontos para ${runner1.nome} e ${runner2.pontos} pontos para ${runner2.nome}.`)
  }
};

/* declarando a função main, que controlará todo o fluxo do jogo, assincrona e auto invocada */
(async function main() {
  console.log(`🏁🚨Corrida entre ${player1.nome} e ${player2.nome} começando ...\n`);

  await playRaceEngine(player1, player2)
})();
