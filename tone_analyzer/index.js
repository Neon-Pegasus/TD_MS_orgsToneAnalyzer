const express =require('express');
require('dotenv').config();
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const app = express();

const sentiment = new NaturalLanguageUnderstandingV1({
  url: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL,
  version: process.env.TONE_ANALYZER_VERSION_DATE,
  iam_apikey: process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY,
});

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('/client'));


app.get('/', (req, res) => {
  res.render('/client');
});

app.post('/', (req, res, next) => {
  sentiment.analyze(req.body, (error, sentimentAnalysis) => {
    if (error) {
      console.log(error);
    }
      // TODO: save toneAnalysis to a database
    console.log(sentimentAnalysis);
  });
});

module.exports = app;








// const text = 'There is not any official documentation dictating that right-to-left languages should add "rtl" attribute in addition to "lang" to the "html" tag, so it would be at-least helpful to let people know about this issue with this package.';
// const toneParams = {
//   tone_input: { text },
//   content_type: 'application/json',
// };