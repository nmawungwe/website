const express = require('express');
const app = express();

app.use(function(req,res,next){
    res.setHeader('x-server-date', new Date());
    return next();
})

app.get('/', function(req, res, next){
    return res.send('Hello i am a webserver');
});

app.get('/time', function(req, res, next){
    return res.send( new Date().toString());
});

app.get('/throw',(req,res,next) =>{
    throw new Error('Something is wrong')
});

app.get('/next', (req,res,next)=>{
    setTimeout(()=>{
    next(new Error('Something is wrong'));
    }, 1000)
});

app.get('/hello', function(req, res, next){
    if (!req.query.name){
        return res.status(400).end()
    }
    return res.send(`Hello ${req.query.name}!`);
});


app.get('/user/:name', function(req, res, next){
    return res.send(`Userprofile is ${req.params.name}!`);
});

app.listen(3000);
console.log('App listening on port 3000');


