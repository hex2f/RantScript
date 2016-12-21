var devrant = require('./src/index.js');
devrant
  .rants('algo', 1, 0)
  .then((response)=>{
    console.log(response);
  })
