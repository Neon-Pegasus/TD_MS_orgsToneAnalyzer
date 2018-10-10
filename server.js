require('dotenv').load({ silent: true });
const app = require('./sentiment_analyzer/sentimentAnalysis.js');

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server now listening...${port}`);
});