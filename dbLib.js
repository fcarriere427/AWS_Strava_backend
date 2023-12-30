// Importer les modules nécessaires à l'accès à DynamoDB
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Ajouter un élément à StravaDB
// **** WIP  ****
export default async function addItemDB(item) {
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
      ID: 0,
      Activity: item
    },
  }
  const command = new PutCommand(params);
  const response = await docClient.send(command);
  return response;
}

// TMP : pour l'instant, ne fait que lire l'élément [0]
export async function getItemDB() {
  // // Spécifier la région
  // const config = {region: 'eu-west-3'};
  // // Créer un client DynamoDB
  // const client = new DynamoDBClient(config);
  // // Créer un client document DynamoDB
  // const docClient = DynamoDBDocumentClient.from(client);
  // // Définir les paramètres de la requête
  // const params = {
  //   TableName: "StravaDB", // Le nom de la table DynamoDB
  //   Key:{ID: 0},
  //   ConsistentRead: true,
  // };
  // const command = new GetCommand(params);
  // const response = await docClient.send(command);
  // return response;

  console.log('*** getItemDB in dbLib.js')
  const getCommand = new GetCommand({
    TableName: "StravaDB",
    Key: {
      ID: 0
    },
    ConsistentRead: true,
  });
  const getResponse = await docClient.send(getCommand);
  console.log(`Got the movie: ${JSON.stringify(getResponse.Item)}`);
  return 0;
}


/// for QueryCommand: 
// const params = {
//     TableName: "StravaDB", // Le nom de la table DynamoDB
//     KeyConditionExpression: "ID = :num",
//     ExpressionAttributeValues: {":num": 0}
// }  