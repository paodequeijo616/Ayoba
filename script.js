// script.js
const lobbyEl      = document.getElementById('lobby')
const gameEl       = document.getElementById('game')
const logEl        = document.getElementById('log')
const btnVsBot     = document.getElementById('btn-vs-bot')
const btnStore     = document.getElementById('btn-store')
const btnInventory = document.getElementById('btn-inventory')

btnStore.onclick     = () => alert('Loja (stub)')
btnInventory.onclick = () => alert('Inventário (stub)')
btnVsBot.onclick     = () => { lobbyEl.classList.add('hidden'); gameEl.classList.remove('hidden'); startGame() }

const statLabels = {
  presence: 'Presença',
  monetization: 'Monetização',
  subscription: 'Subscrição',
  charisma: 'Carisma'
}

const DEFAULT_IMAGE = 'ayoba.png'
const characterCards = [
  { id: 1, name: 'Lilih',       clan: 'Paladino', stats: { presence: 98, monetization: 60, subscription: 36, charisma: 58 }, image: DEFAULT_IMAGE },
  { id: 2, name: 'Guinas',      clan: 'Guardião', stats: { presence: 10, monetization: 10, subscription: 81, charisma: 95 }, image: DEFAULT_IMAGE },
  { id: 3, name: 'Yoake',       clan: 'Guardião', stats: { presence: 43, monetization: 26, subscription: 29, charisma: 15 }, image: DEFAULT_IMAGE },
  { id: 4, name: 'Igordão',     clan: 'Sentinela',stats: { presence: 30, monetization: 10, subscription: 19, charisma: 96 }, image: DEFAULT_IMAGE },
  { id: 5, name: 'Nightbot',    clan: 'Guardião', stats: { presence: 100,monetization: 0, subscription: 0,  charisma: 0  }, image: DEFAULT_IMAGE },
  { id: 6, name: 'Cezinha',     clan: 'Sentinela',stats: { presence: 71, monetization: 10, subscription: 20, charisma: 33 }, image: DEFAULT_IMAGE },
  { id: 7, name: 'Core',        clan: 'Paladino', stats: { presence: 9,  monetization: 78, subscription: 22, charisma: 40 }, image: DEFAULT_IMAGE },
  { id: 8, name: 'Wabbts',      clan: 'Paladino', stats: { presence: 75, monetization:100, subscription: 41, charisma: 8  }, image: DEFAULT_IMAGE },
  { id: 9, name: 'Kevin',       clan: 'Sentinela',stats: { presence: 55, monetization: 5,  subscription: 9,  charisma:100 }, image: DEFAULT_IMAGE },
  { id: 10,name: 'Miranha',     clan: 'Guardião', stats: { presence: 29, monetization:74, subscription: 38, charisma:88 }, image: DEFAULT_IMAGE },
  { id: 11,name: 'MrGodan50',   clan: 'Sentinela',stats: { presence: 94, monetization:0, subscription: 6,  charisma:10 }, image: DEFAULT_IMAGE },
  { id: 12,name: 'Son_Zerick',  clan: 'Sentinela',stats: { presence: 86, monetization:20, subscription: 28, charisma:59 }, image: DEFAULT_IMAGE },
  { id: 13,name: 'Schnauzer_06',clan: 'Paladino', stats: { presence:67, monetization:10, subscription: 30, charisma:61 }, image: DEFAULT_IMAGE },
  { id: 14,name: 'Vascolino789',clan: 'Paladino', stats: { presence:92, monetization:0, subscription:7,   charisma:95 }, image: DEFAULT_IMAGE },
  { id: 15,name: 'Ehakm',       clan: 'Guardião', stats: { presence:80, monetization:13, subscription:34, charisma:8  }, image: DEFAULT_IMAGE },
  { id: 16,name: 'oOusuario',   clan: 'Sentinela',stats: { presence:86, monetization:93, subscription:4,  charisma:75 }, image: DEFAULT_IMAGE },
  { id: 17,name: 'Kill2joy',    clan: 'Sentinela',stats: { presence:77, monetization:0, subscription:21, charisma:5  }, image: DEFAULT_IMAGE },
  { id: 18,name: 'Ak1ra',       clan: 'Guardião', stats: { presence:93, monetization:0, subscription:16, charisma:4  }, image: DEFAULT_IMAGE },
  { id: 19,name: 'Rdsr',        clan: 'Paladino', stats: { presence:90, monetization:0, subscription:3,  charisma:89 }, image: DEFAULT_IMAGE },
  { id: 20,name: 'Leehun',      clan: 'Paladino', stats: { presence:25, monetization:15, subscription:3,  charisma:3  }, image: DEFAULT_IMAGE },
  { id: 21,name: 'KalebKronos', clan: 'Guardião', stats: { presence:15, monetization:40, subscription:7,  charisma:1  }, image: DEFAULT_IMAGE },
  { id: 22,name: 'Waxdigo',     clan: 'Paladino', stats: { presence:78, monetization:9,  subscription:20, charisma:85 }, image: DEFAULT_IMAGE },
  { id: 23,name: 'Filufiru',    clan: 'Sentinela',stats: { presence:81, monetization:89, subscription:11, charisma:85 }, image: DEFAULT_IMAGE },
  { id: 24,name: 'Pão de Queijo',clan:'Guardião', stats: { presence:60, monetization:20, subscription:3,  charisma:55 }, image: DEFAULT_IMAGE },
  { id: 25,name: 'Zenriquez',   clan: 'Paladino', stats: { presence:70, monetization:14, subscription:30, charisma:14 }, image: DEFAULT_IMAGE },
  { id: 26,name: 'HyperBug',    clan: 'Sentinela',stats: { presence:96, monetization:0, subscription:4,  charisma:4  }, image: DEFAULT_IMAGE },
  { id: 27,name: 'FelipeMorais',clan: 'Paladino', stats: { presence:89, monetization:96, subscription:23, charisma:98 }, image: DEFAULT_IMAGE },
  { id: 28,name: 'Eeffafa',     clan: 'Guardião', stats: { presence:94, monetization:3,  subscription:4,  charisma:57 }, image: DEFAULT_IMAGE },
  { id: 29,name: 'Centlock',    clan: 'Guardião', stats: { presence:85, monetization:90, subscription:2,  charisma:79 }, image: DEFAULT_IMAGE }
]

let playerDeck = []
let botDeck = []
let playerCard, botCard
let turnEnded = false

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
}

function sumPresence(deck) {
  return deck.reduce((sum, c) => sum + c.stats.presence, 0)
}

function buildDeck() {
  const pool = characterCards.slice()
  shuffle(pool)
  let deck = pool.slice(0, 20)
  let remaining = pool.slice(20)
  while (sumPresence(deck) > 1300 && remaining.length) {
    const removeIdx = Math.floor(Math.random() * deck.length)
    remaining.push(deck.splice(removeIdx, 1)[0])
    const addIdx = Math.floor(Math.random() * remaining.length)
    deck.push(remaining.splice(addIdx, 1)[0])
  }
  return deck
}

function updateDeckCounts() {
  document.querySelector('#player-area h3').innerText = `Eu (${playerDeck.length + 1})`
  document.querySelector('#bot-area h3').innerText = `Bot (${botDeck.length + 1})`
}

function startGame() {
  playerDeck = buildDeck()
  botDeck = buildDeck()
  nextTurn()
}

function showCard(el, card, hide) {
  if (hide) {
    el.innerHTML = `<img class="card-background" src="ayoba.png">
<div class="stats">
  <div class="stat">
    <span>Carta Oculta</span>
  </div>
</div>`
  } else {
    el.innerHTML = `<img class="card-background" src="${card.image}">
<div class="stats">
  <p>${card.name}</p>
  <p>${card.clan}</p>
  <div class="stat">
    <span class="stat-icon"><img src="Presença.png"></span>
    <span class="stat-value">${card.stats.presence}</span>
  </div>
  <div class="stat">
    <span class="stat-icon"><img src="Monetização.png"></span>
    <span class="stat-value">${card.stats.monetization}</span>
  </div>
  <div class="stat">
    <span class="stat-icon"><img src="Subscrição.png"></span>
    <span class="stat-value">${card.stats.subscription}</span>
  </div>
  <div class="stat">
    <span class="stat-icon"><img src="Carisma.png"></span>
    <span class="stat-value">${card.stats.charisma}</span>
  </div>
</div>`
  }
}

function nextTurn() {
  if (!playerDeck.length || !botDeck.length) return endGame()
  turnEnded = false
  playerCard = playerDeck.shift()
  botCard = botDeck.shift()
  showCard(document.getElementById('player-card'), playerCard, false)
  showCard(document.getElementById('bot-card'), botCard, true)
  renderActions()
  updateDeckCounts()
}

function botTurn() {
  if (turnEnded) return
  const botStats = botCard.stats
  const highestStat = Object.keys(botStats).reduce((highest, stat) => {
    return botStats[stat] > botStats[highest] ? stat : highest
  }, 'presence')

  if (highestStat === 'charisma') {
    const modo = Math.random() < 0.5 ? 'ordem' : 'caos'
    log(`Bot escolheu atacar com ${modo === 'ordem' ? 'Ordem' : 'Caos'} em Carisma`)
    battleCharisma(modo)
  } else {
    log(`Bot escolheu atacar com ${statLabels[highestStat]}`)
    battle(highestStat)
  }

  setTimeout(showActions, 2400)
}

function renderActions() {
  const actions = document.getElementById('actions')
  actions.innerHTML = ''
  const createButton = (label, callback) => {
    const btn = document.createElement('button')
    btn.innerText = label
    btn.onclick = () => {
      if (turnEnded) return
      hideActions()
      callback()
      setTimeout(botTurn, 4000)
    }
    actions.appendChild(btn)
  }
  createButton('Presença', () => battle('presence'))
  createButton('Monetização', () => battle('monetization'))
  createButton('Subscrição', () => battle('subscription'))
  createButton('Carisma: Ordem', () => battleCharisma('ordem'))
  createButton('Carisma: Caos', () => battleCharisma('caos'))
}

function hideActions() {
  document.getElementById('actions').style.display = 'none'
}

function showActions() {
  document.getElementById('actions').style.display = 'block'
}

function battle(stat) {
  if (turnEnded) return
  showCard(document.getElementById('bot-card'), botCard, false)
  const p = playerCard.stats[stat], b = botCard.stats[stat]
  log(`Você(${p}) vs Bot(${b}) em ${stat} ${statLabels[stat]}`)
  resolveBattle(p, b)
}

function battleCharisma(mode) {
  showCard(document.getElementById('bot-card'), botCard, false);
  const pRaw = playerCard.stats.charisma;
  const bRaw = botCard.stats.charisma;
  const p = mode === 'ordem' ? 100 - pRaw : pRaw;
  const b = mode === 'ordem' ? 100 - bRaw : bRaw;
  log(`Você escolheu ${mode} em Carisma: Você(${pRaw}) vs Bot(${bRaw})`);
  resolveBattle(p, b);
}

function resolveBattle(p, b) {
  if (turnEnded) return
  turnEnded = true
  const playerImg = document.querySelector('#player-card img.card-background')
  const botImg = document.querySelector('#bot-card img.card-background')
  playerImg.classList.add('card-img')
  botImg.classList.add('card-img')
  playerImg.parentElement.parentElement.classList.add('animate-attack')
  botImg.parentElement.parentElement.classList.add('animate-defend')

  setTimeout(() => {
    playerImg.parentElement.parentElement.classList.remove('animate-attack')
    botImg.parentElement.parentElement.classList.remove('animate-defend')
    let winner = null
    if (p > b) {
      log('Você venceu!')
      playerDeck.push(playerCard)
      winner = 'player'
    } else if (b > p) {
      log('Bot venceu!')
      botDeck.push(botCard)
      winner = 'bot'
    } else {
      log('Empate! Desempate por clã…')
      if ((playerCard.clan === 'Paladino' && botCard.clan === 'Guardião') ||
          (playerCard.clan === 'Guardião' && botCard.clan === 'Sentinela') ||
          (playerCard.clan === 'Sentinela' && botCard.clan === 'Paladino')) {
        log('Você venceu!!')
        playerDeck.push(playerCard)
        winner = 'player'
      } else if ((botCard.clan === 'Paladino' && playerCard.clan === 'Guardião') ||
                 (botCard.clan === 'Guardião' && playerCard.clan === 'Sentinela') ||
                 (botCard.clan === 'Sentinela' && playerCard.clan === 'Paladino')) {
        log('Bot venceu!')
        botDeck.push(botCard)
        winner = 'bot'
      } else {
        log('Empate total! Ambos mantêm.')
        playerDeck.push(playerCard)
        botDeck.push(botCard)
      }
    }

    if (winner === 'player') {
      botImg.classList.add('disintegrate')
    } else if (winner === 'bot') {
      playerImg.classList.add('disintegrate')
    }

    setTimeout(nextTurn, 1400)
  }, 1400)
}

function log(msg) {
  logEl.innerHTML += msg + '<br>'
  logEl.scrollTop = logEl.scrollHeight
}

function endGame() {
  updateDeckCounts();
  const btn = document.getElementById('ayoba-btn');
  
  if (!botDeck.length) {
    log('Você venceu a partida!');
    btn.classList.remove('hidden');

    // Gerar uma posição aleatória entre as 4 possíveis
    const randomPos = Math.floor(Math.random() * 4);

    // Definir a posição do botão com base no valor de randomPos
    btn.style.position = 'absolute'; // O botão será posicionado de forma absoluta

    btn.style.top = '20px';
    btn.style.left = '20px';
  } else {
    log('Você perdeu a partida!');
    setTimeout(() => {
      gameEl.classList.add('hidden');
      lobbyEl.classList.remove('hidden');
      logEl.innerHTML = '';
      document.getElementById('actions').style.display = 'block';
    }, 1000);
  }

  btn.onclick = () => {
    log('AYOBA! Vitória confirmada');
    btn.classList.add('hidden');
    setTimeout(() => {
      gameEl.classList.add('hidden');
      lobbyEl.classList.remove('hidden');
      logEl.innerHTML = '';
      document.getElementById('actions').style.display = 'block';
    }, 1000);
  };
}
