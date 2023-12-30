// Importer le module express
import express from "express";
// Importer la librairie Strava perso
import addDB from "../dbLib.js";

// Créer un routeur express
const addDBRouter = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
addDBRouter.get("/", (req, res) => {
  console.log('*** addDB.js : appel de addDB in dbLib.js');
  addDB()
  .then((response) => {
    res.send(response);
    }
  )
});

// Exporter le routeur
export default addDBRouter;