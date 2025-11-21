const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../../webpack.dev");

const server = new WebpackDevServer({ open: false }, webpack(config));

const runServer = async () => {
  console.log("Starting server on port " + server.port);
  await server.start();
};

runServer();
