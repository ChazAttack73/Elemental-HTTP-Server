var http = require( 'http' );
var fs = require( 'fs' );
var reqDate = new Date();


var server = http.createServer( connectionMade ).listen( 8080 );

function connectionMade( req, res ) {
  //console.log( req );
  //console.log( res );
  var contentTypeFinder = req.url.split( '.' );
  var contentType = contentTypeFinder[1];

  if( req.method === 'GET' ) {
    if( req.url === '/' ) {
      req.url = '/index.html';
    }
    return fs.readFile( 'public' + req.url, function ( err, data ) {
      if ( err ) {
        console.log( err );
        return fs.readFile( 'public/404.html', function ( err, data ) {
          if ( err ) console.log( err );
          res.writeHead( 404, {
            'Server': 'Chaz Attack',
            'Content-Type': 'text/html; charset=utf-8',
            'Date': reqDate
          });
          return req.end( data );
        });
      }
      res.writeHead( 200, {
        'Server': 'Chaz Attack',
        'Content-Type': 'text/' + contentType + '; charset=utf-8',
        'Date': reqDate
      });
      return req.end( data );
    });
  }

  res.end( 'hello you' );
}