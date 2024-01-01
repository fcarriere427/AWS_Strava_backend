import express from 'express'

import addItemDBRouter from './routes/addItemDB.js'
import getItemDBRouter from './routes/getItemDB.js'
import getLastStravaActivityRouter from './routes/getLastStravaActivity.js'
import getStravaStatsRouter from './routes/getStravaStats.js'
import getAllStravaActivitiesRouter from './routes/getAllStravaActivities.js'

function routes(app) {
  app.use("/getLastActivity", getLastStravaActivityRouter);
  app.use("/addItemDB", addItemDBRouter);
  app.use("/getItemDB", getItemDBRouter);
  app.use("/getStravaStats", getStravaStatsRouter);
  app.use("/getAllStravaActivities", getAllStravaActivitiesRouter);
};

export default routes;