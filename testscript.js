var devrant = require('./src/index.js');

devrant.httpSettings.SET_DEBUG(true);
devrant.httpSettings.SET_COMPRESS(false);
console.log('Debug: ', devrant.httpSettings.GET_DEBUG());
console.log('Compress: ', devrant.httpSettings.GET_COMPRESS());
var auth = {
  id: 741550,
  key: '',
  expire_time: 1503838554,
  user_id: 161184
}

console.log(__dirname+'/images/RantScript.png')
devrant
  .rants("Test 123", 538347, auth, __dirname+'/images/RantScript.png')
  .then((res)=>{console.log(res)})
