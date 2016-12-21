var devrant = require('./src/index.js');
devrant
  .rants('algo', 1, 0)
  .then((response)=>{
    console.log(response);
  })
/*
  .login('username', 'password')
  .then((response)=>{
    devrant.postRant(
      "This was posted from my devRant api wrapper. (pls work now ok?)",
      "API, JS",
      response["auth_token"]["id"],
      response["auth_token"]["key"],
      response["auth_token"]["user_id"]
    ).then((resp)=>{
      console.log(resp);
    })
  })
*/
