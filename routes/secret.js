const get_secret = require('../get_secret');

module.exports = {
    path: "/api/strava/secret",
    config: (router) => {
        router
            .get("/", (req, res) => {
console.log('1er get');
              get_secret.getStravaSecret()
              .then((secrets) => {
                console.log("... récupération des secrets : OK");
                // Extraire les informations utiles --> à reprendre dans la fonction principale
                const client_id = secrets.client_id;
                const client_secret = secrets.client_secret;
                const refresh_token = secrets.refresh_token;
                console.log(`client_id = `+client_id);
                console.log(`client_secret = `+client_secret);
                console.log(`refresh_token = `+refresh_token);                
                // renvoi du json 
                res.setHeader('content-type', 'application/json');
                res.status(200).send(secrests);
              })
            })
            .post("/", (req, res) => res.send("No POST here!"));
        return router;
    },
};
