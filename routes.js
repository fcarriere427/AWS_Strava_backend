import express from 'express'

import addDBRouter from './routes/addDB.js'
import getLastStravaActivityRouter from './routes/getLastStravaActivity.js'

function routes(app) {
  app.use("/getLastActivity", getLastStravaActivityRouter);
  app.use("/addDB", addDBRouter);
};

export default routes;