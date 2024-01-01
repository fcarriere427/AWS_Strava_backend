// Importer le module express
import express from "express";

// Importer la librairie Strava perso
import {createTable} from "../dbLib.js";

// Nom de la table
const tableName = "StravaDB";

// Créer un routeur express
const reset_DB_Router = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default reset_DB_Router
  .get("/", async (req, res) => {
    console.log('*** reset_DB.js');
    console.log('Appel de createTable');
    var db = await createTable(tableName);
    console.log(`Table ${tableName} détruite puis recréée`);
    res.send(response);
  });