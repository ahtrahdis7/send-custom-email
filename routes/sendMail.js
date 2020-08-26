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
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('editor', { title: 'HTML EDITOR' });
});

router.post('/', async (req, res) => {

    var mailOptions = {
        from:`${config.MAIL_ID}`,
        to : `${req.body.email}`,
        subject : `From Your Dearest`,
        html: `<div style="font-family: monospace;" >
                <h2 >
                    use this OTP to verify your MarketGad account.<br>
                </h2>
                <div style="padding: 10px;background-color: rgb(235, 255, 255); font-size: 25px ">
                        <p>
                            You're my <b>honeybunch</b>, <i>sugar plum</i>, pumpy-umpy-umpkin
                            <span style="color: blue">You're my <strong>sweetie pie</strong></span>
                            You're my <span style="color: green">cuppycake, gumdrop, snoogums-boogums</span>
                            You're the <span style="color: red">apple of my eye</span>
                        </p>
                        <img src="https://images.unsplash.com/photo-1494403687614-8ca3e13f154f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1275&q=80" />
                        <p>
                            And I love you so and I want you to know
                            That I'll always be right here
                            And I love to sing sweet songs to you
                            Because you are so dear
                        </p>
                </div>
            </div>`,

    }

    await smtpTransport.sendMail(mailOptions, (error, response) => {
        if(error){
            console.log("ERROR");
            console.log(error);
        }else{
            console.log(response);
            // console.log("Message sent: " + response);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Mail sent successfully !'});
        }
        // smtpTransport.close();
    })
})

module.exports = router;
