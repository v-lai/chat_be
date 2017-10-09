# React Chat Back End

## Viewing the app for deployment
To get this backend app up and running is to cd into this directory in your terminal window, then
run:

 `npm start`
  
This will start a web server serving the contents of this directory on
your machine. Server will be listening on port 3001.

## Features 
* Uses a mongodb database.
* Attempts to use socket.io (this needs additional work)

## Data to be stored
* id (number)
* author (string)
* timestamp (date)
* content (string)
* last_edited (date) (optional - not create)

## Routes
* GET '/' for finding all messages
* GET '/:message_id' for finding a particular message
* POST '/' for adding a message
* PATCH '/:message_id' for editing a particular message
* DELETE '/:message_id' for deleting a particular message
