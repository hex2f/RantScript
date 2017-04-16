var devrant = require('./src/index.js');

devrant.httpSettings.SET_DEBUG(true);
devrant.httpSettings.SET_COMPRESS(false);
console.log('Debug: ', devrant.httpSettings.GET_DEBUG());
console.log('Compress: ', devrant.httpSettings.GET_COMPRESS());
var auth = {
  auth_token: {
    id: 533581,
    key: 'HIDDEN',
    expire_time: 1494934734,
    user_id: 161184
  }
}

devrant
  .notifications(auth["auth_token"], 0)
  .then((resp)=>{
    console.log(resp);
  })
  .catch((e)=>{console.log(e)});
