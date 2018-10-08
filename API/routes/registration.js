var express = require('express');
var router = express.Router();
//Define Schema
var md5 = require('md5');

var User = require('../schema/user');

/* GET all books listing. */
router.post('/', function(req, res, next) {
    var user = req.body;
    console.log(req.body);

    if (!user.name || !user.email || !user.password ) {
        // We are able to set the HTTP status code on the res object
        res.statusCode = 400;
        return res.json({ error: "Please enter proper data" });
    }else{
        var newUser = new User({
            name : user.name, 
            email : user.email,
            password : md5(user.password),
        });
        
        newUser.save(function(err, response){
            if(err){
                res.statusCode = 400;
                return res.send({error: err, type: "error"});
            }
            else{
                res.statusCode = 200;
                return res.json({status:true,message:'success'});
            }
        });
    }
});
module.exports = router;