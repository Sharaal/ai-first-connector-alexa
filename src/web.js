require('dotenv-safe').config();

const app = require('express')();
app.disable('x-powered-by');

require('@dnode/middlewares')(app, [require('body-parser').json()]);

require('@dnode/controllers')(app, [
  require('./controller')({
    rp: require('request-promise').defaults({
      json: true,
      url: process.env.AI_WEBHOOK_URL,
    }),
  }),
]);

if (module.parent) {
  module.exports = app;
} else {
  app.listen(process.env.PORT);
}
