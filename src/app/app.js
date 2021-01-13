const express = require('express');
const config = require('./config/config');
const controllers = require('./controllers');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const path = require('path');

class App {
  app = express();
  controllers = controllers;

  constructor() { }

  start() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.serveStaticAssets();
    this.routes();

    this.app.listen(config.server.port, () => {
      console.log(`Server is running on port ${config.server.port}`);
    });
  }

  routes() {
    this.controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  serveStaticAssets() {
    this.app.use(
      express.static(path.join(__dirname, 'public'))
    );
  }
}

module.exports = App;