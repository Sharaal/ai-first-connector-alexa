module.exports = ({ rp }) => [
  'post',
  [
    '/',
    async (req, res) => {
      const alexaRequest = req.body;
      let aiRequest;
      let aiResponse;
      let alexaResponse;
      try {
        aiRequest = require('./transformers/request')(alexaRequest);
        if (aiRequest) {
          aiResponse = await rp.post({ body: aiRequest });
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
