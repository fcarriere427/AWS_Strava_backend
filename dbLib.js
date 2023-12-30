// Importer les modules nécessaires à l'accès à DynamoDB
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Ajouter un élément à StravaDB
// **** WIP  ****
export default async function addItemDB(activity) {
  console.log('*** addItemDB in dbLib.js')
  // Spécifier la région
  const config = {region: 'eu-west-3'};
  // Créer un client DynamoDB
  const client = new DynamoDBClient(config);
  // Créer un client document DynamoDB
  const docClient = DynamoDBDocumentClient.from(client);
  // Définir les paramètres de la requête
  const params = {
    TableName: "StravaDB", // Le nom de la table DynamoDB
    Item: {
      Activity: activity
    },
  }
  const command = new PutCommand(params);
  const response = await docClient.send(command);
  return response;
}

// renvoie l'activité Strava enregistrée au num ID (!! différent de l'ID Strava)
export async function getItemDB(numID) {
    console.log('*** getItemDB in dbLib.js')
  // Spécifier la région
  const config = {region: 'eu-west-3'};
  // Créer un client DynamoDB
  const client = new DynamoDBClient(config);
  // Créer un client document DynamoDB
  const docClient = DynamoDBDocumentClient.from(client);
  // Définir les paramètres de la requête
  const params = {
    TableName: "StravaDB", // Le nom de la table DynamoDB
    Key:{ID: numID},
    ConsistentRead: true,
  };
  const command = new GetCommand(params);
  const response = await docClient.send(command);
  return response;
}


/// for QueryCommand: 
// const params = {
//     TableName: "StravaDB", // Le nom de la table DynamoDB
//     KeyConditionExpression: "ID = :num",
//     ExpressionAttributeValues: {":num": 0}
// }  