var devrant = require('./src/index.js');

devrant.httpSettings.SET_DEBUG(true);
devrant.httpSettings.SET_COMPRESS(false);
console.log('Debug: ', devrant.httpSettings.GET_DEBUG());
console.log('Compress: ', devrant.httpSettings.GET_COMPRESS());
var auth = {
  id: 730130,
  key: 'HIDDEN',
  expire_time: 1503340260,
  user_id: 161184
}

devrant
  .postRant("Test Body", "Some, Tags, Here", auth, __dirname+'/images/RantScript.png')
