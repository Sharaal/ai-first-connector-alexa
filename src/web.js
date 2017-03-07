require('dotenv').config({ silent: true });
const _ = require('lodash');

const app = require('express')();
app.listen(process.env.PORT);

const rp = require('request-promise').defaults({
  json: true,
  url: process.env.AI_WEBHOOK_URL,
});

app.post('/', require('body-parser').json(), async (req, res) => {
  const alexaRequest = req.body;
  const type = _.get(alexaRequest, 'request.type');
  if (type !== 'IntentRequest') {
    res.send();
    return;
  }
  const aiRequest = {
    name: _.get(alexaRequest, 'request.intent.name'),
    params: (() => {
      const params = {};
      const slots = _.get(alexaRequest, 'request.intent.slots', {});
      for (const name of Object.keys(slots)) {
        params[name] = slots[name].value;
      }
      return params;
    })(),
  };
  const aiResponse = await rp.post({ body: aiRequest });
  const alexaResponse = {};
  if (aiResponse.say) {
    alexaResponse.outputSpeech = { type: 'PlainText', text: aiResponse.say };
  }
  if (aiResponse.display) {
    alexaResponse.card = { type: 'Standard', title: aiResponse.display.title, text: aiResponse.display.text };
  }
  res.send(alexaResponse);
});
