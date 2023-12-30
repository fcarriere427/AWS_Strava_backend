// Importer les modules nécessaires à l'accès à DynamoDB
import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
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
  var numID = Math.floor(Math.random()*100);
  const params = {
    TableName: "StravaDB", // Le nom de la table DynamoDB
    Item: {
      ID: numID,
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

// Créer la base de données (ici : StravaDB)
export async function createDB(dbName) {
  console.log('*** createDB in dbLib.js')
  // Spécifier la région
  const config = {region: 'eu-west-3'};
  // Créer un client DynamoDB
  const client = new DynamoDBClient(config);
  // Créer un client document DynamoDB
  const docClient = DynamoDBDocumentClient.from(client);
  // Définir les paramètres de la requête
  const params = {
    TableName: dbName, // Le nom de la table DynamoDB
    AttributeDefinitions: [
      { AttributeName: "ID", AttributeType: "N" },
      { AttributeName: "Activity", AttributeType: "S" },
    ],
    KeySchema: [
      { AttributeName: "ID", KeyType: "HASH" },
      { AttributeName: "Activity", KeyType: "RANGE" },
    ],
  };
  const command = new CreateTableCommand(params);
  console.log('database creation, it may take a few seconds...');
  const response = await docClient.send(command);
  return response;
}





/// for QueryCommand: 
// const params = {
//     TableName: "StravaDB", // Le nom de la table DynamoDB
//     KeyConditionExpression: "ID = :num",
//     ExpressionAttributeValues: {":num": 0}
// }  