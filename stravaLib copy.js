// Library perso avec fonctions "lecture http" et "save to file"
// const utils = require('./utils');
import httpsRequest, { saveData } from "./utils.js";
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
    .then(accessToken => {
        var options = `https://www.strava.com/api/v3/athlete/activities?page=` + 1 + `&per_page=`+ 1 + `&access_token=${accessToken}`;
        var res = httpsRequest(options);
        //******
        console.log('res1 = ' + res);
        // console.log('res = ' + JSON.stringify(res));
        //******
    })
    .then(res => {
        console.log('res2 = ' + res);
        return(res);
    })
    .catch((err) => console.log(err))
    // on renvoie l'activité
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
    var local_keys = JSON.stringify({
        refreshToken: refreshToken,
        accessToken: accessToken,
        expiresAt: expiresAt
      });
    // on calcule la date actuelle, au bon format
    var currentTime = Math.trunc(Date.now()/1000);
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
      await httpsRequest(options,body)
      // Met à jours les clés Strava (dans le fichier ./keys/strava_keys.json)
      .then((res) => {
        // On renouvelles les tokens locaux
        accessToken = res.access_token;
        expiresAt = res.expires_at;
        refreshToken = res.refresh_token;
        // on les sauvegarde dans le fichier local en asynchrone (besoin d'attendre pour renvoyer la réponse)
        local_keys = JSON.stringify({
          refreshToken: refreshToken,
          accessToken: accessToken,
          expiresAt: expiresAt
        });
       })
       await saveData(local_keys, './tokens.json');
    } 
    else // ... mais si les tokens ne sont pas expirés, on ne fait rien
    { 
      console.log("Tokens valides, pas de renouvellement");
    }
    return(accessToken);
}