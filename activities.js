const https = require('https');
const express = require('express');
const fs = require('fs');

var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Router Activities appelé à : ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
    reAuthorize();
});


module.exports = router;
