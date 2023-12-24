////////////////
// Serveur : gère les requêtes du front
// ***********************
// Prérequis NGINX : définir la route (reverse proxy) dans le fichier de conf nginx (dans /etc/nginx/sites-available/letsq.xyz)
// ***********************

//// Importer express
import express from 'express'

// Definition
const app = express()
const port = 3001

// création et lancement du serveur
import routes from "./routes/readDB";
routes(app);
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);

//OLD : require("./routes")(app);

//Log console à chaque appel
app.use(function timeLog(req, res, next) {
  let newDate = new Date(Date.now());
  console.log(`Appel backend : ${newDate.toDateString()} ${newDate.toTimeString()}`);
});

module.exports = app;
