var fs = require('fs');

var data = fs.readFileSync('./strava_keys.json'),
    myObj;

try {
  myObj = JSON.parse(data);
  console.dir(myObj);
}
catch (err) {
  console.log('There has been an error parsing your JSON.')
  console.log(err);
}
