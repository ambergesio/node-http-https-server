const url = require('url');
const { StringDecoder } = require('string_decoder');


const routers = require('../router/routes');
const handlers = require('../router/handlers');



const unifiedServer = (req, res) => {
  //This line gets the url from the request and parses it
  const parsedUrl = url.parse(req.url, true);

  //get the path from the parsed url
  const path = parsedUrl.pathname;
  // deletes / grom the beginning and end but not from the middle
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  //get the query from the parsed url
  const queryStringObject = parsedUrl.query;

  //get the method from que request
  const method = req.method.toLowerCase();

  //get the headers from the request
  const headers = req.headers;

  // get the payload if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  // get the data that comes in chunks in the request and store it in a variable called buffer
  req.on('data', (data) =>{
    buffer += decoder.write(data);
  });
  // when there is no more data, the request and the decoder end
  req.on('end', () => {
    buffer += decoder.end();

    //choose the handler acording to the selected path of the request
    const choosenHandler = routers[`${trimmedPath}`] !== undefined ? routers[`${trimmedPath}`] : handlers.notFound;

    // this is the data sended to the router and returned in the handler callback
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer
    };

    //route the request to the chosen handler from path
    choosenHandler(data, (statusCode, payload) => {
      statusCode = typeof(statusCode) === 'number' ? statusCode : 400;
      payload = typeof(payload) === 'object' ? payload : {};
      const payloadStringify = JSON.stringify(payload);

      res.setHeader('Content-Type', 'application/json')
      res.writeHead(statusCode);
      res.end(payloadStringify);

    });  
  });
};

module.exports = unifiedServer;
