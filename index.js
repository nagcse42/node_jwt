const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, resp) => {
    resp.json('Node JWT App on : 3000')
})

app.post('/api/posts', validateToken, (req, resp) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            resp.sendStatus(403);
        } else {
            resp.json({posts:['tech stack', "jobs"], authData});
        }
    })
})


app.get('/api/login', (req, resp) => {
   const user = {
       id: 1,
       name: "ram",
       email: "ram@hotmail.com"
   };

   jwt.sign({user}, 'secretkey', (err, token) => {
       resp.json({token});
   })
})

function validateToken(req, res, next) {
    console.log(req.headers);
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if(bearerHeader !== undefined){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(3000, () =>{
    console.log('Node JWT App on : 3000')
})