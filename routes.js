import express from 'express'

import addItemDBRouter from './routes/addItemDB.js'
import getItemDBRouter from './routes/getItemDB.js'
import getLastStravaActivityRouter from './routes/getLastStravaActivity.js'

function routes(app) {
  app.use("/getLastActivity", getLastStravaActivityRouter);
  app.use("/addItemDB", addItemDBRouter);
  app.use("/getItemDB", getItemDBRouter);
};

export default routes;