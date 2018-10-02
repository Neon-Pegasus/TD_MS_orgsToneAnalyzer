require('dotenv').config();
import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3';

const toneAnalyzer = new ToneAnalyzerV3({
  url: process.env.TONE_ANALYZER_URL,
  version: process.env.TONE_ANALYZER_VERSION_DATE,
  iam_apikey: process.env.TONE_ANALYZER_APIKEY,
});

const text = 'There is not any official documentation dictating that right-to-left languages should add "rtl" attribute in addition to "lang" to the "html" tag, so it would be at-least helpful to let people know about this issue with this package.';
const toneParams = {
  tone_input: { text },
  content_type: 'application/json',
};
toneAnalyzer.tone(toneParams, (error, toneAnalysis) => {
  if (error) {
    console.log(error);
  } else {
    // TODO: save toneAnalysis to a database
    const tones = toneAnalysis;
    console.log(tones.document_tone.tones);
  }
});

const _toneAnalyzer = toneAnalyzer;
export { _toneAnalyzer as toneAnalyzer };