// Importer les modules nécessaires à l'accès à DynamoDB
import { BatchWriteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";


const client = new DynamoDBClient({});

export const main = async () => {
  const command = new BatchWriteItemCommand({
    RequestItems: {
      // Each key in this object is the name of a table. This example refers
      // to a Coffees table.
      Coffees: [
        // Each entry in Coffees is an object that defines either a PutRequest or DeleteRequest.
        {
          // Each PutRequest object defines one item to be inserted into the table.
          PutRequest: {
            // The keys of Item are attribute names. Each attribute value is an object with a data type and value.
            // For more information about data types,
            // see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes
            Item: {
              ID: { N: 1 },
              Contenu: { S: "Toto 1" },
            },
          },
        },
        {
          PutRequest: {
            Item: {
              ID: { N: 2 },
              Contenu: { S: "Toto 2" },
              },
          },
        },
      ],
    },
  });

  const response = await client.send(command);
  console.log(response);
  return response;
};