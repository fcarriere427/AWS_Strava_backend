// Importer le module express
import express from "express";
// Créer un routeur express
const readDBRouter = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
readDBRouter.get("/", (req, res) => {
  console.log('récupération de la dernière activité Strava');
  readStrava()
  .then((response) => {
    res.send(response);
    }
  )
});

// Exécuter la requête et afficher la réponse
async function readStrava() {
  //return response;
  return("fake");
}

// Exporter le routeur
export default readDBRouter;