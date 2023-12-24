//Exemple proposé par chatGPT

// Importer les modules nécessaires
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Créer un client DynamoDB
const client = new DynamoDBClient({});

// Créer un client document DynamoDB
const docClient = DynamoDBDocumentClient.from(client);

// Définir les paramètres de la requête
const params = {
  TableName: "StravaDB", // Le nom de la table DynamoDB
//   KeyConditionExpression: "OriginCountry = :originCountry AND RoastDate > :roastDate", // La condition à respecter pour les clés primaires
//   ExpressionAttributeValues: {
//     ":originCountry": "Ethiopia", // La valeur de la clé de partition
//     ":roastDate": "2023-05-01", // La valeur de la clé de tri
//   },
//   ConsistentRead: true, // Indique si la lecture doit être cohérente ou non
};

// Exécuter la requête et afficher la réponse
export async function callDB() {
    const command = new QueryCommand(params);
    const response = await docClient.send(command);
    console.log(response);
    return response;
}
