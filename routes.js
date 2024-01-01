// routers to Strava API
import getStats_Strava_Router from './routes/getStats_Strava.js'
import getActivities_Strava_Router from './routes/getActivities_Strava.js'

// routers to AWS DB
import reset_DB_Router from './routes/reset_DB.js'
import addItem_DB_Router from './routes/addItem_DB.js'
import getItem_DB_Router from './routes/getItem_DB.js'

function routes(app) {
  // routes to Strava API
  app.use("/strava/getStats", getStats_Strava_Router);
  app.use("/strava/getActivities", getActivities_Strava_Router);
  // routes to AWS DB
  app.use("/db/reset", reset_DB_Router);
  app.use("/db/addItem", addItem_DB_Router);
  app.use("/db/getItem", getItem_DB_Router);
};

export default routes;