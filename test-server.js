var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 4000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// redirect all non-static-file paths to base path
app.use(function (req, res, next) {
  if (req.url.match(/^[\w\d\/]+$/)) {
    req.url = '/';
  }
  return next();
});

app.use('/', express.static('live-test-build'));

app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Test server started at port', port);
});
