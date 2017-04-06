const _ = require('lodash');

module.exports = (alexaRequest, { secret }) => {
  if (_.get(alexaRequest, 'request.type') !== 'IntentRequest') {
    return;
  }
  return {
    application: _.get(alexaRequest, 'session.application.applicationId', ''),
    connector: 'alexa',
    id: _.get(alexaRequest, 'request.requestId', ''),
    locale: _.get(alexaRequest, 'request.locale', ''),
    name: _.get(alexaRequest, 'request.intent.name', ''),
    params: (() => {
      const params = {};
      const slots = _.get(alexaRequest, 'request.intent.slots', {});
      for (const name of Object.keys(slots)) {
        params[name] = slots[name].value;
      }
      return params;
    })(),
    secret: secret,
    session: _.get(alexaRequest, 'session.attributes', {}),
    user: {
      id: _.get(alexaRequest, 'session.user.userId', ''),
      accessToken: _.get(alexaRequest, 'session.user.accessToken', ''),
    },
  };
};
