const _ = require('lodash');

module.exports = ({ applications, rp, secret }) =>
  ['post', ['/', require('body-parser').json(), async (req, res) => {
    const alexaRequest = req.body;
    let aiRequest = {}, aiResponse, alexaResponse, error;
    const headers = { secret };
    try {
      const application = _.get(alexaRequest, 'session.application.applicationId', '');
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
