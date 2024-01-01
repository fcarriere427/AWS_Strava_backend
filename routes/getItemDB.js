// Importer le module express
import express from "express";
// Importer la librairie Strava perso
import { getItemDB } from "../dbLib.js";

// Créer un routeur express
const getItemDBRouter = express.Router();

// Nom de la table
const tableName = "StravaDB";

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default getItemDBRouter
  .get("/", async (req, res) => {
    console.log('*** getItemDB.js : appel de getItemDB in dbLib.js');
    var response = await getItemDB(req.query.id, tableName)
    //console.log('response = ' + JSON.stringify(response)); // renvoie un JSON avec les metadata en tête
    //console.log('response.Item = ' + JSON.stringify(response.Item)); // renvoie le JSON de l'activité
    console.log('Réponse envoyée');
    res.send(response.Item);
  });