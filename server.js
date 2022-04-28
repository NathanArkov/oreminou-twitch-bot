const tmi = require('tmi.js');
require('dotenv').config();
const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

const commands = {
  don: {
    response: 'Pour me faire un don (facultatif) : https://streamlabs.com/lytera_domino/tip'
  },
  insta: {
    response: 'Mon Instagram : https://instagram.com/lytera_domino'
  },
  discord: {
    response: 'Rejoins notre serveur Discord ici : https://discord.gg/H6ehavRz8U'
  },
  doudou: {
    response: 'Je lance mon entreprise de doudous ! Ils sont fait à la main, cousus par moi même et fait avec beaucoup d\'amour. La première vente aura lieu le 29/04/2021 !'
  },
  youtube: {
    response: 'Ma chaîne Youtube est encore en préparation ! Cette commande fonctionnera (avec le lien) lorsqu\'elle sera lancée !'
  },
  tdi: {
    response: 'Hey poti Minou ! Nous sommes atteints du trouble dissociatif de l\'identité (TDI). C\'est un trouble qui survient dû à des traumas importants durant l\'enfance (entre 6 et 9 ans), qui fragmente le cerveau en plusieurs identités à part entière. Nous sommes un système de 15+ alters. Pour faire simple ont est plusieurs dans un même corps. '
  }
}

const client = new tmi.Client({
  connection: {
    reconnect: true
  },
  channels: [
    'lytera_domino'
  ],
  identity: {
  username: process.env.TWITCH_BOT_USERNAME,
  password: process.env.TWITCH_OAUTH_TOKEN
}
});

client.connect();

client.on('message', async (channel, context, message) => {
  client.on('message', async (channel, context, message) => {
    const isNotBot = context.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME.toLowerCase();

    if ( !isNotBot ) return;

    const [raw, command, argument] = message.match(regexpCommand);

    const { response } = commands[command] || {};

    if ( typeof response === 'function' ) {
      client.say(channel, response(argument));
    } else if ( typeof response === 'string' ) {
      client.say(channel, response);
    }
});
});
