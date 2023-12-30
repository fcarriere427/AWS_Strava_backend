// Importer le module express
import express from "express";
// Importer la librairie Strava perso
import addItemDB from "../dbLib.js";

// Créer un routeur express
const addItemDBRouter = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default addItemDBRouter.get("/", (req, res) => {
  console.log('*** addItemDB.js : appel de addItemDB in dbLib.js');
  addItemDB()
  .then((response) => {
    res.send(response);
    }
  )
});