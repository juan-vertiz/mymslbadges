const express = require('express');
const LearnAPI = require('../services/learn');
const ogGenerator = require('../services/og-generator');

const router = express.Router();
const msl = new LearnAPI();

router.get('/:transcriptId', async function(req, res, next) {
  try {
    var transcript = await msl.fetch_transcript(req.params.transcriptId);
  } catch (e) {
    const svg = await ogGenerator(res, 'error');
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.send(svg);
  }
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
  const svg = await ogGenerator(res, 'transcript', data);
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

module.exports = router;
