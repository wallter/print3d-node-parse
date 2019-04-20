const express = require( 'express' );

const ParseServer = require( 'parse-server' ).ParseServer;
const ParseDashboard = require( 'parse-dashboard' );
const log = require( './src/util/log' );

const {
  server: SERVER_CONFIG
} = require( './config/app.config' );
const PARSE_CONFIG = require( './config/parse.config' );

log( {
  PARSE_CONFIG,
  SERVER_CONFIG
} );

const parseServer = new ParseServer( PARSE_CONFIG );
const parseDashboard = new ParseDashboard( {
  apps: PARSE_CONFIG.apps
}, {
  allowInsecureHTTP: false
} );

const app = express();

// General Error Handler
app.use( ( error, req, res, next ) => {
  res.setHeader( 'Content-Type', 'application/json' );
  res.json( {
    message: error.message,
    error
  } )
  next();
} )

// CORS handler
app.use( function( req, res, next ) {
  res.header( "Access-Control-Allow-Origin", "*" );
  res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
  next();
} );

app.get( '/', ( req, res ) => {
  res.setHeader( 'Content-Type', 'application/json' );
  res.end( JSON.stringify( {
    'dashboard': `http://localhost:${SERVER_CONFIG.port}/dashboard`,
    'parse-server': `http://localhost:${SERVER_CONFIG.port}/parse`
  }, null, 2 ) );
} )

// make the Parse Server available at /parse
app.use( '/parse', parseServer );

// make the Parse Dashboard available at /dashboard
app.use( '/dashboard', parseDashboard );

try {
  const httpServer = require( 'http' ).createServer( app );
  httpServer.listen( SERVER_CONFIG.port, () => {
    console.log( `Dashboard started at    http://localhost:${SERVER_CONFIG.port}/dashboard` )
    console.log( `parse-server started at http://localhost:${SERVER_CONFIG.port}/parse` )
    console.log( "press CTRL+C to stop" )
    console.log( "" );
  } );
} catch ( e ) {
  console.error( e );
}