const _ = require('lodash');
const jwt = require('jsonwebtoken');

module.exports = ({ applications, rp, secret }) =>
  ['post', ['/', require('body-parser').json(), async (req, res) => {
    const alexaRequest = req.body;
    let aiRequest, aiResponse, alexaResponse, error;
    const application = _.get(alexaRequest, 'session.application.applicationId', '');
    const headers = {};
    if (secret) {
      headers['jwt-token'] = jwt.sign({ application, connector: 'alexa' }, secret);
    }
    try {
      if (applications && !applications.includes(application)) {
        throw new Error('incorrect application');
      }
      aiRequest = require('./transformers/request')(alexaRequest);
      if (aiRequest) {
        aiResponse = await rp.post({ body: aiRequest, headers });
        alexaResponse = require('./transformers/response')(aiResponse);
      }
    } catch (e) {
      error = e.message;
    }
    console.log(`(${aiRequest.id}): ${JSON.stringify({ alexaRequest, aiRequest, aiResponse, alexaResponse, error, headers })}`);
    res.send(alexaResponse);
  }]];
