# Express Rate Limit and Toxicity Model API

This is an API that uses the Express Rate Limit middleware and the TensorFlow.js Toxicity model to classify toxic comments.

---

# Getting Started

To get started with this API, follow these steps:

```
* Clone this repository
* Install dependencies: npm install
* Start the server: npm start
* The API will be available at http://localhost:3005.
```
# Using API without hosting
You can also use the API without having to install all the packages and create a web server. 
Its available at the RapidAPI website: https://rapidapi.com/HeenLight/api/slur-api1
The site provides instructions and a playground for testing the API. 
## Limitations:
3000 requests per day, or if you want to support my work you can take a premium subscription where no limit. 


# API Endpoints

## POST /api/v1

This endpoint accepts JSON data in the request body with a key of data, and responds with a JSON object containing the original data and an array of matched labels.

### Request Body

```json
{
  "data": "This is a toxic comment"
}
```

### Response Body

```json
{
  "data": "This is a toxic comment",
  "matchedLabels": [
    {
      "label": "identity_attack",
      "trueProb": "99.58%",
      "falseProb": "0.42%"
    },
    {
      "label": "insult",
      "trueProb": "99.62%",
      "falseProb": "0.38%"
    },
    {
      "label": "obscene",
      "trueProb": "99.81%",
      "falseProb": "0.19%"
    },
    {
      "label": "threat",
      "trueProb": "99.75%",
      "falseProb": "0.25%"
    }
  ]
}
```

# Rate Limiting
This API uses the express-rate-limit middleware to limit the number of requests that can be made to the /api/v1 endpoint. Each IP address is limited to 30 requests per second. If a client exceeds this limit, they will receive a 429 Too Many Requests response.

# Docker Image
To build a Docker image for this API, follow these steps:

* Create a file called Dockerfile in the root of the project.
* Copy the following code into the Dockerfile:

```Dockerfile
FROM node:16

WORKDIR /app

COPY package\*.json ./

RUN npm install

COPY ./src .

EXPOSE 3005

CMD ["node", "index.js"]
```
* Open a terminal window and navigate to the root of the project.
Build the Docker image by running the following command:
```
docker build -t express-toxicity-api .
Start a container based on the Docker image by running the following command:
docker run -p 3005:3005 express-toxicity-api
```
Or you can pull latest image from Docker Hub
```
docker run -p 3005:3005 heenlight/slur-api:latest
``` 

The API will be available at http://localhost:3005.

---
# *If you have a desire to help with the development of the project, I am happy for any help in the pull request that you send.*
