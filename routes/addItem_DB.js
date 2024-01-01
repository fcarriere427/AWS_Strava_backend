// Importer le module express
import express from "express";

// Importer la librairie Strava perso
import addItem, {createTable} from "../dbLib.js";
import getLastActivity from "../stravaLib.js";

// Nom de la table
const tableName = "StravaDB";

// Créer un routeur express
const addItem_DB_Router = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default addItem_DB_Router
  .get("/", async (req, res) => {
    console.log('*** addItem_DB.js');
    // console.log('Appel de createTable');
    // var db = await createTable(tableName);
    console.log('Appel de getLastactivity');
    var activity = await getLastActivity();
    console.log('Appel de addItem');
    var response = await addItem(activity, tableName);
    console.log('Réponse envoyée');
    res.send(response);
  });