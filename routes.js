import express from 'express'

import readDBRouter from './routes/readDB.js'
import getLastStravaActivityRouter from './routes/getLastStravaActivity.js'

function routes(app) {
  app.use("/readDB", readDBRouter);
  app.use("/getLastActivity", getLastStravaActivityRouter);
};

export default routes;