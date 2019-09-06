const nanoid = require('nanoid/generate');
const encryptingSource = 'ab3cde1fghijklmn2opqrstuvw4xy5zA6BCDE7FGHIJK8LMNOPQR9STUVWXYZ0';


module.exports = (length=5) =>{    
   return nanoid(encryptingSource, length)
}
