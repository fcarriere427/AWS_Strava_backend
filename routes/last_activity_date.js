const dbFun = require('../dbFunctions');

module.exports = {
    path: "/strava/last_activity_date",
    config: (router) => {
        router
            .get("/", (req, res) => {
              let date = await dbFun.readLastActivityDate(); // au format "2022-04-02T07:43:20Z"
              let newDate = new Date(date);
              let date_str = newDate.toLocaleDateString('fr-FR') + ' at ' + newDate.toLocaleTimeString('fr-FR');
              console.log("... Envoi de la date de la dernière activité (= " + date_str + ")");
              res.setHeader('content-type', 'application/json');
              res.status(200).json({ last_activity_date: date_str});
              })
            .post("/", (req, res) => res.send("No POST here!"));
        return router;
    },
};
