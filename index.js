const { Configuration, OpenAIApi } = require("openai");
const express = require("express");

require("dotenv").config();

const configuration = new Configuration({
  organization: "org-yW9zHbSFTi7929b7XCkx54VB",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;

app.get("/models", async (req, res) => {
  const response = await openai.listEngines();

  res.json({
    models: response.data.data,
  });
});

app.post("/", async (req, res) => {
  const { message } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 100,
    temperature: 0.5,
  });

  res.json({
    message: response.data.choices[0].text,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
