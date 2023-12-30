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
    console.log('response.Item "brute": ' + response.Item);
    console.log('response.Item "JSON.Stringify" = ' + JSON.stringify(response.Item));
    // res.send(response.Activity);
    res.send(response);
  }
  )
});