var devrant = require('./src/index.js');

devrant.httpSettings.SET_DEBUG(true);
devrant.httpSettings.SET_COMPRESS(false);
console.log('Debug: ', devrant.httpSettings.GET_DEBUG());
console.log('Compress: ', devrant.httpSettings.GET_COMPRESS());

devrant
  .login('Username', 'Password')
  .then((response)=>{
    devrant.rant(
      516988,
      response["auth_token"]
    ).then((resp)=>{
      console.log(resp);
    })
    .catch((e) => {console.log(e)})
  });
