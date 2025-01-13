const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const satori = require('satori').default;
const fs = require('fs');
const LearnAPI = require('../services/learn');
const html = (...args) => import('satori-html').then(({ html }) => html(...args));

const router = express.Router();
const msl = new LearnAPI();

const env = nunjucks.configure(path.join(__dirname, '..', 'views'));

const fontData = fs.readFileSync(
  path.join(__dirname, '..', 'assets', 'fonts', 'OpenSans-Regular.ttf')
);

router.get('/transcript/:transcriptId', async function(req, res, next) {
  var transcript = await msl.fetch_transcript(req.params.transcriptId);
  var latestModules = transcript['modulesCompleted'].slice(0, 6);
  for (const completedModule of latestModules) {
    const module = await msl.fetch_module(completedModule['uid']);
    completedModule['base64Icon'] = `https://learn.microsoft.com${ module['iconUrl'] || '/en-us/training/achievements/generic-badge.svg' }`;
  }
  const data = {
    'userName': transcript['userName'] || 'Unknown user',
    'totalModulesCompleted': transcript['totalModulesCompleted'] || 0,
    'totalTrainingMinutes': transcript['totalTrainingMinutes'] || 0,
    'latestModules': latestModules,
  }
  const rendered = env.render('transcript.njk', data);
  const reactObject = await html(rendered.replace(/(\r?\n|\r)\s*/g, ''));
  const svg = await satori(reactObject, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Open Sans',
        data: fontData,
        style: 'normal'
      }
    ]
  });
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

module.exports = router;
