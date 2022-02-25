//*** Lecture des données dans la BDD

// Récupération des clés pour se connecter à couchDB
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

function readDB() {
  return new Promise((resolve, reject) => {
    stravaDb.get('_design/strava', { revs_info: true }, async function(err, body) {
      if (err) {
        console.log('creation de la view...')
        await createViewDB();
        console.log('...view créée, OK !')
      }
////////// UTILISER LA VIEW !!!
      console.log('on va appeler la view !')
      stravaDb.view('strava', '_design/strava', function(err,body) {
        if (!err) {
          resolve(body.rows);
        } else {
          console.log('error = ' + err);
        }
      });
    })
  });
}

function createViewDB() {
  stravaDb.insert(
  {"views":
    {"activities_by_date":
      {"map": function (doc) { emit (doc.start_date, doc); } }
    }
    // {"activities_by_distance":
    //   {"map": function (doc) { emit (doc.distance, doc); } }
    // }
  },
  '_design/strava',
  function (error, response) {
    if (!error){
      console.log('OK, design created!');
    } else {
      console.log('ERROR, design not created! Error = ' + error);
    }
  })
}


module.exports = readDB;
