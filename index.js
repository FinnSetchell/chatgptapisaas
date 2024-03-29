// A express server, which will handle api request coming in and willrespond back with a json object, it will use body parser as well as cors
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-YjmrgvYVVnrMBE1iQipjdOwH",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
      });
      console.log(response.data)
      if (response.data){
        if (response.data.choices[0].text){
            res.json({message: response.data.choices[0].text});
        }
      }
      res.json({
        message: "Hello from server!",
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});