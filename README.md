[![Dependency Status](https://david-dm.org/dragonprojects/ai-connector-alexa.svg)](https://david-dm.org/dragonprojects/ai-connector-alexa)
[![devDependency Status](https://david-dm.org/dragonprojects/ai-connector-alexa/dev-status.svg)](https://david-dm.org/dragonprojects/ai-connector-alexa?type=dev)

Connector which transforms the Alexa specific JSON format in the request to an internal AI JSON format and back for the response.


# Example Workflow

## Alexa Request

```json
{
  "version": "1.0",
  "session": {
    "new": true,
    "sessionId": "SessionId.9a0ef2ee-54cc-4db2-b665-0f6f53373bda",
    "application": {
      "applicationId": "amzn1.ask.skill.d82d4665-c351-4930-a2bb-48b98ed2dc6b"
    },
    "attributes": {},
    "user": {
      "userId": "...userId..."
    }
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.e81ff9b8-3c02-43ce-9312-43ea3b1fc20e",
    "timestamp": "2017-03-28T12:34:15Z",
    "locale": "de-DE",
    "intent": {
      "name": "newAssets",
      "slots": {
        "genre": {
          "name": "genre"
        }
      }
    }
  }
}
```

## AI Request

```json
{
  "id": "EdwRequestId.e81ff9b8-3c02-43ce-9312-43ea3b1fc20e",
  "locale": "de-DE",
  "name": "newAssets",
  "params": {},
  "session": {},
  "user": {
    "id": "...userId...",
    "accessToken": ""
  }
}
```

## AI Response

```json
{
  "session": {
    "assetId": 17754527,
    "pageStart": 1,
    "intent": {
      "name": "newAssets",
      "params": {}
    }
  },
  "say": "Affenkönig",
  "display": {
    "title": "Affenkönig",
    "text": "Eine zügellose, ausgelassene Komödie über einen Lebemann, der seine ehemaligen Schulkameraden zum Feiern nach Südfrankreich einlädt. Eine provozierende Satire mit bitterbösen Blick auf das Lebensgefühl von Männern jenseits der 40."
  }
}
```

## Alexa Response

```json
{
  "response": {
    "outputSpeech": {
      "type": "PlainText",
      "text": "Affenkönig"
    },
    "card": {
      "type": "Standard",
      "title": "Affenkönig",
      "text": "Eine zügellose, ausgelassene Komödie über einen Lebemann, der seine ehemaligen Schulkameraden zum Feiern nach Südfrankreich einlädt. Eine provozierende Satire mit bitterbösen Blick auf das Lebensgefühl von Männern jenseits der 40."
    }
  },
  "sessionAttributes": {
    "assetId": 17754527,
    "pageStart": 1,
    "intent": {
      "name": "newAssets",
      "params": {}
    }
  },
  "shouldEndSession": false,
  "version": "1.0"
}
```
