'use strict';

const express = require('express');
const router = express.Router();
const request = require('axios');

const currentInstance = request.create({
  timeout: 10000
});

router.get('/', (req, res) => {
  console.log('bridge request get route hit', req.body);
  let currentInstance = {};
  let { currentIp, currentUser, bridgeRequest, data } = req.body;
  currentInstance.url = bridgeRequest.url;
  currentInstance.method = bridgeRequest.method;
  currentInstance.data = bridgeRequest.data;
  console.log('current instance: ', currentInstance);
});

router.post('/', (req, res) => {
  console.log('bridge request route hit');
  let currentInstance = {};
  let { currentIp, currentUser, bridgeRequest, data } = req.body;
  currentInstance.url = bridgeRequest.url;
  currentInstance.method = bridgeRequest.method;
  currentInstance.data = bridgeRequest.data;
  request(currentInstance)
    .then(response => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
  console.log('current instance: ', currentInstance);
});

router.post('/keypress', (req, res) => {
  
});

router.post('/setIp', (req, res) => {
  console.log('newIp: ', req.body.newIp);
})

module.exports = router;