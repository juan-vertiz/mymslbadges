const express = require('express');
const ogGenerator = require('../services/OgGeneratorUtility');

const router = express.Router();

router.get('/', async function(req, res, next) {
  const svg = await ogGenerator(res, 'index', { protocol: req.protocol, host: req.get('host') });
  res.setHeader('Content-Type', 'image/svg+xml');
  return res.send(svg);
});

module.exports = router;
