var express = require('express');
var app = express();
var fs = require('fs');

var cors = require('cors');
app.use(cors())



app.get('/news', function (req, res) {
    // https://newsapi.org/
    fs.readFile("data.json", function (err, data) {
        res.send(JSON.parse(data));
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
