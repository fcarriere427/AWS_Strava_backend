// Library perso avec fonctions "lecture http" et "save to file"
// const utils = require('./utils');
import * as utils from "./utils.js";
// Fichiers locaux qui contiennent les ID et tokens Strava
import stravaKeys from "./strava.json" assert { type: "json" };
import tokens from "./tokens.json" assert { type: "json" };
// const strava = require('./strava.json');
// const tokens = require('./tokens.json');

// Récupération de la dernière activité 
// voir le détail ici : https://developers.strava.com/docs/reference/#api-models-SummaryActivity
export default async function getLastActivity() {
    // Lance la requête de récupération des activités
    console.log('Récupération de la dernière activité Strava');
    await getAccessToken()
    .then(data => {
        var options = `https://www.strava.com/api/v3/athlete/activities?page=` + 1 + `&per_page=`+ 1 + `&access_token=${accessToken}`;
        utils.httpsRequest(options);
    })
    .then(data => console.log(data))
    .catch((err) => console.log(err))
    // on renvoie l'activité
    return(data);
  }

////////////////////////////////////
// FONCTIONS INTERNES à ce module //
////////////////////////////////////

// Obtention d'un accessToken
async function getAccessToken() {
    // Récupération des clés et tokens Strava
    var expiresAt = tokens.expiresAt;
    var accessToken = tokens.accessToken;
    var refreshToken = tokens.refreshToken;
    var clientId = stravaKeys.clientId;
    var clientSecret = stravaKeys.clientSecret;
    // on calcule la date actuelle, au bon format
    currentTime = Math.trunc(Date.now()/1000);
    // Si besoin de renouveller les tokens...
    if (currentTime > expiresAt) {
        console.log("Renouvellement des tokens...");
        // Prépare des variables passées à la  requête
        var body = JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        })
        var options = {
            hostname: 'www.strava.com',
            port: 443,
            path: '/oauth/token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': body.length
            }
      }
      // Lance la requête de renouvellement de l'access_token
      await utils.httpsRequest(options,body)
      // Met à jours les clés Strava (dans le fichier ./keys/strava_keys.json)
      .then((res) => {
        // On renouvelles les tokens locaux
        accessToken = res.access_token;
        expiresAt = res.expires_at;
        refreshToken = res.refresh_token;
        // on les sauvegarde dans le fichier local en asynchrone (besoin d'attendre pour renvoyer la réponse)
        console.log("... OK, tokens renouvellés !");
        local_keys = JSON.stringify({
          refreshToken: refreshToken,
          accessToken: accessToken,
          expiresAt: expiresAt
        })
        utils.saveData(local_keys, './keys/tokens.json');
      })
      .catch(err => console.log('Error: ' + err))
    } else { // ... mais si les tokens ne sont pas expirés, on ne fait rien
      console.log("Tokens valides, pas de renouvellement");
    }
    return(accessToken);
}
