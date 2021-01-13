const express = require('express');

class BaseController {
  router = express.Router();
  credentialService;

  constructor(path = '/', handlers = []) { }

  // get(template, data, handlers) {
  //   this.
  // }
}

module.exports = { BaseController };