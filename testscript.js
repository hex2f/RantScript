var devrant = require('./src/index.js');

devrant.httpSettings.SET_DEBUG(true);
devrant.httpSettings.SET_COMPRESS(false);
console.log('Debug: ', devrant.httpSettings.GET_DEBUG());
console.log('Compress: ', devrant.httpSettings.GET_COMPRESS());
var auth = {
  id: 807137,
  key: '',
  expire_time: 1506611197,
  user_id: 161184
}

console.log(__dirname+'/images/RantScript.png')
devrant
  .postRant('Testing', 'rantscript', auth)
  .then((res)=>{
    devrant
      .postComment('Test Comment', res.rant_id, auth)
      .then((re)=>{
        console.log(re)
        // This dosn't work :/
        devrant
          .editComment('Edited', res.rant_id, auth)
          .then((r)=>{
            console.log(r)
          })
      })
  })
