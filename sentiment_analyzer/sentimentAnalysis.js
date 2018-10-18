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

const sentAnalyzer = (comment) => {
  return new Promise((resolve, reject) => {
    sentiment.analyze({
        text: comment,
        features: {
          sentiment: {},
          keywords: {}
        }
      }, (error, analysis) => {
        if (error) {
          reject(error);
        }
        resolve(analysis.sentiment.document.score);
      });
    });
}

const analyzeGithubComments = (array) => {
  const comments = array.slice(0);
  const promises = [];
  for (let i = 0; i < comments.length; i += 1) {
    const comment = comments[i];
    promises.push(sentAnalyzer(comment));
  }
  return Promise.all(promises);
}

const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.get('/', (req, res) => {
  // TODO: send sentiment analysis data from db in response
  res.send('you\'ve reached the sentiment analysis server...');
});

app.post('/', (req, res, next) => {
  const { text } = req.body;

  analyzeGithubComments(text)
    .then((results) => {
      const analysis = {};
      console.log(results);
      const score = results.reduce((acc, val) => {
        return acc + val;
      }, 0);
      analysis.score = score;
      console.log(score);
      if (Math.sign(score) === -1) {
        analysis.sentiment = 'negative';
      }
      if (Math.sign(score) === 1 && score > 0) {
        analysis.sentiment = 'positive';
      }
      console.log(analysis);
      res.send(analysis);
      })
    .catch((error) => {
      console.log(error);
      res.send(error.message);
    })
});

app.post('/user/input', (req, res) => {
    sentiment.analyze({
        text: req.body.text,
        features: {
          sentiment: {},
          keywords: {}
        }
      }, (error, analysis) => {
        if (error) {
          res.send(error);
        }
        res.send(analysis);
      });
})

module.exports = app;


        // TODO: save toneAnalysis to a database
        //   Organizations.create({ orgName: 'Some Org Name',
        //   orgRepoName: 'Some Repo Name',
        //   score: 0.000000,
        //   sentiment: 'sentiment'
        // });


        // console.log(comment);
        // // CONSTRUCT PARAM FROM COMMENT
        // const params = {
        //   text: comment,
        //   features: {
        //     sentiment: {},
        //     keywords: {}
        //   }
        // };
    
        // // RUN SENTIMENT ANALYSIS ON COMMENT
        // sentiment.analyze(params, (error, sentimentAnalysis) => {
        //   if (error) {
        //     console.log(error);
        //   }
        //   console.log(sentimentAnalysis);
        // });