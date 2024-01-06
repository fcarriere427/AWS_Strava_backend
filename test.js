// Importer les modules nécessaires à l'accès à DynamoDB
import { BatchWriteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { fileURLToPath } from "url";

const config = {region: 'eu-west-3'};
const client = new DynamoDBClient(config);

const chaine = '{'+'"prenom": '+'"michel", "nom": '+'"drucker"}';

export const main = async () => {
  const command = new BatchWriteItemCommand({
    RequestItems: {
      // Each key in this object is the name of a table. This example refers
      // to a Coffees table.
      Test: [
        // Each entry in Coffees is an object that defines either a PutRequest or DeleteRequest.
        {
          // Each PutRequest object defines one item to be inserted into the table.
          PutRequest: {
            // The keys of Item are attribute names. Each attribute value is an object with a data type and value.
            // For more information about data types,
            // see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes
            Item: {
              ID: { N: "1" },
              Contenu: { S: "Toto 1" },
            },
          },
        },
        {
          PutRequest: {
            Item: {
              ID: { N: "2" },
              Contenu: { M: `${chaine}`},
              },
          },
        },
      ],
    },
  });

  console.log('command = ' + JSON.stringify(command));
  

  const response = await client.send(command, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Table Created", data);
    }
  });
  console.log(response);
  return response;
};

// Invoke main function if this file was run directly.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    main();
  }