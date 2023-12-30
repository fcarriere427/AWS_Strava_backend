////////////////
// Serveur : gère les requêtes du front
// ***********************
// Prérequis NGINX : définir la route (reverse proxy) dans le fichier de conf nginx (dans /etc/nginx/sites-available/letsq.xyz)
// ***********************

//// Importer express et les routes
import express from 'express'
import routes from './routes.js'

// Definition
const app = express()
const port = 3001

// création et lancement du serveur
routes(app);
app.listen(port, () =>
    console.log(`*** server.js: app listening at http://localhost:${port}`)
);

//Log console à chaque appel
app.use(function timeLog(req, res, next) {
  let newDate = new Date(Date.now());
  console.log(`Appel backend : ${newDate.toDateString()} ${newDate.toTimeString()}`);
});

export default app;