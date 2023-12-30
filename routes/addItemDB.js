// Importer le module express
import express from "express";
// Importer la librairie Strava perso
import addItemDB, {createDB} from "../dbLib.js";
import getLastActivity from "../stravaLib.js";

// Créer un routeur express
const addItemDBRouter = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default addItemDBRouter.get("/", async (req, res) => {
  console.log('*** addItemDB.js : appel de createDB in dbLib.js');
  var db = await createDB("StravaDB");
  console.log('*** addItemDB.js : appel de getLastactivity in stravaLib.js');
  var activity = await getLastActivity();
  console.log('*** addItemDB.js : appel de addItemDB in dbLib.js');
  var response = await addItemDB(activity);
  res.send(response);
});