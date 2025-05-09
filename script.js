// Inicializa o Discord Embedded App via Embedded App SDK
const sdk = window.discordSdk;
sdk.ready().then(() => sdk.connect({ clientId: '1365169402441633852' }));
sdk.ready().then(() => {
  const user = sdk.user; // { id, username, discriminator, avatar }
  const box = document.getElementById('profile-box');
  box.querySelector('.avatar-placeholder').outerHTML =
    `<img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" class="avatar" style="width:32px;height:32px;border-radius:50%">`;
  box.querySelector('#username').innerText =
    `${user.username}#${user.discriminator}`;
});

// DOM refs
const lobbyEl      = document.getElementById('lobby');
const gameEl       = document.getElementById('game');
const logEl        = document.getElementById('log');
const btnVsBot     = document.getElementById('btn-vs-bot');
const btnStore     = document.getElementById('btn-store');
const btnInventory = document.getElementById('btn-inventory');

// Navegação stub
btnStore.onclick     = () => alert('Loja (stub)');
btnInventory.onclick = () => alert('Inventário (stub)');
btnVsBot.onclick     = () => { lobbyEl.classList.add('hidden'); gameEl.classList.remove('hidden'); startGame(); };

// Jogo vs Bot (igual ao anterior)
const DEFAULT_IMAGE = 'https://via.placeholder.com/100';
const characterCards = [
  { id: 1, name: 'Lilih', clan: 'Paladino', stats: { presence: 98, monetization: 60, subscription: 36, charisma: 58 }, image: 'rbxassetid://92040032975049' },
  { id: 2, name: 'Guinas', clan: 'Guardião', stats: { presence: 10, monetization: 10, subscription: 81, charisma: 95 }, image: 'rbxassetid://126388660969728' },
  { id: 3, name: 'Yoake', clan: 'Guardião', stats: { presence: 43, monetization: 26, subscription: 29, charisma: 15 }, image: DEFAULT_IMAGE },
  { id: 4, name: 'Igordão', clan: 'Sentinela', stats: { presence: 30, monetization: 10, subscription: 19, charisma: 96 }, image: DEFAULT_IMAGE },
  { id: 5, name: 'Nightbot', clan: 'Guardião', stats: { presence: 100, monetization: 0, subscription: 0, charisma: 0 }, image: DEFAULT_IMAGE },
  { id: 6, name: 'Cezinha', clan: 'Sentinela', stats: { presence: 71, monetization: 10, subscription: 20, charisma: 33 }, image: DEFAULT_IMAGE },
  { id: 7, name: 'Core', clan: 'Paladino', stats: { presence: 9, monetization: 78, subscription: 22, charisma: 40 }, image: DEFAULT_IMAGE },
  { id: 8, name: 'Wabbts', clan: 'Paladino', stats: { presence: 75, monetization: 100, subscription: 41, charisma: 8 }, image: DEFAULT_IMAGE },
  { id: 9, name: 'Kevin', clan: 'Sentinela', stats: { presence: 55, monetization: 5, subscription: 9, charisma: 100 }, image: DEFAULT_IMAGE },
  { id: 10, name: 'Miranha', clan: 'Guardião', stats: { presence: 29, monetization: 74, subscription: 38, charisma: 88 }, image: DEFAULT_IMAGE },
  { id: 11, name: 'MrGodan50', clan: 'Sentinela', stats: { presence: 94, monetization: 0, subscription: 6, charisma: 10 }, image: DEFAULT_IMAGE },
  { id: 12, name: 'Son_Zerick', clan: 'Sentinela', stats: { presence: 86, monetization: 20, subscription: 28, charisma: 59 }, image: DEFAULT_IMAGE },
  { id: 13, name: 'Schnauzer_06', clan: 'Paladino', stats: { presence: 67, monetization: 10, subscription: 30, charisma: 61 }, image: DEFAULT_IMAGE },
  { id: 14, name: 'Vascolino789', clan: 'Paladino', stats: { presence: 92, monetization: 0, subscription: 7, charisma: 95 }, image: DEFAULT_IMAGE },
  { id: 15, name: 'Ehakm', clan: 'Guardião', stats: { presence: 80, monetization: 13, subscription: 34, charisma: 8 }, image: DEFAULT_IMAGE },
  { id: 16, name: 'oOusuario', clan: 'Sentinela', stats: { presence: 86, monetization: 93, subscription: 4, charisma: 75 }, image: DEFAULT_IMAGE },
  { id: 17, name: 'Kill2joy', clan: 'Sentinela', stats: { presence: 77, monetization: 0, subscription: 21, charisma: 5 }, image: DEFAULT_IMAGE },
  { id: 18, name: 'Ak1ra', clan: 'Guardião', stats: { presence: 93, monetization: 0, subscription: 16, charisma: 4 }, image: DEFAULT_IMAGE },
  { id: 19, name: 'Rdsr', clan: 'Paladino', stats: { presence: 90, monetization: 0, subscription: 3, charisma: 89 }, image: DEFAULT_IMAGE },
  { id: 20, name: 'Leehun', clan: 'Paladino', stats: { presence: 25, monetization: 15, subscription: 3, charisma: 3 }, image: DEFAULT_IMAGE },
  { id: 21, name: 'KalebKronos', clan: 'Guardião', stats: { presence: 15, monetization: 40, subscription: 7, charisma: 1 }, image: DEFAULT_IMAGE },
  { id: 22, name: 'Waxdigo', clan: 'Paladino', stats: { presence: 78, monetization: 9, subscription: 20, charisma: 85 }, image: DEFAULT_IMAGE },
  { id: 23, name: 'Filufiru', clan: 'Sentinela', stats: { presence: 81, monetization: 89, subscription: 11, charisma: 85 }, image: DEFAULT_IMAGE },
  { id: 24, name: 'Pão de Queijo', clan: 'Guardião', stats: { presence: 60, monetization: 20, subscription: 3, charisma: 55 }, image: DEFAULT_IMAGE },
  { id: 25, name: 'Zenriquez', clan: 'Paladino', stats: { presence: 70, monetization: 14, subscription: 30, charisma: 14 }, image: DEFAULT_IMAGE },
  { id: 26, name: 'HyperBug', clan: 'Sentinela', stats: { presence: 96, monetization: 0, subscription: 4, charisma: 4 }, image: DEFAULT_IMAGE },
  { id: 27, name: 'FelipeMorais', clan: 'Paladino', stats: { presence: 89, monetization: 96, subscription: 23, charisma: 98 }, image: DEFAULT_IMAGE },
  { id: 28, name: 'Eeffafa', clan: 'Guardião', stats: { presence: 94, monetization: 3, subscription: 4, charisma: 57 }, image: DEFAULT_IMAGE },
  { id: 29, name: 'Centlock', clan: 'Guardião', stats: { presence: 85, monetization: 90, subscription: 2, charisma: 79 }, image: DEFAULT_IMAGE }
];

function log(msg) {
  logEl.innerHTML += msg + '<br>';
  logEl.scrollTop = logEl.scrollHeight;
}

let playerDeck = [], botDeck = [], playerCard, botCard;

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

function startGame() {
  shuffle(characterCards);
  playerDeck = characterCards.slice(0,20);
  botDeck    = characterCards.slice(20,40);
  nextTurn();
}

function showCard(el, card, hide) {
  if (hide) el.innerText = 'Carta Oculta';
  else el.innerHTML = `
    <img src="${card.image||DEFAULT_IMAGE}">
    <p>${card.name}</p><p>${card.clan}</p>
    <p>P:${card.stats.presence} M:${card.stats.monetization}
       S:${card.stats.subscription}</p>
    <p>C:${card.stats.charisma}</p>
  `;
}

function nextTurn() {
  if (!playerDeck.length || !botDeck.length) return endGame();
  playerCard = playerDeck.shift();
  botCard    = botDeck.shift();
  showCard(document.getElementById('player-card'), playerCard, false);
  showCard(document.getElementById('bot-card'),    botCard,    true );
  renderActions();
}

function renderActions() {
  const actions = document.getElementById('actions');
  actions.innerHTML = '';
  for (let stat in playerCard.stats) {
    if (stat==='charisma') {
      const o = document.createElement('button');
      o.innerText = 'Carisma: Ordem';
      o.onclick = () => battleCharisma('ordem');
      actions.append(o);
      const c = document.createElement('button');
      c.innerText = 'Carisma: Caos';
      c.onclick = () => battleCharisma('caos');
      actions.append(c);
    } else {
      const btn = document.createElement('button');
      btn.innerText = stat;
      btn.onclick = () => battle(stat);
      actions.append(btn);
    }
  }
}

function battle(stat) {
  showCard(document.getElementById('bot-card'), botCard, false);
  const p = playerCard.stats[stat], b = botCard.stats[stat];
  log(`Você(${p}) vs Bot(${b}) em ${stat.toUpperCase()}`);
  resolveBattle(p,b);
}

function battleCharisma(mode) {
  showCard(document.getElementById('bot-card'), botCard, false);
  const pRaw = playerCard.stats.charisma, bRaw = botCard.stats.charisma;
  const p = mode==='ordem'?100-pRaw:pRaw, b = mode==='ordem'?100-bRaw:bRaw;
  log(`Você escolheu ${mode.toUpperCase()} em Carisma: Você(${p}) vs Bot(${b})`);
  resolveBattle(p,b);
}

function resolveBattle(p,b) {
  if (p>b) { log('Você venceu!'); playerDeck.push(playerCard); }
  else if (b>p) { log('Bot venceu!'); botDeck.push(botCard); }
  else {
    log('Empate! Desempate por clã…');
    if ((playerCard.clan==='Paladino'&&botCard.clan==='Guardião')||
        (playerCard.clan==='Guardião'&&botCard.clan==='Sentinela')||
        (playerCard.clan==='Sentinela'&&botCard.clan==='Paladino')) {
      log('Seu clã venceu!'); playerDeck.push(playerCard);
    } else if ((botCard.clan==='Paladino'&&playerCard.clan==='Guardião')||
               (botCard.clan==='Guardião'&&playerCard.clan==='Sentinela')||
               (botCard.clan==='Sentinela'&&playerCard.clan==='Paladino')) {
      log('Clã do bot venceu!'); botDeck.push(botCard);
    } else {
      log('Empate total! Ambos mantêm.');
      playerDeck.push(playerCard);
      botDeck.push(botCard);
    }
  }
  setTimeout(nextTurn,1000);
}

function endGame() {
  const btn = document.getElementById('ayoba-btn');
  if (!botDeck.length) {
    log('Você venceu a partida!'); btn.classList.remove('hidden');
  } else log('Você perdeu a partida!');
  btn.onclick = () => { log('AYOBA! Vitória confirmada'); btn.classList.add('hidden'); };
}
