const express = require( 'express' );

const ParseServer = require( 'parse-server' ).ParseServer;
const ParseDashboard = require( 'parse-dashboard' );
const log = require( './src/util/log' );

const APP_CONFIG = require( './config/app.config.json' );
const PARSE_CONFIG = require( './config/parse.config.json' );

log( {
  PARSE_CONFIG,
  APP_CONFIG
} );

const parseServer = new ParseServer( PARSE_CONFIG );
const parseDashboard = new ParseDashboard(
  PARSE_CONFIG, {
    allowInsecureHTTP: false
  }
);

const app = express();

app.use( ( error, req, res, next ) => {
  res.json( {
    message: error.message,
    error
  } )
} )

// make the Parse Server available at /parse
app.use( '/parse', parseServer );

// make the Parse Dashboard available at /dashboard
app.use( '/dashboard', parseDashboard );

try {
  const httpServer = require( 'http' ).createServer( app );
  httpServer.listen( APP_CONFIG.port, () => {
    console.log( `Dashboard started at    http://localhost:${APP_CONFIG.port}/dashboard` )
    console.log( `parse-server started at http://localhost:${APP_CONFIG.port}/parse` )
    console.log( "press CTRL+C to stop" )
    console.log( "" );
  } );
} catch ( e ) {
  console.error( e );
}