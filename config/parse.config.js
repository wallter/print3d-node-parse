const APP_CONFIG = require( './app.config' );

const BASE_PARSE_CONFIG = {
  serverURL: `http://127.0.0.1:${APP_CONFIG.parseServer.port}/parse`,
  appId: "xXFPfvsRjjHsUimJT5nQmt5t6X9hfMK8NOuWk2pW",
  masterKey: "Jx5ywzxK9DWLjQbZJC0KPlyouBTqWjhp6ShIRoVS",
  appName: "Print3D",
};

module.exports = {
  host: `http://127.0.0.1:${APP_CONFIG.server.port}/dashboard`,

  serverPort: APP_CONFIG.server.port,
  dashboardPort: APP_CONFIG.server.port,

  ...BASE_PARSE_CONFIG,

  trustProxy: 1,
  useEncryptedPasswords: false,
  verifyUserEmails: false,
  allowInsecureHTTP: false,

  liveQuery: {
    "classNames": []
  },

  apps: [ {
    ...BASE_PARSE_CONFIG,

    production: false,
    supportedPushLocales: [
      "en"
    ]
  } ],

  users: [
    {
      user: "admin",
      pass: "admin"
    },
    {
      user: "readonly",
      pass: "password",
      readOnly: true
    },
  ]
}