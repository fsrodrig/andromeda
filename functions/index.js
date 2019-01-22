const functions = require('firebase-functions');
const express = require('express');
const fetch = require('node-fetch');
const url = require('url');

const app = express();

const appUrl = 'www.andromedaagencia.com';
const renderUrl = 'https://render-tron.appspot.com/render';


// Genera la URL
function generateUrl(request) {
  return url.format({
    protocol: request.protocol,
    host: appUrl,
    pathname: request.originalUrl
  });
}

// Detecta si es un bot o una persona
function detectbot(userAgent) {
  // Lista de bots
  const bots = [
    // crawler bots
    'googlebot',
    'bingbot',
    'yandexbot',
    'duckduckbot',
    'slurp',
    // link bots
    'twitterbot',
    'facebookexternalhit',
    'linkedinbot',
    'pinterest',
    'facebot',
    'outbrain',
    'W3C_Validator'
  ]

  const agent = userAgent.toLowerCase();

  for (const bot of bots) {
    if (agent.indexOf(bot) > -1) {
      console.log('bot :', bot, agent);
      return true;
    }

    console.log('no bots found');
    return false;
  }
}


app.get('*', (req, res) => {

const isBot = detectbot(req.headers['user-agent']);

if (isBot) {
  const botUrl = generateUrl(req);

  fetch(`${renderUrl}/${botUrl}`)
    .then( res => res.text() )
    .then( body => {

      res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
      res.set('Vary', 'User-Agent');

      res.send(body.toString());
    });

} else {

  fetch(`https://${appUrl}`)
    .then( res => res.text())
    .then( body => {
      res.send(body.toString());
    });

}

});

exports.app = functions.https.onRequest(app);
