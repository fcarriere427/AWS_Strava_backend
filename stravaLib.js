// Imports des librairies perso
import httpsRequest, { saveData } from "./utils.js";
import { addBatchItem } from "./dbLib.js";

// Fichiers locaux qui contiennent les ID et tokens Strava
import stravaKeys from "./strava.json" assert { type: "json" };
import tokens from "./tokens.json" assert { type: "json" };
// const strava = require('./strava.json');
// const tokens = require('./tokens.json');

// Nom de la table dans AWS DynamoDB
const tableName = "StravaDB";

/////////////////////////
// FONCTIONS EXPORTEES //
/////////////////////////

/////////////////////////
// Récupération et intégration à la DB des activités Strava
// Param "nbMax" : si 0, alors on récupère  toutes les activités Strava
// voir le détail ici : https://developers.strava.com/docs/reference/#api-Activities-getLoggedInAthleteActivities
export default async function getActivities(id_athlete, nbMax) {
  console.log('*** getActivities in stravaLib.js');
  // Initialisation des variables
  var nbStravaActivities = 0;
  var nbPages = 0;
  var nbActivitiesPerPage = 100;
  /////// TMP //////////
  nbActivitiesPerPage = 3;
  /////// TMP //////////
  var nbActivities = 0;
  // Adaptation des variables selon l'usage
  if (nbMax == 0) {// pour avoir toutes les activités
    // Calcul du nb de pages Strava qu'il faut requêter
    const stats = await getStats(id_athlete);
    nbStravaActivities = stats.all_ride_totals.count + stats.all_run_totals.count + stats.all_swim_totals.count;
    nbPages = Math.floor(nbStravaActivities/100) + 1; // il ne faut pas dépasser 1 page de plus, sinon Strava plante
  } else { // sinon on se limite au nb fixé
    nbStravaActivities = nbMax;
    nbActivitiesPerPage = nbMax;
    nbPages = Math.floor(nbMax/100) + 1;    
  }
  // Initialisation des variables communes
  //console.log("nbPages = " + nbPages);
  /////// TMP //////////
  nbPages = 1;
  /////// TMP //////////
  // Récupération du token d'accès 
  var accessToken = await getAccessToken();
  console.log('Récupération des activités Strava...');
  // Boucle sur les pages
  for(let i = 0; i < nbPages; i++){
    var page = i+1;
    console.log('Page ' + page + ' sur ' + nbPages);
    var options = `https://www.strava.com/api/v3/athlete/activities?page=` + page + `&per_page=`+ nbActivitiesPerPage + `&access_token=${accessToken}`;
    var activities = await httpsRequest(options);
    // ajout des activités de la page dans la DB
    console.log(`activities = ${JSON.stringify(activities)}`);
    var res = await addBatchItem(activities, tableName);
    var count = activities.length;
    nbActivities = nbActivities + count;
  }
  console.log("Nombre d'activities ajoutées = " + nbActivities);
  return(nbActivities);
}

/////////////////////////
// Récupération des stats Strava, nptamment utilisée pour avoir le nb total d'activités
// voir le détail ici : https://developers.strava.com/docs/reference/#api-Athletes-getStats
export async function getStats(id_athlete) {
  console.log('*** getStats in stravaLib.js');
  console.log('Appel de getAccessToken');
  var accessToken = await getAccessToken()
  var options = `https://www.strava.com/api/v3/athletes/${id_athlete}/stats?access_token=${accessToken}`;
  var res = await httpsRequest(options);
  return(res);
}

////////////////////////////////////
// FONCTIONS INTERNES à ce module //
////////////////////////////////////

// /////////////////////////
// // Ajout de toutes les activités d'une "liste" (Strava Summary) à la DB
// async function addPage(activities) {
//   // Nb d'activités dans la liste passée en paramètre
//   const nbActivities = activities.length;
//   // Boucle sur les activités
//   for(let i = 0; i < nbActivities; i++){
//     //console.log(`activities[${i}] = ` + activities[i]);
//     const activity = activities[i];
//     addItem(activity, tableName);
//   }
//   return(nbActivities);
// }

/////////////////////////
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
    if (currentTime < expiresAt) // si les tokens ne sont pas expirés, on ne fait rien
    { 
      console.log("Tokens déjà valides, pas de renouvellement");
    }
    else
    {
      console.log("Renouvellement des tokens");
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
       console.log('Tokens récupérés de Strava');
       await saveData(local_keys, './tokens.json');
    } 
    return(accessToken);
}
