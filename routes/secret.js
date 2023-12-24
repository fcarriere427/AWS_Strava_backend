// Importer le module aws-sdk pour accéder au secret manager
const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager"); // CommonJS import

// API endpoint
module.exports = {
    path: "/secret",
    config: (router) => {
        router
            .get("/", (req, res) => {
              getStravaSecret()
              .then((secrets) => {
                res.setHeader('content-type', 'application/json');
                res.status(200).send(secrets);
              })
            })
            .post("/", (req, res) => res.send("No POST here!"));
        return router;
    },
};

 function getStravaSecret(){   
  return new Promise((resolve, reject) => {
    ////const client = new SecretsManagerClient();  
    // Nom de votre secret dans le secret manager
    const secretName = 'strava_keys';
    // Appeler la méthode getSecretValue avec le nom du secret
    //client.getSecretValue({ SecretId: secretName }, function(err, data) {
    getSecretValue({ SecretId: secretName }, function(err, data) {
        if (err) {
        // Gérer les erreurs
        console.error('Erreur lors de la récupération du secret', err);
      } else {
        // Récupérer les secrets depuis la chaîne SecretString
        const secrets = JSON.parse(data.SecretString);
        resolve(secrets)
      }
    });
  }) 
}


async function getSecretValue (secretName) {
  const client = new SecretsManager({
    region: 'eu-west-3' // La région où se trouve votre secret
  });
  const response = await client.send(
    new GetSecretValueCommand({
      SecretId: secretName,
    }),
  );
  console.log(response);
  if (response.SecretString) {
    return response.SecretString;
  }

  if (response.SecretBinary) {
    return response.SecretBinary;
  }
};





// Extraire les informations utiles --> à reprendre dans la fonction principale
// const client_id = secrets.client_id;
// const client_secret = secrets.client_secret;
// const refresh_token = secrets.refresh_token;
// console.log(`client_id = `+client_id);
// console.log(`client_secret = `+client_secret);
// console.log(`refresh_token = `+refresh_token);                
