# NODE http/https server with (almost) 0 dependences

## Installation  
#
To install packages (only dotenv is required and it contains only dev/prod param) run in console:

```
npm i
```

To run the server, use the following command:

```
npm start

> http_server@1.0.0 start
> node src/index

Server running on http://localhost:3000 in development mode
Server running on https://localhost:3001 in development mode

```

or, if you have nodemon globally installed, you can run it with:

```
npm run dev

> http_server@1.0.0 dev
> nodemon src/index

[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node src/index.js`
Server running on http://localhost:3000 in development mode
Server running on https://localhost:3001 in development mode

```

#
## process.env
#
With NODE_ENV set to 'dev' on .env file, server will run in development mode:

```js
Server running on http://localhost:3000 in development mode
Server running on https://localhost:3001 in development mode
```
#
With NODE_ENV set to 'prod' on .env file, server will run in production mode:
```js
Server running on http://localhost:5001 in production mode
Server running on https://localhost:5002 in production mode
```
<br><br>

#
## You can create, read, update or delete USERS
#
>>> new users will be saved in 'files/users' folder. Allowed methods are: GET, POST, PUT, and DELETE.

#
## Create a new user
#

To create a new user, send a POST request to:

>POST - localhost:3000/users 


including this payload:

```json
//example json
{
    "firstName": "Thomas",
    "lastName": "Anderson",
    "email": "theone@gmail.com",
    "dni": 10111011,
    "age": 28,
    "phone": 1011010011,
    "address": "Meta Cortex",
    "number": 101011,
    "password": "Neo@redpill0110"
}
```

If the user is created, you should get this JSON response:

```json
{
    "error": false,
    "message": "File '10111011' created successfully.",
    "data": {
        "firstName": "Thomas",
        "lastName": "Anderson",
        "email": "theone@gmail.com",
        "dni": 10111011,
        "age": 28,
        "phone": 1011010011,
        "address": "Meta Cortex",
        "number": 101011
    }
}
// "dni" number will be used as the name of the new .json file.  
// you cannot create a user with a dni number that already exists.
// The password will be hashed before saving the user and won't be included in the response.
```

<br><br>

## Get User's data
#
To get the data from a user, first you need to login, in order to get a token.
Send a POST request to:

```diff
! POST - localhost:3000/auth/login
```

with this payload:

```json
{
    "dni": 10111011,
    "password": "Neo@redpill0110"
}
```
You should get a JSON response like this:
```json
{
    "error": false,
    "message": "Valid user, you may continue.",
    "token": "3zx6ttgs83aajqs4qqfk4o3ot7u7mm_22444555_1656684014589"
}
```

The generated token consists of three parts, separated by an underscore ( _ ).
The first part is a 30 random character string that will be used to name a token file saved in 'files/tokens' folder.
The second part is the user's dni and the third part is the creation date of the file.

This will be the content of the created file:
```json
{
    "dni": 10111011,
    "email": "theone@gmail.com",
    "phone": 1011010011,
    "status": "standard",
    "createdAt": 1656690355939,
    "expiresIn": 1656692155939
}
```

<br>

Then you can do a GET request, sending the user's dni (id) by query params and the generated token in Authorization Bearer header:

```diff
! GET - localhost:3000/users?id=10111011
```

```diff
! Authorization Bearer 3zx6ttgs83aajqs4qqfk4o3ot7u7mm_22444555_1656684014589
```

<br>

You should get a JSON response like this:

```json
{
    "error": null,
    "message": "File '10111011' read successfully",
    "data": {
        "firstName": "Thomas",
        "lastName": "Anderson",
        "email": "theone@gmail.com",
        "dni": 10111011,
        "age": 28,
        "phone": 1011010011,
        "address": "Meta Cortex",
        "number": 101011
    }
}
```

<br><br>

#
## Update User's data
#

If you want to update a user, you can do a PUT request with a query using the dni number you want to update as an id:

```diff
- PUT - localhost:300/users?id=10111011
```

```diff
! Authorization Bearer 3zx6ttgs83aajqs4qqfk4o3ot7u7mm_22444555_1656684014589
```

<p>and send a payload with the fields you want to update:</p>

```json
{
  "firstName": "Neo",
  "lastName": "The one",
  "address": "The Matrix",
}
```

<p>you should get this response:</p>

```json
{
    "error": false,
    "message": "File '10111011' updated successfully.",
    "data": {
        "firstName": "Neo",
        "lastName": "The one",
        "email": "theone@gmail.com",
        "dni": 10111011,
        "age": 28,
        "phone": 1011010011,
        "address": "The Matrix",
        "number": 101011
    }
}
// "dni" and "email" are the only fields that cannot be edited //
```

<br><br>

#
## Delete a user
#

If you want to delete a user, you can do a DELETE request with a query using the dni of the user you want to delete:
```diff
- DELETE - localhost:3000/users?id=10111011
```

```diff
! Authorization Bearer 3zx6ttgs83aajqs4qqfk4o3ot7u7mm_22444555_1656684014589
```

<br>

you should get this response:

```json
{
    "error": false,
    "message": "File '10111011' deleted successfully"
}
```

<br>

```json
// ONLY ADMIN USER can update/delete/get data from all accounts but standard users can only do it with their own account.
```

<br><br>

#
## Token expiration
#

<br>

Tokens last for 30 minutes. After that time, you'll get a response like this:

```json
{
    "error": true,
    "message": "Token expired. Login again in order to access."
}
```

<br><br>

#
# HTTPS


In order to run the https server, both cert.pem and key.pem files are included. They are just for testing purpose and only work on localhost domain.

