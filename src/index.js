const container = require('./ioc/container');
const app = new (require('./app/app'))();

// inject services

// start app
app.start();
