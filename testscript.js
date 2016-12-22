var devrant = require('./src/index.js');
/*devrant
  .login('Dacexi', '0hg0d1l0v3m3m3s')
  .then((response)=>{
    devrant.postComment(
      "This was posted from my devRant api wrapper.",
      342726,
      response["auth_token"]["id"],
      response["auth_token"]["key"],
      response["auth_token"]["user_id"]
    ).then((resp)=>{
      console.log(resp);
    })
  })
*/
devrant
  .login('Dacexi', '0hg0d1l0v3m3m3s')
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
