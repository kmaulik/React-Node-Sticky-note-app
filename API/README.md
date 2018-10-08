# React Sticky Notes Api


## Getting Started

React sticky notes api provide you to add new notes, edit existing notes & remove notes. also you can upload image in sticky notes.

### Prerequisites

You must have NPM installed in your PC.


### Installing

Steps to setup react-sticky-notes-api

* First you need to clone repository : https://github.com/kmaulik/React-Sticky-note-api
* Then go to React-sticky-notes directory using Command Prompt using cd Command 
* Then you need to hit 'npm install' command from CMD
* If you want to change port number then you can change in this file line number 15 : /bin/www/

## API Url

**Login Api**

Login API
* method : post
* url : http://localhost:4000/login


**User Api**

Create new user api 
* method : post
* url : http://localhost:4000/registration

Edit Profile
* method : post
* url : http://localhost:4000/profile/:id
  
Get user information by user id
* method : get
* url : http://localhost:4000/profile/:id


**Sticky-Notes Api**

Save Notes 
* method : post
* url : http://localhost:4000/notes/save/:id

View all notes of partiulcar user by their id
* method : get
* url : http://localhost:4000/notes/:id
