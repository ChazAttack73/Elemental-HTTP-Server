'use strict'

const http = require ( 'http' );
const fs = require ( 'fs' );

module.exports = GET;

function GET ( request, response ) {
  if ( request.url === '/' ) {
    request.url = '/index.html';
  }

  return fs.readFile ( 'public' + request.url, (err, data ) => {
    if ( err ) {
      return fs.readFile ( 'public/404.html', (err, data ) => {
        if ( err ) console.log ( err );
      response.end( data );
      });
    }
  response.end( data );
  });
}