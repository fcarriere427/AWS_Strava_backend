// Importer le module express
import express from "express";

// Importer les modules nécessaires à l'accès à DynamoDB
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Créer un routeur express
const readDBRouter = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
readDBRouter.get("/", (req, res) => {
  console.log('lecture de la DB');
  callDB()
  .then((response) => {
    res.send(response);
    }
  )

});

// Exécuter la requête et afficher la réponse
async function callDB() {
  // Spécifier la région
  const config = {region: 'eu-west-3'};
  // Créer un client DynamoDB
  const client = new DynamoDBClient(config);
  // Créer un client document DynamoDB
  const docClient = DynamoDBDocumentClient.from(client);
  // Définir les paramètres de la requête
  const params = {
    TableName: "StravaDB", // Le nom de la table DynamoDB
    KeyConditionExpression: "ID = :num",
    ExpressionAttributeValues: {":num": 0}
  };
  const command = new QueryCommand(params);
  const response = await docClient.send(command);
  console.log(response);
  return response;
}

// Exporter le routeur
export default readDBRouter;