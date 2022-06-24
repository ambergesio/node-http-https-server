# NODE http/https server with (almost) 0 dependences

To install packages (only dotenv is required and just for fun, 'cause it contains only dev/prod param)
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
# You can create, read or delete .json files on 'files' folder.

## Read file
To read a file, you can open a new tab in POSTMAN and type
```
localhost:3000/read?location=saved&fileName=abel_martin
```

You should get a json response like this:
```
{
    "error": null,
    "message": "File 'abel_martin' read successully",
    "data": {
        "name": "Abel Martin",
        "lastName": "Bergesio",
        "age": 44,
        "address": "Av Siempreviva",
        "address_number": 222
    }
}
```
---
## Create file

to create a new json file on 'saved' folder, you can open a POSTMAN tab and type:
```
localhost:3000/create?location=saved&fileName=<your_file_name_here>
```

You can send a payload, for example:
```
{
    "name": "John",
    "lastName": "Doe",
    "age": 55,
    "address": "Willington",
    "address_number": 1111
}
```
If the file is created, you should get this response:
```
{
    "error": false,
    "message": "File '<your_file_name_here>' created successfully.",
    "data": {
        "name": "John",
        "lastName": "Doe",
        "age": 55,
        "address": "Willington",
        "address_number": 1111
    }
}
```
---
## Delete
If you want to delete a file, you can type:
```
localhost:3000/delete?location=saved&fileName=<your_file_name_here>
```
and you should get this response:
```
{
    "error": false,
    "message": "File '<your_file_name_here>' deleted successully"
}
```
---
## HTTPS
#
In order to run the https server, both cert.pem and key.pem files are included.  
They are just for testing purpose and only work on localhost domain. 
