// Importer le module express
import express from "express";
// Importer la librairie Strava perso
import getItemDB from "../dbLib.js";

// Créer un routeur express
const getItemDBRouter = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default getItemDBRouter.get("/", (req, res) => {
  console.log('*** getItemDB.js : appel de getItemDB in dbLib.js');
  getItemDB()
  .then((response) => {
    console.log('response "brute": ' + response);
    console.log('response "JSON.Stringify" = ' + JSON.stringify(response));
    console.log('response.Activity "brute": ' + response.Activity);
    console.log('response.Activity "JSON.Stringify" = ' + JSON.stringify(response.Activity));
    // res.send(response.Activity);
    res.send(response);
  }
  )
});