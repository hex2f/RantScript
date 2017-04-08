var devrant = require('./src/index.js');

devrant.httpSettings.SET_DEBUG(true);
devrant.httpSettings.SET_COMPRESS(false);
console.log('Debug: ', devrant.httpSettings.GET_DEBUG());
console.log('Compress: ', devrant.httpSettings.GET_COMPRESS());

devrant
  .login('Username', 'Password')
  .then((response)=>{
    devrant.vote(
      1,
      272008,
      response["auth_token"]["id"],
      response["auth_token"]["key"],
      response["auth_token"]["user_id"]
    ).then((resp)=>{
      console.log(resp);
    })
  });
