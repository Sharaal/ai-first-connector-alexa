require('dotenv').config({ silent: true });

const { app } = require('dexpress');
const rp = require('request-promise').defaults({ json: true, url: process.env.AI_WEBHOOK_URL });
require('dcontrollers')(app, [
  require('./controller')({ rp }),
]);
