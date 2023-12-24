// Importer le module express
import express from "express";

// Créer un routeur express
const router = express.Router();

// Définir la route qui renvoie "au revoir"
router.get("/aurevoir", (req, res) => {
  res.send("au revoir");
});

// Exporter le routeur
export default router;