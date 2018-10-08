var express = require('express');
var mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
var router = express.Router();
const uuidv4 = require('uuid/v4');
var path = require('path')


router.use(fileUpload());
//Define Schema
var bookSchema = mongoose.Schema({
    name : String, 
    price : Number,
    author : String,
    category : String,
    language : String,
    isbn : String,
    publish_date : Date,
    image_name : String
});

var Book = mongoose.model("books", bookSchema);
  
/* GET all books listing. */
router.get('/', function(req, res, next) {
    Book.find({},null,{sort: {_id: -1 }},function(err, results){
        if (err) {
            console.error(err);
            res.statusCode = 500;
            return res.json({ errors: "Could not retrieve records" });
          }
          // No results returned mean the object is not found
          if (results.length === 0) {
            // We are able to set the HTTP status code on the res object
            res.statusCode = 404;
            return res.json({ errors: "Records not found" });
          }
          // By attaching a Photo property to the request
          // Its data is now made available in our handler function
          return res.send(results);
    });
});


/* Add New book. */
router.post('/add', function(req, res, next) {
    var bookInfo = req.body; //Get the parsed information
    console.log("File>>>",req.files);
    console.log("File>>>",req.body);
    //res.send('uploaded');
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    
    let upload_image = req.files.image;
    extension = path.extname(upload_image.name)
    var new_file_name = uuidv4()+extension;
    // Use the mv() method to place the file somewhere on your server
    upload_image.mv('../MyApp/uploads/'+new_file_name, function(err) {
        if (err){
            return res.status(500).send(err);
        }
    });
    // // No results returned mean the object is not found
    if (!bookInfo.name || !bookInfo.price || !bookInfo.author || !bookInfo.category || !bookInfo.language || !bookInfo.isbn || !bookInfo.publish_date) {
        // We are able to set the HTTP status code on the res object
        res.statusCode = 400;
        return res.json({ error: "Please enter proper data" });
    }else{
        var newBook = new Book({
            name : bookInfo.name, 
            price : bookInfo.price,
            author : bookInfo.author,
            category : bookInfo.category,
            language : bookInfo.language,
            isbn : bookInfo.isbn,
            publish_date : bookInfo.publish_date,
            image_name : new_file_name
        });
        
        newBook.save(function(err, response){
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

// Get book by id
router.get('/:id', function(req, res){
    Book.findById(req.params.id, function(err, response){
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

/* Edit Book By ID. */
router.post('/edit/:id', function(req, res, next) {
    var bookInfo = req.body; //Get the parsed information
    // // No results returned mean the object is not found
    if (!bookInfo.name || !bookInfo.price || !bookInfo.author || !bookInfo.category || !bookInfo.language || !bookInfo.isbn || !bookInfo.publish_date) {
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
            var new_file_name = uuidv4()+extension;
            
            // Use the mv() method to place the file somewhere on your server
            upload_image.mv('../MyApp/uploads/'+new_file_name, function(err) {
                if (err){
                    return res.status(500).send(err);
                }
            });
            bookInfo.image_name = new_file_name;
        }
        Book.findOneAndUpdate({_id:req.params.id}, bookInfo, function(err, Book){
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


//Delete particular record from database by id
router.delete('/delete/:id', function(req, res){
    Book.findByIdAndRemove(req.params.id, function(err, Person){
        if(err){
            res.statusCode = 400;
            res.json({message: "Database error", type: "error", "error" : err});
        }
        else{
            res.statusCode = 200;
            res.json({status:"success",message:"Recrod successfully deleted"});
        }
   });
});


//Count Total Records
router.get('/total_records', function(req, res){
    Book.count(function(err, count){
        console.log("Error----->",err);
        console.log("count----->",count);
        // if(err){
        //     res.statusCode = 400;
        //     res.json({message: "Database error", type: "error", "error" : err});
        // }
        // else{
        //     res.statusCode = 200;
        //     res.json({status:"success",message:"Success"});
        // }
   });
});

module.exports = router;