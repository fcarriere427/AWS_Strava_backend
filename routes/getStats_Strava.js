// Importer le module express
import express from "express";

// Importer les librairies perso
import { getStats } from "../stravaLib.js";

// Numéro d'athlète dans Strava // to do : le récupérer à partir des credentials 
const id_athlete = 10830547;

// Créer un routeur express
const getStats_Strava_Router = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default getStats_Strava_Router
  .get("/", async (req, res) => {
    console.log('*** getStats_Strava.js');
    console.log('Appel de getStats in stravaLib.js');
    var response = await getStats(id_athlete);
    console.log('Réponse envoyée');
    /// TMP
    const nb_activities = response.all_ride_totals.count + response.all_run_totals.count + response.all_swim_totals.count;
    console.log('Nb total d\'activités = ' + nb_activities);
    /// TMP
    res.send(response);
  });