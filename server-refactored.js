'use strict'

const http = require( 'http' );
const fs = require( 'fs' );


const server = http.createServer( userConnection ).listen( 8080 );

function userConnection ( request, response ) {
  console.log( 'tickle tickle tickle' );

  request.setEncoding( 'utf8' );
  console.log( request.method );
};