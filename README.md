<style>
    .title {
        font-size: 24px;
        font-weight: 600;
        color: #55adff;
    }
        .subtitle {
        font-size: 20px;
        font-weight: 500;
        color: #55adff;
    }
    p {
        margin: 16px 6px;
        font-size: 15px;
    }
    .separator {
        border-bottom: solid 2px #55adff;
    }
    .tit_separator {
        border-bottom: solid 1px #6e6e6e;
    }
    .comment {
        margin: 12px;
        padding: 12px;
    }
    .get {
        padding: 16px;
        color: #0baaff;
        background-color: black;
        border-radius: 8px;
    }
    .post {
        padding: 16px;
        color: #b2ff18;
        background-color: black;
        border-radius: 8px;
    }
    .put {
        padding: 16px;
        color: #ff850b;
        background-color: black;
        border-radius: 8px;
    }
    .delete {
        padding: 16px;
        color: #ff400b;
        background-color: black;
        border-radius: 8px;
    }
    .path {
        letter-spacing: .1rem;
        margin-left: 3px;
        color: white;
    }
    .query {
        margin-left: 3px;
        color: #ffb871;
    }
</style>

<div class="title">NODE http/https server with (almost) 0 dependences</div>
<br><br>
<div class="tit_separator"></div><br>
<div class="subtitle">Installation</div><br>
<div class="tit_separator"></div><br>
<p>To install packages (only dotenv is required and it contains only dev/prod param) run in console:</p>

```
npm i
```
<br>
<p>To run the server, use the following command:</p>

```
npm start

> http_server@1.0.0 start
> node src/index

Server running on http://localhost:3000 in development mode
Server running on https://localhost:3001 in development mode

```
<br>
<p>or, if you have nodemon globally installed, you can run it with:</p>

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

<br><br>

<div class="tit_separator"></div><br>
<div class="subtitle">process.env</div><br>
<div class="tit_separator"></div>
<br>
<p>
With NODE_ENV set to 'dev' on .env file, server will run in development mode:
</p>

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

<div class="separator"></div>

<br><br>

<div class="title">You can create, read, update or delete USERS</div>

>>> new users will be saved in 'files/users' folder. Allowed methods are: GET, POST, PUT, and DELETE.

<br><br>
<div class="tit_separator"></div><br>
<div class="subtitle">Create a new user</div><br>
<div class="tit_separator"></div>
<br>

<p>To create a new user, send a POST request to:</p>

<div class="post comment">POST - localhost:3000<span class="path">/users</span></div>

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

<p>If the user is created, you should get this JSON response:</p>

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
<div class="tit_separator"></div><br>
<div class="subtitle">Get User's data</div><br>
<div class="tit_separator"></div>
<br>

<p>To get the data from a user, first you need to login, in order to get a token.
Send a POST request to:</p>

<div class="post comment">POST - localhost:3000<span class="path">/auth/login</span></div>

<p>with this payload:</p>

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

<p>The generated token consists of three parts, separated by an underscore ( _ ).</p>
<p>The first part is a 30 random character string that will be used to name a token file saved in 'files/tokens' folder.</p>
<p>The second part is the user's dni and the third part is the creation date of the file.</p>
<br>

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

<p>Then you can do a GET request, sending the user's dni (id) by query params and the generated token in Authorization Bearer header:</p>

<div class="get comment">GET - localhost:3000<span class="path">/users?</span><span class="query">id=10111011</span></div>

<div class="get comment">Authorization <span class="path">Bearer </span><span class="query">3zx6ttgs83aajqs4qqfk4o3ot7u7mm_22444555_1656684014589</span></div>

<br>

<p>You should get a JSON response like this:</p>

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
<div class="tit_separator"></div><br>
<div class="subtitle">Update User's data</div><br>
<div class="tit_separator"></div><br>


<p>If you want to update a user, you can do a PUT request with a query using the dni number you want to update as an id:</p>

<div class="put comment">PUT - localhost:3000<span class="path">/users?</span><span class="query">id=10111011</span></div>

<div class="get comment">Authorization <span class="path">Bearer </span><span class="query">3zx6ttgs83aajqs4qqfk4o3ot7u7mm_22444555_1656684014589</span></div>


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
<div class="tit_separator"></div><br>
<div class="title">Delete a user</div><br>
<div class="tit_separator"></div><br>

<p>If you want to delete a user, you can do a DELETE request with a query using the dni of the user you want to delete:</p>

<div class="delete comment">DELETE - localhost:3000<span class="path">/users?</span><span class="query">id=10111011</span></div>
<br>

<p>you should get this response:</p>

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

<div class="tit_separator"></div><br>
<div class="subtitle">Token expiration</div><br>
<div class="tit_separator"></div>

<br>

<p>Tokens last for 30 minutes. After that time, you'll get a response like this:</p>

```json
{
    "error": true,
    "message": "Token expired. Login again in order to access."
}
```

<br><br>
<div class="separator"></div>
<br><br><br>
<div class="title">HTTPS</div><br>
<div class="tit_separator"></div><br>
<p>
In order to run the https server, both cert.pem and key.pem files are included. They are just for testing purpose and only work on localhost domain.</p>
