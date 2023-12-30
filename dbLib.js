// Importer les modules nécessaires à l'accès à DynamoDB
import { CreateTableCommand, DeleteTableCommand, ListTablesCommand, BillingMode, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

///////////////////////////////////////////////
// Ajouter un élément à StravaDB
///////////////////////////////////////////////
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

///////////////////////////////////////////////
// renvoie l'activité Strava enregistrée au num ID (!! différent de l'ID Strava)
///////////////////////////////////////////////
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

///////////////////////////////////////////////
// Créer la base de données (ici : StravaDB) //
// Efface la base de données si elle existe déjà
///////////////////////////////////////////////
export async function createDB(tableName) {
  console.log('*** createDB in dbLib.js')
  // Spécifier la région
  const config = {region: 'eu-west-3'};
  // Créer un client DynamoDB
  const client = new DynamoDBClient(config);
  // Créer un client document DynamoDB
  const docClient = DynamoDBDocumentClient.from(client);
  
  // Teste si la base de données existe déjà 
  const command = new ListTablesCommand({});
  const listTables = await client.send(command);
  if (tableName in listTables) {
    // Suppression de la base de données
    const command = new DeleteTableCommand({ TableName: tableName });
    const response = await client.send(command);
    console.log('Database '+tableName+' has been deleted');
  }

  // Création de la base de données
  // Définir les paramètres de la requête
  const params = {
    TableName: dbName, // Le nom de la table DynamoDB
    BillingMode: BillingMode.PAY_PER_REQUEST,
    AttributeDefinitions: [
      { AttributeName: "ID", AttributeType: "N" },
      { AttributeName: "Activity", AttributeType: "S" },
    ],
    KeySchema: [
      { AttributeName: "ID", KeyType: "HASH" },
      { AttributeName: "Activity", KeyType: "RANGE" },
    ],
  };
  command = new CreateTableCommand(params);
  console.log('Database'+tableName+' will be create, it may take a few seconds...');
  const response = await docClient.send(command);
  return response;
}





/// for QueryCommand: 
// const params = {
//     TableName: "StravaDB", // Le nom de la table DynamoDB
//     KeyConditionExpression: "ID = :num",
//     ExpressionAttributeValues: {":num": 0}
// }  