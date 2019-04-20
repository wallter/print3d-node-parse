const APP_CONFIG = require( './app.config' );

module.exports = {
  "databaseURI": "http://127.0.0.1:27017/parse",
  "cloud": "./cloud/main",
  "serverURL": `http://127.0.0.1:${APP_CONFIG.server.port}/parse`,
  "appId": "xXFPfvsRjjHsUimJT5nQmt5t6X9hfMK8NOuWk2pW",
  "masterKey": "Jx5ywzxK9DWLjQbZJC0KPlyouBTqWjhp6ShIRoVS",
  "appName": "Print3D",
  "liveQuery": {
    "classNames": []
  },

  "apps": [ {
    "serverURL": `http://127.0.0.1:${APP_CONFIG.server.port}/parse`,
    "appId": "xXFPfvsRjjHsUimJT5nQmt5t6X9hfMK8NOuWk2pW",
    "masterKey": "Jx5ywzxK9DWLjQbZJC0KPlyouBTqWjhp6ShIRoVS",
    "appName": "Print3D"
  } ]
}