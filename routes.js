import express from 'express'

import addItem from './routes/addItemDB.js'
import getItemDBRouter from './routes/getItemDB.js'
import getLastStravaActivityRouter from './routes/getLastStravaActivity.js'

function routes(app) {
  app.use("/getLastActivity", getLastStravaActivityRouter);
  app.use("/addItemDB", addItem);
  app.use("/getItemDB", getItemDBRouter);
};

export default routes;