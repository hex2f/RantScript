var devrant = require('./src/index.js');

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
