const express = require( 'express' );
const path = require( 'path' );
const colors = require( 'colors' );

const ParseServer = require( 'parse-server' ).ParseServer;
const ParseDashboard = require( 'parse-dashboard' );
const log = require( './src/util/log' );

const APP_CONFIG = require( './config/app.config' );
const PARSE_CONFIG = require( './config/parse.config' );

log( {
  APP_CONFIG,
  PARSE_CONFIG
} );

const parseApp = express();

// General Error Handler
parseApp.use( ( error, req, res, next ) => {
  res.setHeader( 'Content-Type', 'application/json' );
  res.json( {
    message: error.message,
    error
  } )
  next();
} )

// CORS handler
parseApp.use( function( req, res, next ) {
  res.header( "Access-Control-Allow-Origin", "*" );
  res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
  next();
} );

// Serve static assets from the /public folder
parseApp.use( '/public', express.static( path.join( __dirname, '/public' ) ) );

// make the Parse Server available at /parse
const parseServer = new ParseServer( PARSE_CONFIG );
parseApp.use( '/parse', parseServer );

const httpServer = require( 'http' ).createServer( parseApp );
httpServer.listen( APP_CONFIG.parseServer.port, () => {
  console.log( 'info:'.green + ` parse-server started at http://localhost:${APP_CONFIG.parseServer.port}/parse` )
} );

ParseServer.createLiveQueryServer( httpServer )



const dashApp = express();
// make the Parse Dashboard available at /dashboard
const parseDashboard = new ParseDashboard( PARSE_CONFIG, {
  allowInsecureHTTP: PARSE_CONFIG.allowInsecureHTTP
} );

dashApp.use( '/dashboard', parseDashboard );

// Parse Server plays nicely with the rest of your web routes
dashApp.get( '/', ( req, res ) => {
  res.setHeader( 'Content-Type', 'application/json' );
  res.end( JSON.stringify( {
    'dashboard': `http://localhost:${APP_CONFIG.server.port}/dashboard`,
    'parse-server': `http://localhost:${APP_CONFIG.parseServer.port}/parse`
  }, null, 2 ) );
} )

dashApp.listen( APP_CONFIG.server.port, () => {
  console.log( 'info:'.green + ` Dashboard started at    http://localhost:${APP_CONFIG.server.port}/dashboard` )
  console.log( 'info:'.green + " press CTRL+C to stop" )
  console.log( "" )
} );