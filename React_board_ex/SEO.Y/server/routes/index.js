var express = require('express');
var account = require('./account');
var board = require('./board');

const router = express.Router();

router.use('/account', account);
router.use('/board', board);

module.exports = router;