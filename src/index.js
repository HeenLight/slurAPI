const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const toxicity = require("@tensorflow-models/toxicity");

app.use(express.json());

const model = toxicity.load(0.75);

// Set up rate limiter
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 30, // limit each IP to 30 requests per windowMs
});

app.post("/api/v1", limiter, async (req, res) => {
  const data = req.body.data;
  console.log(data);
  const predictions = (await model).classify(data).then((predictions) => {
    console.log("Predictions: ");
    const matchedLabels = predictions
      .filter((label) => label.results[0].match === true || label.results[0].match === null)
      .map((label) => {
        const probabilities = label.results[0].probabilities;
        const trueProb = (probabilities["1"] * 100).toFixed(2);
        const falseProb = (probabilities["0"] * 100).toFixed(2);
        return {
          label: label.label,
          trueProb: `${trueProb}%`,
          falseProb: `${falseProb}%`,
        };
      });
    console.log(matchedLabels);
    res.json({
      data: data,
      matchedLabels: matchedLabels
    });
  });
});

app.listen(3005, () => {
  console.log("Server listening on port 3005");
});
