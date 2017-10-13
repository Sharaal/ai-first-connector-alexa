const _ = require('lodash');

module.exports = aiResponse => ({
  response: {
    outputSpeech: {
      type: 'PlainText',
      text: _.get(aiResponse, 'say', ''),
    },
    card: (() => {
      if (_.get(aiResponse, 'requireAccessToken')) {
        return { type: 'LinkAccount' };
      }
      if (_.has(aiResponse, 'display')) {
        return {
          type: 'Standard',
          title: _.get(aiResponse, 'display.title', ''),
          text: _.get(aiResponse, 'display.text', ''),
        };
      }
    })(),
  },
  sessionAttributes: _.get(aiResponse, 'session', {}),
  shouldEndSession: _.get(aiResponse, 'finishSession', false),
  version: '1.0',
});
