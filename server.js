var http = require( 'http' );
var fs = require( 'fs' );
var querystring = require( 'querystring');
var reqDate = new Date();


var server = http.createServer( connectionMade ).listen( 8080 );

function connectionMade( req, res ) {
  //console.log( req );
  //console.log( res );

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
            'Date': reqDate
          });
          res.end( data );
        });
      }
      res.writeHead( 200, {
        'Server': 'Chaz Attack',
        'Date': reqDate
      });
      res.end( data );
    });
  }

  if( req.method === 'POST' ) {
    if( req.url === '/elements' ) {
      req.setEncoding( 'utf8' );
      req.on( 'data', function( chunk ) {
        var parsedChunk = querystring.parse( chunk );
        //console.log( parsedChunk );

        fs.readFile( 'public/element-template.html', function( err, data ) {
          if ( err ) console.log( err );
            var stringyTemplate = data.toString();
            //console.log( stringyTemplate );

            var newElement = stringyTemplate
              .replace( '{{NEW NAME HERE}}', parsedChunk.elementName )
              .replace( '{{NEW ELEMENT NAME}}', parsedChunk.elementName )
              .replace( '{{NEW ELEMENT SYMBOL}}', parsedChunk.elementSymbol )
              .replace( '{{NEW ELEMENT ATOMIC NUMBER}}', parsedChunk.elementAtomicNumber )
              .replace( '{{NEW ELEMENT DESCRIPTION}}', parsedChunk.elementDescription );
              //console.log( newElement );


            fs.writeFile( 'public/' + parsedChunk.elementName + '.html', newElement, function( err ) {
              if ( err ) console.log( err );
            });
        });
      });
    }
    res.end();
  }
}