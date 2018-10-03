require('dotenv').load({ silent: true });
const app = require('./tone_analyzer/index.js');

app.listen(4000, () => {
  console.log('Server now listening on port 4000');
});