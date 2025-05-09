// Em um arquivo dentro de /api, por exemplo api/discord-user.js
import { DiscordEmbedSDK } from '@discord/embedded-app-sdk';

export default async function handler(req, res) {
  // Inicialize o SDK com seu clientId
  const sdk = new DiscordEmbedSDK({ clientId: '1365169402441633852' });
  await sdk.ready();

  // A partir do server você pode chamar endpoints da Activity
  // (embora tipicamente o SDK seja usado no cliente)
  res.status(200).json({ message: 'SDK inicializado com sucesso' });
}
