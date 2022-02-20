//*** Intégration des données dans la BDD

const couchKeys = require('./keys/couchDB.json');
var user = couchKeys.user;
var pwd = couchKeys.password;
var host = couchKeys.host;
var port = couchKeys.port;
var url = 'http://' + user + ':' + pwd + '@' + host + ':' + port;
// Ouverture de la BDD
const nano = require ('nano')(url);
//console.log('nano = ' + JSON.stringify(nano));
var stravaDb = nano.db.use('strava');

var existingID = [];

function storeData(data) {
  console.log("Début de storeData...");
  // Récupération des clés pour se connecter à couchDB
  // ********************
  insertDoc(data, stravaDb, function(){
    writeArray(stravaDb, function (){
      console.log('callback du writeArray')
    });
  });
}

///// REPRENDRE ICI : on récupère bien les docs en json, mais on ne sait pas extraire les valeurs qui nous  intéressent (par la clé "ID" de Strava)
///// ... donc on ne sait pas remplir le tableau des ID des activités strava
///// ... qui va servir à vérifier si une activité existe déjà avant de l'ajouter à la BDD

//// AUTRE problème à traiter, moins urgent : il faut isoler le process de création initiale de la BDD...
///// ... sinon on ne sait pas s'il faut commencer par remplir la BDD ou le tableau des ID :-/

function insertDoc(data, stravaDb, callback){
  // Création d'un enregistrement pour chaque activité
  console.log('Mise à jour de la BDD avec '+ data.length + ' éléments...');
  for (let i = 0; i < data.length; i++) {
    stravaDb.insert(data[i], function(error, http_body) {
      if(!error) {
        // Quand on est sur le dernier élément, alors seulement on appelle le callback !
        if(i==data.length-1){
          console.log('... OK, BDD mise à jour !');
          callback();
        };
      } else {
        console.log(error)
      }
    })
  }
}

function writeArray(stravaDb, callback) {
  console.log("Création du tableau avec les ID Strava...");
  // pour chaque ligne de la BDD, on va écrire un élément dans le tableau existingID
  stravaDb.list()
  .then((body) => {
    body.rows.forEach((item, i) => {
      // console.log('Nouvel item : ');
      // console.log(item);
      console.log('On fait un get avec ID = ' + body.rows[i].id);
      getDoc(stravaDb, body, i, function(){console.log('on a lu le doc ' + body.rows[i].id)});
    });
  /// pas bon, on va l'appeler avant que ce soit fini... il faudrait savoir si c'est le dernier
  ///    callback();
  })
}

function getDoc(stravaDb, body, i, callback){
  stravaDb.get(body.rows[i].id, "{}", function(doc){
    console.log('et on obtient l\'enregistrement = ' + doc);
    var stravaID = doc["id"];
    console.log('et on récupère l\'ID Strava = ' + stravaID);
    console.log("puis on renseigne dans le tableau la valeur [" + i + "] = " + doc["id"]);
    existingID[i] = doc["id"];
  })
  callback();
}

// stravaDb.list()
// .then((body) => {
//   console.log('on va lister les activités de la BDD...')
//   for (var i = 0; i < body.rows.length; i++) {
//     console.log("Ligne n°" + i + " / activité = " + body.rows[i]);
//     writeArray(i, stravaDb, body, body.rows[i].id)
//   }
// })
// .then(() => {
//   console.log("Et voici le tableau des ID Strava : ");
//   for (var i = 0; i < existingID.length; i++) {
//     console.log("i = " + i + " =>" + existingID[i]);
//   }
// })
// .catch(err => console.log(err))


module.exports = storeData;
