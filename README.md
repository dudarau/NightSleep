# NightSleep

The library helps you to implement live tests. 

We should test a lot of cases in live: timeouts, server errors and so on.

Current implementation is working only with Express.

#### Initialization

````
npm install nightsleep --save
````

#### Usage
Example of usage with Express

```js
const NigthSleep =  require('../index');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const config = require('./example.json');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


NigthSleep.initRoutes(app, console, config);

app.listen(3000, () => console.info('App listening on port 3000!'));

```

#### Structure of route-configuration.

Example of config-file is [here](https://github.com/dudarau/NightSleep/blob/master/example/example.json)

First route that can process a request will do it and send response without propagation
it into next routes.   

|property | meaning |
|---|------------|
|url| request url |
|method| HTTP-method(capitalized) |
|status | returns as a result of successful request|
|body| response body |
|params| object with properties that match parameter names in the url and as value is array with values |
|bodyParams| the same as params but for body parameters |
|queryParams| the same as params but for query parameters |

Also instead of each response we can get server-error or timeout, for this need to use additional headers:

|header | value |
|---|------------|
|x-night-sleep| 'timeout'(timeout based on value-header) OR 'server-error'(returns 501) |
|x-night-sleep-value| value for timeout |

Request reaches success if all parameters are valid and no special headers were sent. It returns 'status' and 'body'.  

An example - the enpoint for two customers, customerNumber should be sent in url, that returns 200 and body with benefits:
```json
{
  "url": "/subscription-service/members/:customerNumber",
  "method": "GET",
  "status": 200,
  "body": {
    "benefits": {
      "VOUCHER_OPTION": "MOCK-BENEFIT"
    }
  },
  "params": {
    "customerNumber": ["304045544", "304063444"]
  }
}
``` 
