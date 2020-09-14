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
        subject : `WORK TO BE DONE`,
        html: `<div style="font-family: monospace;" >
                <h2 >
                    use this OTP to verify your MarketGad account.<br>
                </h2>
                <div style="padding: 10px;background-color: rgb(235, 255, 255); font-size: 25px ">
                        <p>
                           This the email verification code written by sidhartha mallick
                        </p>
                        <img src="https://images.unsplash.com/photo-1494403687614-8ca3e13f154f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1275&q=80" />
                        <p>
                            This is an email verification written by sidhartha mallick
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
