// Importer le module express
import express from "express";

// Importer les librairies perso
import { getActivities } from "../stravaLib.js";

// Numéro d'athlète dans Strava // to do : le récupérer à partir des credentials 
const id_athlete = 10830547;

// Créer un routeur express
const getActivities_Strava_Router = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
// Paramètre "...?nb=nbMax" : nb d'activités à récupérer
// Si 0 : on récupère toutes les activités
export default getActivities_Strava_Router
  .get("/", async (req, res) => {
    console.log('*** getAllActivities_Strava.js');
    console.log('Appel de getActivities');
    var response = await getActivities(id_athlete,req.nb);
    response = JSON.stringify(response);
    console.log(`StravaDB mise à jour avec ${response} activité(s)`);
    res.send(response);
  });