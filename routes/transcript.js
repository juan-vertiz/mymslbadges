const express = require('express');
const {
  fetchTranscript,
  generateErrorSvg,
  generateTranscriptSvg,
} = require('../services/TranscriptService');

const router = express.Router();

router.get('/:transcriptId', async function(req, res, next) {
  let transcript;
  try {
    transcript = await fetchTranscript(req.params.transcriptId);
  } catch (error) {
    return generateErrorSvg(res);
  }

  await generateTranscriptSvg(res, transcript);
});

module.exports = router;
