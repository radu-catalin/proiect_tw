const container = require('./app/ioc/container');

const RequestStore = require('./app/modules/shared/stores/request.store').RequestStore;

// inject services
[RequestStore].forEach(service => container.add(service));

// start app
const app = new (require('./app/app'))();
app.start();
