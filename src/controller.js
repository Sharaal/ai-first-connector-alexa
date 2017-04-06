const _ = require('lodash');
const jwt = require('jsonwebtoken');

module.exports = ({ applications, rp, secret }) =>
  ['post', ['/', require('body-parser').json(), async (req, res) => {
    const alexaRequest = req.body;
    let aiRequest, aiResponse, alexaResponse, error;
    try {
      const application = _.get(alexaRequest, 'session.application.applicationId', '');
      if (applications && !applications.includes(application)) {
        throw new Error('incorrect application');
      }
      aiRequest = require('./transformers/request')(alexaRequest);
      if (aiRequest) {
        const headers = {};
        if (secret) {
          headers['jwt'] = jwt.sign({ application, connector: 'alexa' }, secret);
        }
        aiResponse = await rp.post({ body: aiRequest, headers });
        alexaResponse = require('./transformers/response')(aiResponse);
      }
    } catch (e) {
      error = e.message;
    }
    console.log(`(${aiRequest.id}): ${JSON.stringify({ alexaRequest, aiRequest, aiResponse, alexaResponse, error })}`);
    res.send(alexaResponse);
  }]];
