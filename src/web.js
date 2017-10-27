require('@dnode/env');
require('@dnode/express')(app => {
  require('@dnode/middlewares')(app, [require('body-parser').json()]);
  require('@dnode/controllers')(app, [
    require('./controller')({
      rp: require('request-promise').defaults({
        json: true,
        url: process.env.AI_WEBHOOK_URL,
      }),
    }),
  ]);
});
