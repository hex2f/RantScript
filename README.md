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
var devRant = require('RantScript');

devRant
  .rants('top', 10, 0)
  .then((response)=>{
    console.log(response);
  })
```

#### Logging in and posting a rant:

```javascript
var devRant = require('RantScript');

//Get authentication token from devRant API
devRant
  .login('username', 'password')
  .then((response)=>{
  	//Then post a rant to devRant with token gotten from previus request.

  	devRant.postRant(
      "Rant Text",
      "Tags, Separated, By, Commas",
      response["auth_token"]["id"],
      response["auth_token"]["key"],
      response["auth_token"]["user_id"]
    ).then((resp)=>{
      //Then console.log the rant data.
      console.log(resp);
    })
  })
```

##

### All Functions
| Function     | Usage                                                                    | Description               |
| ------------ | ------------------------------------------------------------------------ | ------------------------- |
| .rants       | .rants('sort', limit, skip)                                              | Load rants.               |
| .rant        | .rant(rant_id)                                                           | Load a single rant by id. |
| .search      | .search('search term')                                                   | Search on devRant         |
| .profile     | .profile('Username')                                                     | Load a profile by name    |
| .login       | .login('Username','Password')                                            | Get a devRant auth token  |
| .postRant    | .postRant('Rant', 'Tags', token_id, token_key, user_id)                  | Post a rant to devRant    |
| .postComment | .postComment('Comment', rant_id, token_id, token_key, user_id)           | Post a comment to a rant  |
| .vote        | .vote(<0 = down | 1 = up>, rant_id, token_id, token_key, user_id)        | Vote on a rant            |
| .voteComment | .voteComment(<0 = down | 1 = up>, rant_id, token_id, token_key, user_id) | Vote on a comment         |
