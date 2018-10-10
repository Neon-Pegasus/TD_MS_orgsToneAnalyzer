const express =require('express');
require('dotenv').config();
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const { Organizations } = require('./../database');
const app = express();

const sentiment = new NaturalLanguageUnderstandingV1({
  url: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL,
  version: process.env.NATURAL_LANGUAGE_UNDERSTANDING_VERSION_DATE,
  iam_apikey: process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY,
});

const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.get('/', (req, res) => {
  // TODO: send sentiment analysis data from db in response
  res.send('you\'ve reached the sentiment analysis server...');
});

app.post('/', (req, res, next) => {
  sentiment.analyze(req.body, (error, sentimentAnalysis) => {
    console.log('BODY', req.body);
    if (error) {
      console.log(error);
    }
      // TODO: save toneAnalysis to a database
        Organizations.create({ orgName: 'Some Org Name',
        orgRepoName: 'Some Repo Name',
        score: 0.000000,
        sentiment: 'sentiment'
      });
    res.json({query: req.body.query, sentimentAnalysis});
  });
});

module.exports = app;
