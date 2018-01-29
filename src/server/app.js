import path from "path";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import bodyParser from 'body-parser';
import cors from 'cors';
import GraphHTTP from 'express-graphql';
import Schema from './graphql/schema';
//import * as config from "../../webpack.dev.config.js";
const config = require("../../webpack.dev.config.js");

const server = express();

const CLIENT_DIR = path.join(__dirname, '../client');
const HTML_FILE = path.join(CLIENT_DIR, 'index.html');
const isDevelopment = process.env.NODE_ENV !== 'production';
const DEFAULT_PORT = 3000;
const webpackCompiler = webpack(config);

server.set("port", process.env.PORT || DEFAULT_PORT);
server.use(cors());

server.use('/graphql', bodyParser.json(), GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: isDevelopment
}));

if (isDevelopment) {
  console.log("SERVER ON DEVELOPMENT MODE");

  server.use(webpackDevMiddleware(webpackCompiler, {
    publicPath: config.output.publicPath
  }));

  server.use(webpackHotMiddleware(webpackCompiler));

  server.get("/", (req, res, next) => {
    webpackCompiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
      if (err) {
        return next(err.message);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
}
else {
  console.log("SERVER ON PRODUCTION MODE");

  server.use(express.static(CLIENT_DIR));
  server.get("/", (req, res) => res.sendFile(HTML_FILE));
}

server.use((req, res, next) => {
  next('404 not found');
});

server.listen(server.get("port"), () => {
  console.log(`Server running on ${server.get("port")}`)
});