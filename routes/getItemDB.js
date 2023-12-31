// Importer le module express
import express from "express";
// Importer la librairie Strava perso
import { getItemDB } from "../dbLib.js";

// Créer un routeur express
const getItemDBRouter = express.Router();

// Nom de la table
const tableName = "StravaDB";

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default getItemDBRouter.get("/", (req, res) => {
  console.log('*** getItemDB.js : appel de getItemDB in dbLib.js');
  getItemDB(0, tableName)
  .then((response) => {
    //console.log('response.Item "JSON.Stringify" = ' + JSON.stringify(response.Item));
    console.log('response = ' + JSON.stringify(response));
    console.log('response.Item = ' + JSON.stringify(response.Item));
    res.send(response.Item);
  }
  )
});