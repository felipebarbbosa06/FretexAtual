import * as functions from 'firebase-functions';
const express = require('express');
import router from './routes';

const cors = require('cors')({
  origin: true,
});

const app = express();
app.use(cors);
app.use('/', router);

export const api = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`;
  }
  return app(request, response);
});
