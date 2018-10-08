var express = require('express');
var router = express.Router();
var md5 = require('md5');
const uuidv4 = require('uuid/v4');
var path = require('path')

var image_path='./uploads/'
var User = require('../schema/user');

/* GET all notes. */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, response){
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


/* Edit Profile By ID. */
router.post('/:id', function(req, res, next) {
  var userInfo = req.body; //Get the parsed information
  // // No results returned mean the object is not found
  if (!userInfo.name || !userInfo.email) {
      // We are able to set the HTTP status code on the res object
      res.statusCode = 400;
      return res.json({ error: "Please enter proper data" });
  }else{
      if (Object.keys(req.files).length === 0){
          console.log("Book Id", req.params.id);
          //return res.status(400).send('No files were uploaded.');
      }
      else{
          let upload_image = req.files.image;
          extension = path.extname(upload_image.name)
          var new_file_name = image_path+uuidv4()+extension;
          // Use the mv() method to place the file somewhere on your server
          upload_image.mv(new_file_name, function(err) {
              if (err){
                  return res.status(500).send(err);
              }
          });
          userInfo.image_name = new_file_name;
      }
      /**Find & update query */
      User.findOneAndUpdate({_id:req.params.id}, userInfo, function(err, Book){
          if(err){
              res.statusCode = 400;
              res.json({message: "Database error", type: "error",status:false});
          }
          else{
              res.statusCode = 200;
              res.json({message: "success",status:true});
          }
      });
  }
});

module.exports = router;
