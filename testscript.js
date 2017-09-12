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
  .weeklyRants('recent', 1, 0)
  .then((res)=>{
    console.log(res)
  })
