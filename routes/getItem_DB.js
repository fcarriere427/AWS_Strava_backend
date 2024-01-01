// Importer le module express
import express from "express";

// Importer la librairie Strava perso
import { getItem } from "../dbLib.js";

// Nom de la table
const tableName = "StravaDB";

// Créer un routeur express
const getItem_DB_Router = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default getItem_DB_Router
  .get("/", async (req, res) => {
    console.log('*** getItem_DB.js : appel de getItem in dbLib.js');
    var response = await getItem(req.query.id, tableName)
    //console.log('response = ' + JSON.stringify(response)); // renvoie un JSON avec les metadata en tête
    //console.log('response.Item = ' + JSON.stringify(response.Item)); // renvoie le JSON de l'activité
    console.log('Réponse envoyée');
    res.send(response.Item);
  });