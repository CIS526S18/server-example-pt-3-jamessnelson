/** @module multipart
  * A module for parsing multipart form bodies
  */

module.exports = multipart;

function multipart(req, res, next) {
  var chunks = []
  req.on('data', function(chunk){
    chunks.push(chunk);
  });

  req.on('end', function(){
    var buffer = buffer.concat(chunks);
    var match = /boundary=(.+);?/.exec(req.headers['content-type']);
    if(match) {
      //TODO: parse body
      req.body = parseMultipartBody(match[1]);
      next(req, res);
    } else {
        res.statusCode = 500;
        res.end("Server error");
    }
  });

  req.on('error', function(){
    console.error(err);
    res.statusCode = 500;
    res.end("Server error");
  })
}
