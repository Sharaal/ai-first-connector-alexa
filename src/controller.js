const _ = require('lodash');

module.exports = ({ applications, rp, secret }) => [
  'post',
  [
    '/',
    require('body-parser').json(),
    async (req, res) => {
      const alexaRequest = req.body;
      let aiRequest;
      let aiResponse;
      let alexaResponse;
      try {
        const application = _.get(
          alexaRequest,
          'session.application.applicationId',
          ''
        );
        if (applications && !applications.includes(application)) {
          throw new Error('incorrect application');
        }
        aiRequest = require('./transformers/request')(alexaRequest);
        if (aiRequest) {
          aiResponse = await rp.post({ body: aiRequest, headers: { secret } });
          alexaResponse = require('./transformers/response')(aiResponse);
        }
        console.log(
          JSON.stringify({ alexaRequest, aiRequest, aiResponse, alexaResponse })
        );
      } catch (e) {
        const error = e.message;
        console.error(
          JSON.stringify({
            error,
            alexaRequest,
            aiRequest,
            aiResponse,
            alexaResponse,
          })
        );
      }
      res.send(alexaResponse);
    },
  ],
];
