// Importer le module express
import express from "express";
// Importer la librairie Strava perso
import addItemDB from "../dbLib.js";
import getLastActivity from "../stravaLib.js";

// Créer un routeur express
const addItemDBRouter = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default async function addItem() {
  addItemDBRouter.get("/", async (req, res) => {
    console.log('*** addItemDB.js : appel de addItemDB in dbLib.js');
    console.log('*** addItemDB.js : appel de addItemDB in dbLib.js');
    var activity = await getLastActivity();
    var response = await addItemDB(activity);
    res.send(response);
  });
};