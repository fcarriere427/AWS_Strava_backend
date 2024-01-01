// routers to AWS DB
import addItem_DB_Router from './routes/addItem_DB.js'
import getItem_DB_Router from './routes/getItem_DB.js'
// routers to Strava API
import getLastActivity_Strava_Router from './routes/getLastActivity_Strava.js'
import getStats_Strava_Router from './routes/getStats_Strava.js'
import getAllActivities_Strava_Router from './routes/getAllActivities_Strava.js'

function routes(app) {
  // routes to Strava API
  app.use("/strava/getLastActivity", getLastActivity_Strava_Router);
  app.use("/strava/getStats", getStats_Strava_Router);
  app.use("/strava/getAllActivities", getAllActivities_Strava_Router);
  // routes to AWS DB
  app.use("/db/addItem", addItem_DB_Router);
  app.use("/db/getItem", getItem_DB_Router);
};

export default routes;