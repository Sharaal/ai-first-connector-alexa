module.exports = ({ rp }) =>
  ['post', ['/', require('body-parser').json(), async (req, res) => {
    const alexaRequest = req.body;
    let aiRequest, aiResponse, alexaResponse, error;
    try {
      aiRequest = require('./transformers/request')(alexaRequest);
      if (aiRequest) {
        aiResponse = await rp.post({ body: aiRequest });
        alexaResponse = require('./transformers/response')(aiResponse);
      }
    } catch (e) {
      error = e.message;
    }
    console.log(`(${aiRequest.id}): ${JSON.stringify({ alexaRequest, aiRequest, aiResponse, alexaResponse, error })}`);
    res.send(alexaResponse);
  }]];
