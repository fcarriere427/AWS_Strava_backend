// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

// Importer le module aws-sdk pour accéder au secret manager
const AWS = require('aws-sdk');

// Créer un client pour le secret manager, en spécifiant la région
const client = new AWS.SecretsManager({
    region: 'eu-west-3' // La région où se trouve votre secret
  });

// Le nom de votre secret dans le secret manager
const secretName = 'strava_keys';

// Appeler la méthode getSecretValue avec le nom du secret
client.getSecretValue({ SecretId: secretName }, function(err, data) {
    if (err) {
      // Gérer les erreurs
      console.error('Erreur lors de la récupération du secret', err);
    } else {
      // Récupérer les secrets depuis la chaîne SecretString
      // Vous pouvez aussi utiliser le binaire SecretBinary selon le format de votre secret
      const secrets = JSON.parse(data.SecretString);
  
      // Extraire les informations utiles
      const client_id = secrets.client_id;
      const client_secret = secrets.client_secret;
      const refresh_token = secrets.refresh_token;
    }

    console.log(`client_id = `+client_id);
    console.log(`client_secret = `+client_secret);
    console.log(`refresh_token = `+refresh_token);

});  