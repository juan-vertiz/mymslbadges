const express = require('express');

const router = express.Router();

/*
 TODO: Implement meaningful health check
 {
    "status": "UP",
    "uptime": 74.766,
    "checks": {
      "kafka": "UP",
      "postgresql": "UP",
      "heapSpaceFree": "88M"
    }
  }
 */
router.get('/', async function(req, res, next) {
  res.send({ status: 'ok' });
});

module.exports = router;
