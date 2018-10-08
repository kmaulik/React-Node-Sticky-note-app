var express = require('express');
var router = express.Router();
//Define Schema
var md5 = require('md5');

var User = require('../schema/user');

/* GET all books listing. */
router.post('/save/:id', function(req, res, next) {
    var notes=[];
    for(i in req.body.notes){
      notes.push({'id':req.body.notes[i].id,note:req.body.notes[i].note})
    }
    // console.log('notes',notes);
    console.log('notes',req.body.notes);

    User.findOneAndUpdate({_id:req.params.id}, {notes:notes}, function(err, Book){
        if(err){
            res.statusCode = 400;
            res.json({message: "Database error", type: "error",status:false});
        }
        else{
            res.statusCode = 200;
            res.json({message: "success",status:true});
        }
    });
});
/* GET all notes. */
router.get('/:id', function(req, res, next) {
    User.findById(req.params.id,'notes', function(err, response){
        if(err){
            res.statusCode = 400;
            res.json({message: "Database error", type: "error",status:false});
        }
        else{
            res.json({
                result : response,
              });
        }
    });
});
module.exports = router;