var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
const config = require('../config');

var smtpTransport = nodemailer.createTransport({

    service: "Gmail",
    auth: {
        user: config.MAIL_ID,
        pass: config.MAIL_PASS,
    }
});


router.get('/', function(req, res, next) {
  res.render('login', { title: 'LOGIN PAGE' });
});

module.exports = router;
