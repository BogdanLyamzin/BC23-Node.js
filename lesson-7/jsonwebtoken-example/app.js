const jwt = require("jsonwebtoken")
require("dotenv").config()

const {SECRET_KEY} = process.env;

const payload = {
    id: "637273955fe8f77dbeb2c907"
}

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
// console.log(token);

const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const {id} = jwt.verify(token, SECRET_KEY);
    console.log(id);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzI3Mzk1NWZlOGY3N2RiZWIyYzkwNyIsImlhdCI6MTY2ODQ0NjAzMywiZXhwIjoxNjY4NTI4ODMzfQ.LpY7FkrDWDw6XBGArTncezClXYcD4cs677Fxr_2PH27";
    const result2 = jwt.verify(invalidToken, SECRET_KEY)
}
catch(error) {
    console.log(error.message)
}