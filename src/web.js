require('dotenv-safe').config();

const app = require('dexpress')();

require('dmiddlewares')(app, [
  require('body-parser').json(),
]);

require('dcontrollers')(app, [
  require('./controller')({
    rp: require('request-promise').defaults({
      json: true,
      url: process.env.AI_WEBHOOK_URL,
    }),
  }),
]);
