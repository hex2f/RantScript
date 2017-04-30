![banner image](https://github.com/RekkyRek/RantScript/raw/master/images/RantScript.png)

### RantScript allows you to access the whole devRant API via JS.

##

### Install
```javascript
npm install rantscript
```
### Examples

#### Console logging the 10 top posts on devRant:

```javascript
var devRant = require('rantscript');

devRant
  .rants('top', 10, 0)
  .then((response)=>{
    console.log(response);
  })
```

#### Enableing debug mode and compression:

```javascript
var devRant = require('rantscript');
devRant.httpSettings.SET_DEBUG(true);
console.log(devrant.httpSettings.GET_DEBUG());
//Returns True

devRant.httpSettings.SET_COMPRESS(true);
console.log(devrant.httpSettings.GET_COMPRESS());
//Returns True
```
#### Logging in and posting a rant:

```javascript
var devRant = require('rantscript');

//Get authentication token from devRant API
devRant
  .login('username', 'password')
  .then((response)=>{
  	//Then post a rant to devRant with token gotten from previous request.

  	devRant.postRant(
      "Rant Text",
      "Tags, Separated, By, Commas",
      response["auth_token"]
    ).then((resp)=>{
      //Then console.log the rant data.
      console.log(resp);
    })
  })
```

##

### All Functions
| Function     | Usage                                             | Description               |
| ------------ | ------------------------------------------------- | ------------------------- |
| .rants       | .rants('sort', limit, skip, token)                | Load rants.               |
| .rant        | .rant(rant_id)                                    | Load a single rant by id. |
| .search      | .search('search term')                            | Search on devRant         |
| .profile     | .profile('Username')                              | Load a profile by name    |
| .login       | .login('Username','Password')                     | Get a devRant auth token  |
| .postRant    | .postRant('Rant', 'Tags', token)                  | Post a rant to devRant    |
| .postComment | .postComment('Comment', rant_id, token)           | Post a comment to a rant  |
| .vote        | .vote(<0 = down & 1 = up>, rant_id, token)        | Vote on a rant            |
| .voteComment | .voteComment(<0 = down & 1 = up>, rant_id, token) | Vote on a comment         |
| .httpSettings| See Bellow | Change settings for the http requests|

### All Settings
| Function     | Usage                                                 |
| ------------ | ----------------------------------------------------- |
| .GET_DEBUG()                  | Returns the current Debug state.     |   
| .SET_DEBUG(true or false)     | Enable or disable console.log        |
| .GET_COMPRESS()               | Returns the current Compress state.  |
| .SET_COMPRESS(true or false)  | Enable or disable compression.       |
