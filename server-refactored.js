'use strict'

const http = require( 'http' );
const fs = require( 'fs' );
const querystring = require( 'querystring' );
const requestHandlers = require( './requestHandlers');

//console.log( requestHandlers );

const server = http.createServer( userConnection ).listen( 8080 );

function userConnection ( request, response ) {
  request.setEncoding( 'utf8' );

  switch ( request.method ) {
    case 'GET' :
      return requestHandlers.GET( request, response );
  }
  response.end();
}