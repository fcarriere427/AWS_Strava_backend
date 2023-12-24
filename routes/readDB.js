// API endpoint
// First try to access Dynamo DB "StravaDB"


// Importer le module custom d'appel à la DB 
import express from "express";

// Importer le module custom d'appel à la DB 
import { callDB } from "./callDB";

module.exports = {
    path: "/db",
    config: (router) => {
        router
            .get("/", (req, res) => {
              console.log('on va appeler la DB')
              callDB.callDB()
              .then((response) => {
                res.setHeader('content-type', 'application/json');
                res.status(200).send(response);
              })
            })
            .post("/", (req, res) => res.send("No POST here!"));
        return router;
    },
};

// // Exécuter la requête et afficher la réponse
// export const main = async () => {
//   const command = new QueryCommand(params);
//   const response = await docClient.send(command);
//   console.log(response);
//   return response;
// };
