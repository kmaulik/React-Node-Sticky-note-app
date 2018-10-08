var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
//Define Schema
var md5 = require('md5');

var User = require('../schema/user');
  
/* GET all books listing. */
router.post('/', function(req, res, next) {
    var user = req.body;
    console.log(req.body);
    var password = md5(user.password)

    var jwt_token = jwt.sign(user,'Express');
    User.find({ 'email': user.email,'password':password }, function(err, response) {
        if (err) {
            res.statusCode = 404;
            return res.json({ errors: "Could not retrieve records" });
        }
        //if user found.
        if (response.length!=0) {
            res.statusCode = 200;
            return res.json({status:true,message:'success',response:response,token:jwt_token});
        }
        else{
            res.statusCode = 404;
            return res.json({status:false,message:'Invalid Email Or Password.'});
        }
    });
});
module.exports = router;