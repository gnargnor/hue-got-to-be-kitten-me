'use strict';

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log('brideRequest: ', req.body.bridgeRequest);
});

router.post('/keypress', (req, res) => {
  
});

router.post('/setIp', (req, res) => {
  console.log('newIp: ', req.body.newIp);
})

module.exports = router;