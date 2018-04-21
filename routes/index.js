var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  console.log('rendered page');
  res.render('./dist/index.html');
});

module.exports = router;