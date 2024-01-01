// Importer le module express
import express from "express";

// Importer la librairie Strava perso
import addItem, {createDB} from "../dbLib.js";
import getLastActivity from "../stravaLib.js";

// Nom de la table
const tableName = "StravaDB";

// Créer un routeur express
const addItem_DB_Router = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default addItem_DB_Router
  .get("/", async (req, res) => {
    // console.log('*** addItemDB.js : appel de createDB in dbLib.js');
    // var db = await createDB(tableName);
    console.log('*** addItem_DB.js : appel de getLastactivity in stravaLib.js');
    var activity = await getLastActivity();
    console.log('*** addItem_DB.js : appel de addItem in dbLib.js');
    var response = await addItem(activity, tableName);
    console.log('Réponse envoyée');
    res.send(response);
  });