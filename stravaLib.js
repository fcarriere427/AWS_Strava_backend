// Library perso avec fonctions "lecture http" et "save to file"
import httpsRequest, { saveData } from "./utils.js";

// Fichiers locaux qui contiennent les ID et tokens Strava
import stravaKeys from "./strava.json" assert { type: "json" };
import tokens from "./tokens.json" assert { type: "json" };
// const strava = require('./strava.json');
// const tokens = require('./tokens.json');

/////////////////////////
// FONCTIONS EXPOSEES  //
/////////////////////////

// Récupération de la dernière activité Strava
// voir le détail ici : https://developers.strava.com/docs/reference/#api-models-SummaryActivity
export default async function getLastActivity() {
    console.log('*** getLastActivity in stravaLib.js');
    var accessToken = await getAccessToken()
    var options = `https://www.strava.com/api/v3/athlete/activities?page=` + 1 + `&per_page=`+ 1 + `&access_token=${accessToken}`;
    console.log('Appel de l\'API Strava');
    var res = await httpsRequest(options);
    // console.log('res = ' + JSON.stringify(res));
    return(res[0]);
}

// Récupération de toutes les activités Strava
// voir le détail ici : https://developers.strava.com/docs/reference/#api-Activities-getLoggedInAthleteActivities
export async function getAllActivities(id_athlete) {
  console.log('*** getAllActivities in stravaLib.js');
  // Initialisation des variables
  var nbActivities = 0;
  const nbActivitiesPerPage = 100;
  // Calcul du nb de pages Strava qu'il faut requêter
  const stats = await getStats(id_athlete);
  const nb_activities = stats.all_ride_totals.count + stats.all_run_totals.count + stats.all_swim_totals.count;
  const nbPages = Math.floor(nb_activities/100) + 1; // il ne faut pas dépasser 1 page de plus, sinon Strava plante
  console.log("nbPages = " + nbPages);
  // Récupération du token d'accès 
  var accessToken = await getAccessToken();
  
  // Boucle sur les pages
  // for(let i = 0; i < nbPages; i++){
  //   var page = i+1;
  //   console.log('Récupération des activités Strava, pour la page ' + page + ' sur ' + nbPages + '...');
  //   var options = `https://www.strava.com/api/v3/athlete/activities?page=` + page + `&per_page=`+ nbActivitiesPerPage = 100;
  //   + `&access_token=${accessToken}`;
  //   console.log('Appel de l\'API Strava');
  //   var res = await httpsRequest(options);
  /////////////////////////
  // TO DO 
  /////////////////////////
  //   console.log('Appel de updateDB');
  //   var count = dbFun.updateDB(res, page);
  //   nbActivities = nbActivities + count;
  // }

  return(nbActivities);
}


// Récupération des stats Strava
// voir le détail ici : https://developers.strava.com/docs/reference/#api-Athletes-getStats
export async function getStats(id_athlete) {
  console.log('*** getStats in stravaLib.js');
  console.log('Appel de getAccessToken');
  var accessToken = await getAccessToken()
  var options = `https://www.strava.com/api/v3/athletes/${id_athlete}/stats?access_token=${accessToken}`;
  console.log('Appel de l\'API Strava');
  var res = await httpsRequest(options);
  return(res);
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
    console.log("*** getAccessToken in stravaLib.js");
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
      console.log('Appel de l\'API Strava');
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
       console.log('Tokens récupérés de Strava');
       console.log('Appel de saveData');
       await saveData(local_keys, './tokens.json');
    } 
    else // ... mais si les tokens ne sont pas expirés, on ne fait rien
    { 
      console.log("Tokens déjà valides, pas de renouvellement");
    }
    return(accessToken);
}
