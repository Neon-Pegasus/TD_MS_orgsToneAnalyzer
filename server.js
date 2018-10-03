require('dotenv').load({ silent: true });
const app = require('./sentiment_analyzer/sentimentAnalysis.js');

app.listen(4000, () => {
  console.log('Server now listening on port 4000');
});