// Importer les modules nécessaires à l'accès à DynamoDB
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Ajouter un élément à StravaDB
// **** WIP  ****
export default async function addDB() {
  // Créer un client DynamoDB
  const client = new DynamoDBClient(config);
  // Créer un client document DynamoDB
  const docClient = DynamoDBDocumentClient.from(client);
  // Définir les paramètres de la requête
  const params = {
    TableName: tableName,
    Item: {
      // The preceding KeySchema defines 'title' as our sort (RANGE) key, so 'title'
      // is required.
      ID: "0",
      // test
      texte_test: "Florian"
    },
  }
  const command = new PutCommand(params);
  const response = await docClient.send(putCommand);
  return response;
}


// log("Adding a single movie to the table.");
//   // PutCommand is the first example usage of 'lib-dynamodb'.
//   const putCommand = new PutCommand({
//     TableName: tableName,
//     Item: {
//       // In 'client-dynamodb', the AttributeValue would be required (`year: { N: 1981 }`)
//       // 'lib-dynamodb' simplifies the usage ( `year: 1981` )
//       year: 1981,
//       // The preceding KeySchema defines 'title' as our sort (RANGE) key, so 'title'
//       // is required.
//       title: "The Evil Dead",
//       // Every other attribute is optional.
//       info: {
//         genres: ["Horror"],
//       },
//     },
//   });
//   await docClient.send(putCommand);
//   log("The movie was added.");




///////////////////////////
// en dessous : OK, validé 
///////////////////////////

// Lire un élément de la StravaDB
// TMP : pour l'instant, ne fait que lire l'élément [0]
export async function callDB() {
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
  return response;
}