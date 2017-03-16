const _ = require('lodash');

module.exports = ({ rp }) =>
  ['post', ['/', require('body-parser').json(), async (req, res) => {
    const alexaRequest = req.body;
    const id = _.get(alexaRequest, 'request.requestId');
    console.log(`id: ${id}`);
    console.log(`(${id}) alexaRequest: ${JSON.stringify(alexaRequest)}`);
    const type = _.get(alexaRequest, 'request.type');
    if (type !== 'IntentRequest') {
      res.send();
      return;
    }
    const aiRequest = {
      id,
      locale: _.get(alexaRequest, 'request.locale'),
      name: _.get(alexaRequest, 'request.intent.name'),
      params: (() => {
        const params = {};
        const slots = _.get(alexaRequest, 'request.intent.slots', {});
        for (const name of Object.keys(slots)) {
          params[name] = slots[name].value;
        }
        return params;
      })(),
      session: _.get(alexaRequest, 'session.attributes', {}),
      user: {
        id: _.get(alexaRequest, 'session.user.userId'),
        accessToken: _.get(alexaRequest, 'session.user.accessToken')
      },
    };
    console.log(`(${id}) aiRequest: ${JSON.stringify(aiRequest)}`);
    const aiResponse = await rp.post({body: aiRequest});
    console.log(`(${id}) aiResponse: ${JSON.stringify(aiResponse)}`);
    const alexaResponse = {
      version: '1.0',
      response: {},
      shouldEndSession: false,
    };
    if (aiResponse.say) {
      alexaResponse.response.outputSpeech = {
        type: 'PlainText',
        text: aiResponse.say
      };
    }
    if (aiResponse.display) {
      alexaResponse.response.card = {
        type: 'Standard',
        title: aiResponse.display.title,
        text: aiResponse.display.text
      };
    }
    if (aiResponse.session) {
      alexaResponse.sessionAttributes = aiResponse.session;
    }
    if (aiResponse.finishSession) {
      alexaResponse.shouldEndSession = true;
    }
    console.log(`(${id}) alexaResponse: ${JSON.stringify(alexaResponse)}`);
    res.send(alexaResponse);
  }]];
