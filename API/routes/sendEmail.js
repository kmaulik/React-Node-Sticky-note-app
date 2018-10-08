var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mailer = require('nodemailer');
let transporter = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'rda.narola@gmail.com',
        pass: 'n@rola21'
    }
});
let mailOptions = {
    from: 'rd@narola.email', // sender address
    to: 'riddhi@mailinator.com', // list of receivers
    subject: 'For Testing in Angular5', // Subject line
    text: "<p>Hello!!!</p>", // plain text body
    html: '<b>NodeJS Email Tutorial</b>' // html body
};
router.get('/', function(req, res, next) {
   
    console.log("called SendEmail");

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        res.json({"status":"fail","error":1,"msg":"Email is not Sent"});
    }
    res.json({"status":"success","error":0,"msg":"Email Sent Successfully.."});
    });
});

module.exports = router;