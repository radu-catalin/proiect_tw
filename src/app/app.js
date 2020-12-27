const express = require('express');
const config = require('../config/config');

class App {
  expressApp = express();

  constructor() {
    // inject needed services
  }

  start() {
    // instantiate routes

    this.expressApp.listen(config.server.port, () => {
      console.log(`Server is running on port ${config.server.port}`);
    });
  }
}

module.exports = App;