var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//Define Schema
var personSchema = mongoose.Schema({
  name: String,
  age: Number,
  nationality: String
});
var Person = mongoose.model("persons", personSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

//Show all records
router.get('/show_all', function(req, res){
  Person.find(function(err, response){
    res.render('show_all',{record : response});
  });
});

// To render add person form
router.get('/person', function(req, res){
  res.render('person');
});

//To insert data in database which post by add person form
router.post('/person', function(req, res){
  var personInfo = req.body; //Get the parsed information
  console.log(personInfo);
  if(!personInfo.name || !personInfo.age || !personInfo.nationality){
     res.render('show_message', {
        message: "Sorry, you provided worng info", type: "error"});
  } else {
     var newPerson = new Person({
        name: personInfo.name,
        age: personInfo.age,
        nationality: personInfo.nationality
     });
   
     newPerson.save(function(err, Person){
        if(err)
           res.render('show_message', {message: "Database error", type: "error"});
        else
           res.render('show_message', {
              message: "New person added", type: "success", person: personInfo});
     });
  }
});


// To render add person edit form
router.get('/person/edit/:id', function(req, res){
  Person.findById(req.params.id, function(err, response){
    res.render('person_edit_form',{
      result : response
    });
  });
});


//To edit data in database which post by edit person form
router.post('/person/edit/:id', function(req, res){
  var personInfo = req.body; //Get the parsed information
  if(!personInfo.name || !personInfo.age || !personInfo.nationality){
     res.render('show_message', {
        message: "Sorry, you provided worng info", type: "error"});
    } 
    else {
     Person.findOneAndUpdate({_id:req.params.id}, personInfo, function(err, Person){
        if(err)
           res.render('show_message', {message: "Database error", type: "error"});
        else
           res.render('show_message', {
              message: "Person Updated", type: "success", person: personInfo});
     });
  }
});

//Delete particular record from database by id
router.get('/person/delete/:id', function(req, res){
     Person.findByIdAndRemove(req.params.id, function(err, Person){
        if(err)
           res.render('show_message', {message: "Database error", type: "error"});
        else
          res.redirect("/show_all");
    });
});
// Person.find(function(err, response){
//   console.log("ress",response);
// });

module.exports = router;