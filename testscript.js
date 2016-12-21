var devrant = require('./src/index.js');
devrant
  .profile("Dacexi")
  .then((response)=>{
    console.log(response);
  })
