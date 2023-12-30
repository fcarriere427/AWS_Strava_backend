// Importer le module express
import express from "express";
// Importer la librairie Strava perso
import getItemDB from "../dbLib.js";

// Créer un routeur express
const getItemDBRouter = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
getItemDBRouter.get("/", (req, res) => {
  console.log('*** getItemDB.js : appel de getItemDB in dbLib.js');
  getItemDB()
  .then((response) => {
    console.log('response: ' + response);
    // console.log('response = ' + JSON.stringify(response));
    res.send(response);
    }
  )
});

// Exporter le routeur
export default getItemDBRouter;