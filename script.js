const playerDeck = [
  { nome: "Player1", clã: "Paladino", status: { presença: 5, monetização: 3, subscrição: 4, carisma: 20 }, efeito: "atk" },
  { nome: "Player2", clã: "Guardião", status: { presença: 6, monetização: 2, subscrição: 5, carisma: 30 }, efeito: "atk" }
]

const playerMagics = [
  { nome: "Explosão", efeito: "carta_oponente_morre" }
]

const botDeck = [
  { nome: "Bot1", clã: "Sentinela", status: { presença: 4, monetização: 5, subscrição: 3, carisma: 70 }, efeito: "def" },
  { nome: "Bot2", clã: "Paladino", status: { presença: 3, monetização: 6, subscrição: 4, carisma: 50 }, efeito: "def" }
]

const botMagics = [
  { nome: "Barreira", efeito: "imune" }
]

let playerCard, botCard, playerMagic, botMagic

const log = (msg) => {
  document.getElementById("log").innerHTML += msg + "<br>"
}

const nextTurn = () => {
  playerCard = playerDeck.shift()
  botCard = botDeck.shift()
  playerMagic = playerMagics.shift()
  botMagic = botMagics.shift()

  if (!playerCard || !botCard) {
    endGame()
    return
  }

  document.getElementById("player-character").innerText = `${playerCard.nome} (${playerCard.clã})`
  document.getElementById("player-magic").innerText = playerMagic ? `Magia: ${playerMagic.nome}` : "Sem Magia"
  document.getElementById("bot-character").innerText = "Carta Oculta"
}

const compareStatus = () => {
  const statList = ["presença", "monetização", "subscrição", "carisma"]
  const chosenStat = statList[Math.floor(Math.random() * statList.length)]

  const playerValue = playerCard.status[chosenStat]
  const botValue = botCard.status[chosenStat]

  log(`Combate de ${chosenStat.toUpperCase()}: Você(${playerValue}) vs Bot(${botValue})`)

  if (playerValue > botValue) {
    log("Você venceu o turno!")
    botDeck.push(botCard)
  } else if (botValue > playerValue) {
    log("O bot venceu o turno!")
    playerDeck.push(playerCard)
  } else {
    log("Empate! Comparando clãs...")
    if (clanWin(playerCard.clã, botCard.clã)) {
      log("Seu clã venceu o empate!")
      botDeck.push(botCard)
    } else if (clanWin(botCard.clã, playerCard.clã)) {
      log("O clã do bot venceu o empate!")
      playerDeck.push(playerCard)
    } else {
      log("Empate total! Ambos mantêm suas cartas.")
      playerDeck.push(playerCard)
      botDeck.push(botCard)
    }
  }

  setTimeout(nextTurn, 2000)
}

const clanWin = (a, b) => {
  return (a === "Paladino" && b === "Guardião") || 
         (a === "Guardião" && b === "Sentinela") || 
         (a === "Sentinela" && b === "Paladino")
}

const useMagic = () => {
  if (!playerMagic) {
    log("Você não tem magia!")
    return
  }
  log(`Você usou magia: ${playerMagic.nome}`)
  playerMagic = null
  setTimeout(nextTurn, 2000)
}

const useEffect = () => {
  log(`Você ativou o efeito: ${playerCard.efeito}`)
}

const endGame = () => {
  if (playerDeck.length === 0) {
    log("Você perdeu! 😢")
  } else if (botDeck.length === 0) {
    log("Você venceu! Clique em AYOBA!")
    document.getElementById("ayoba").style.display = "block"
  } else {
    log("Fim inesperado!")
  }
}

document.getElementById("attack-status").onclick = compareStatus
document.getElementById("use-magic").onclick = useMagic
document.getElementById("use-effect").onclick = useEffect
document.getElementById("ayoba-btn").onclick = () => {
  log("Você clicou em AYOBA! Vitória confirmada! 🎉")
  document.getElementById("ayoba").style.display = "none"
}

nextTurn()
