# NODE http/https server with (almost) 0 dependences

To install packages (only dotenv is required and it contains only dev/prod param)
run in console:
```
npm i
```

To run the server you can type in your console:
```
npm start
```
or, if you have nodemon globally installed, you can run it with:
```
npm run dev
```
#
With NODE_ENV set to 'dev' on .env file, server will run in development mode:
```
Server running on http://localhost:3000 in development mode
Server running on https://localhost:3001 in development mode
```
#
With NODE_ENV set to 'prod' on .env file, server will run in production mode:
```
Server running on http://localhost:5001 in production mode
Server running on https://localhost:5002 in production mode
```
#
# You can create, read, update or delete .json files on 'files' folder.


## RESTful methods added: GET, POST, PUT, DELETE.
---

## Read file from 'users'
To read a file, you can do a GET request and a query with an id number in POSTMAN:
```
GET localhost:3000/users?id=22333444
```

You should get a json response like this:
```
{
    "error": null,
    "message": "File '22333444' read successfully",
    "data": {
        "firstName": "John",
        "lastName": "Doe",
        "dni": 22333444,
        "age": 22,
        "address": "Boulebard road",
        "number": 333,
        "password": 1234
    }
}
```
---
## Create file

to create a new user, do a POST request in POSTMAN: 
```
POST localhost:3000/users
```

and send a payload with these fields:
```
{
  "firstName": "Chris",
  "lastName": "Rock",
  "age": 57,
  "dni": 123456,
  "address": "Milton road",
  "number": 222,
  "password": 1234
}
```
If the file is created, you should get this response:
```
{
    "error": false,
    "message": "File '123456' created successfully.",
    "data": {
        "firstName": "Chris",
        "lastName": "Rock",
        "age": 57,
        "dni": 123456,
        "address": "Milton road",
        "number": 222,
        "password": 1234
    }
}
// "dni" number will be used as the .json name //
// you cannot create a user with a dni number that already exists //
// in a future update, password will be saved hashed and won't be included in the response //
```
---
## Update
If you want to update a user, you can do a PUT request with a query using the dni number you want to update as an id:
```
PUT localhost:3000/users?id=123456
```

and send a payload with the fields you want to update:
```
{
  "firstName": "Will",
  "lastName": "Smith"
}
```
you should get this response:
```
{
    "error": false,
    "message": "File '123456' updated successfully.",
    "data": {
        "firstName": "Will",
        "lastName": "Smith",
        "age": 57,
        "dni": 123456,
        "address": "Milton road",
        "number": 222,
        "password": 1234
    }
}
// "dni" is the only field that cannot be edited //
```
---

## Delete
If you want to delete a user, you can do a DELETE request with a query using the dni number you want to delete as an id:
```
DELETE localhost:3000/users?id=123456
```
you should get this response:
```
{
    "error": false,
    "message": "File '123456' deleted successfully"
}
```
---
## HTTPS
#
In order to run the https server, both cert.pem and key.pem files are included.  
They are just for testing purpose and only work on localhost domain. 
