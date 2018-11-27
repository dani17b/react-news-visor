var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(port, ip, function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at '+ip+':'+port);
});
