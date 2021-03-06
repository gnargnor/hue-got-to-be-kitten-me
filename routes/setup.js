'use strict';

const express = require('express');
const router = express.Router();

const request = require('axios');

router.post('/testIp', (req, res) => {
  let ipCandidate = req.body.newIp;
  let ipInstance = request.create({
    timeout: 5000
  });
  console.log(ipCandidate);
  return ipInstance({
    method: 'get',
    url: `http://${ipCandidate}/api/1234`
  })
  .then(response => {
    if (response.data[0].error.description === 'unauthorized user') {
      let appName = `appNumber${Math.floor(Math.random() * 9999)}`;
      let appUser = `appUser${Math.floor(Math.random() * 9999)}`;
      return ipInstance({
        method: 'post',
        url: `http://${ipCandidate}/api`,
        data: {
          "devicetype":`${appName}#${appUser}`
        }
      })
      .then(response => {
        if (response.data[0].error) {
          console.log(response.data[0].error);
          res.send({
            ipCandidate,
            message: response.data[0].error.description,
            confirmed: false
          })
        } else if (response.data[0].success) {
          // TODO get into that db boy and store that username sis
          // then send back the go ahead signals to pour some sugar all over our bridge
          res.send({
            ipCandidate,
            message: 'TIGHT DAWG',
            confirmed: true,
            username: response.data[0].success.username
          })
        }
      })
      // is this necessary?
    } else {
      res.send({
        ipCandidate,
        confirmed: false
      })
    }
  })
  .catch(err => {
    console.log(err);
    res.send({
      ipCandidate,
      confirmed: false
    })
  })
});

module.exports = router;