var devrant = require('./src/index.js');

devrant.httpSettings.SET_DEBUG(true);
devrant.httpSettings.SET_COMPRESS(false);
console.log('Debug: ', devrant.httpSettings.GET_DEBUG());
console.log('Compress: ', devrant.httpSettings.GET_COMPRESS());
var auth = {
    auth_token:{
      id:562403,
      key:"HIDDEN",
      expire_time:1496163161,
      user_id:161184
    },
}

console.log(auth["auth_token"])

devrant
  .weekly(42, 'top', 1, 0, auth["auth_token"])
  .then((resp)=>{
    console.log(resp);
  })
  .catch((e)=>{console.log(e)});
