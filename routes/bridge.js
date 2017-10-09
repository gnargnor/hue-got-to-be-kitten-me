'use strict';

const express = require('express');
const router = express.Router();
const request = require('axios');

const currentInstance = request.create({
  timeout: 10000
});

router.post('/', (req, res) => {
  let { currentIp, currentUser, method, dataObject } = req.body.bridgeRequest;
  currentInstance.url = `http://${currentIp}/${currentUser}`;
  currentInstance.method = method;
  currentInstance.data = dataObject;
  console.log('current instance: ', currentInstance);
});

router.post('/keypress', (req, res) => {
  
});

router.post('/setIp', (req, res) => {
  console.log('newIp: ', req.body.newIp);
})

module.exports = router;