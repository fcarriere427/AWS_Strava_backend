// Renouvelle le token d'access Strava
const https = require('https');
const fs = require('fs');

function reAuthorize(){
  var token = "";
  console.log("2 - Début de reAuthorize (depuis reAuthorize)");
  // Récupère les clés nécessaire dans le fichier (dispo en local seulement)
  // et initialise les 3 variables id, secret et token
  var data = fs.readFileSync('./strava_keys.json'), myObj;
  try {
    myObj = JSON.parse(data);
    var id = myObj.id;
    var secret = myObj.secret;
    var refresh_token = myObj.token;
  } catch (err) {
    console.log('There has been an error reading the keys file :-(')
    console.error(err)
  }
// Prépare les éléments pour la requête de renouvellement sur l'API strava
  var body = JSON.stringify({
    client_id: id,
    client_secret: secret,
    refresh_token: refresh_token,
    grant_type: 'refresh_token'
  })
  var options = {
    hostname: 'www.strava.com',
    port: 443,
    path: '/oauth/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body.length
    }
  }
  // Lance la requête de renouvellement de l'access_token
  var req = https.request(options, (res) => {
    //*** A revoir : normalement, il faudrait attendre d'avoir tout reçu, donc res.on('end')... mais bon, ça marche :-/
    console.log("3 - Entrée dans la requête Strava (depuis reAuthorize) : " + token);
    res.on('data', (chunk) => {
      var data = JSON.parse(chunk);
      token = data.access_token;
      console.log("4 - reAuthorize va renvoyer (depuis reAuthorize) : " + token);
      return(token);
    });
  })
  req.on('error',(e) => {
    console.error(e)
  });
  req.write(body);
  req.end();
}

module.exports = reAuthorize;
