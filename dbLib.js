// Importer les modules nécessaires à l'accès à DynamoDB
import { BatchWriteItemCommand, CreateTableCommand, DeleteTableCommand, waitUntilTableExists, waitUntilTableNotExists, ListTablesCommand, BillingMode, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand, DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

///////////////////////////////////////////////
// Ajouter un lot d'éléments à la table
// input batch : tableau contenant les activités (id, activity)
///////////////////////////////////////////////
export async function addBatchItem(input_batch, tableName) {
  console.log('*** addBatchItem in dbLib.js');
  // Spécifier la région
  const config = {region: 'eu-west-3'};
  // Créer un client DynamoDB
  const client = new DynamoDBClient(config);
  // Créer un client document DynamoDB
  const docClient = DynamoDBDocumentClient.from(client);
  // Définir les paramètres de la requête
  var batch = [];
  //console.log(`input_batch = ${JSON.stringify(input_batch)}`);
  const nbActivities = input_batch.length;
  console.log(`nbActivities = ${nbActivities}`);
  console.log("type of input_batch = " + typeof(input_batch));

  for (const chunk of input_batch) {
    const putRequests = chunk.map((activity) => ({
      PutRequest: {
        Item: activity,
      },
    }));
  }

  // for(let i = 0; i < nbActivities; i++){
  //   const activity = input_batch[i];
  //   //const numID = Number(activity.id);
  //   const numID = 1;
  //   //console.log(`activity numID[${numID}] = ` + JSON.stringify(activity));
  //   const element = {
  //     "PutRequest": {
  //       "Item": {
  //         "ID": {"N": `${numID}`},
  //         //"Activity": {"M": activity}
  //         //"Contenu": {"M": `${JSON.parse(activity)}`}
  //         "Contenu": {"M": `${activity}`}
  //       }
  //     }
  //   }
  //   batch.push(element);
  //   //console.log(`element{${numID}} =` + JSON.stringify(element));
  // }
  
  const command = new BatchWriteCommand({
    RequestItems: {
      ["Test"]: putRequests,
    },
  });
  
  // const input = {
  //   "RequestItems": {
  //     "Test": batch
  //   }
  // }
  
  //const command = new BatchWriteItemCommand(input);

  console.log('command = ' + JSON.stringify(command));
  
  const response = await docClient.send(command,function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
  return response;
}

///////////////////////////////////////////////
// renvoie l'élément avec la clé ID
///////////////////////////////////////////////
export async function getItem(numID, tableName) {
  console.log('*** getItem in dbLib.js');
  numID = Number(numID);
  // Spécifier la région
  const config = {region: 'eu-west-3'};
  // Créer un client DynamoDB
  const client = new DynamoDBClient(config);
  // Créer un client document DynamoDB
  const docClient = DynamoDBDocumentClient.from(client);
  // Définir les paramètres de la requête
  const params = {
    TableName: tableName, // Le nom de la table DynamoDB
    Key:{ID: numID},
    ConsistentRead: true,
  };
  const command = new GetCommand(params);
  const response = await docClient.send(command);
  return response;
}

///////////////////////////////////////////////
///////////////////////////////////////////////
// Fonctions moins utiles
///////////////////////////////////////////////
///////////////////////////////////////////////

///////////////////////////////////////////////
// Ajouter un élément à la table
///////////////////////////////////////////////
export default async function addItem(activity, tableName) {
  //console.log('*** addItem in dbLib.js');
  // Spécifier la région
  const config = {region: 'eu-west-3'};
  // Créer un client DynamoDB
  const client = new DynamoDBClient(config);
  // Créer un client document DynamoDB
  const docClient = DynamoDBDocumentClient.from(client);
  // Définir les paramètres de la requête
  //var numID = Math.floor(Math.random()*100);
  var numID = Number(activity.id);
  //console.log('ID for this new Activity = ' + numID);
  const params = {
    TableName: tableName,
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
// Créer la table
// NB : l'efface si une table du même nom existe déjà
///////////////////////////////////////////////
export async function createTable(tableName) {
  console.log('*** createTable in dbLib.js')
  // Spécifier la région
  const config = {region: 'eu-west-3'};
  // Créer un client DynamoDB
  const client = new DynamoDBClient(config);
  // Créer un client document DynamoDB
  const docClient = DynamoDBDocumentClient.from(client);
  
  // Teste si la base de données existe déjà et la supprime si c'est le cas
  await deleteTable(tableName);
  
  // Création de la base de données
  // Définir les paramètres de la requête
  const params = {
    TableName: tableName, // Le nom de la table DynamoDB
    BillingMode: BillingMode.PAY_PER_REQUEST,
    AttributeDefinitions: [
      { AttributeName: "ID", AttributeType: "N" },
    ],
    KeySchema: [
      { AttributeName: "ID", KeyType: "HASH" },
    ],
  };
  const createCommand = new CreateTableCommand(params);
  const response = await docClient.send(createCommand);
  console.log('Table '+tableName+' is being created...');
  // Wait for table to be created
  const waiterConfig = {
    client : docClient,
    maxWaitTime : 60,
  };
  const results = await waitUntilTableExists(waiterConfig, {TableName: tableName}); 
  if (results.state != 'SUCCESS') {
    throw `Table Creation Delayed - ${results.reason}`;
  }
  console.log('Table '+tableName+' has been created');
  return response;
}

//////////////////////////////////////////////
// Supprime la table
///////////////////////////////////////////////
 async function deleteTable(tableName) {
  console.log('*** deleteTable in dbLib.js')
  // Spécifier la région
  const config = {region: 'eu-west-3'};
  // Créer un client DynamoDB
  const client = new DynamoDBClient(config);
  // Créer un client document DynamoDB
  const docClient = DynamoDBDocumentClient.from(client);
  
  // Teste si la base de données existe déjà 
  // et la supprime si c'est le cas
  const listCommand = new ListTablesCommand({});
  const listTables = await client.send(listCommand);
  if (listTables.TableNames.includes(tableName)) {
    console.log('Table '+tableName+' does exist: it will then be deleted');
    const deleteCommand = new DeleteTableCommand({ TableName: tableName });
    const response = await client.send(deleteCommand);
    console.log('Table '+tableName+' is being deleted...');
    // Wait for table to be deleted
    const waiterConfig = {
      client : docClient,
      maxWaitTime : 120,
    };
    const results = await waitUntilTableNotExists(waiterConfig, {TableName: tableName}); 
    if (results.state != 'SUCCESS') {
      throw `Table Deletion Delayed - ${results.reason}`;
    }
    console.log('Table '+tableName+' has been deleted');
    return response;
  } else {
    console.log('Table '+tableName+' doesn\'t exist');
    return "OK";
  }
}

/// for QueryCommand: 
// const params = {
//     TableName: "StravaDB", // Le nom de la table DynamoDB
//     KeyConditionExpression: "ID = :num",
//     ExpressionAttributeValues: {":num": 0}
// }  