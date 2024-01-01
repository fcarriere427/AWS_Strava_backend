// Importer le module express
import express from "express";

// Importer les librairies perso
import { getStravaStats } from "../stravaLib.js";

// Créer un routeur express
const getStravaStatsRouter = express.Router();

// Nom de la table
const tableName = "StravaDB";

////////////////
// Numéro d'athlète dans Strava
// to do : le récupérer à partir des credentials 
///////////////
const id_athlete = 10830547;

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default getStravaStatsRouter
  .get("/", async (req, res) => {
    console.log('*** getAllStravaActivities.js');
    var response = await getStravaStats(id_athlete);
    console.log('Réponse envoyée');
    const nb_activities = response.all_ride_totals.count + response.all_run_totals.count + response.all_swim_totals.count;
    console.log('Nb total d\'activités = ' + nb_activities);
    res.send(response);
  });