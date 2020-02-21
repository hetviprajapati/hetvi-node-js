var jwt=require('./Helper/jwtHelper.js');
var express=require('express');
var chalk=require('chalk')
var app=express();

console.log(jwt.sign("some secret"));

app.use(async (req,res,next)=>{
    if(req.headers.authorization){
        var decodeData=await jwt.verify(req.headers.authorization,'some secret'); //give your secret as define as above
        if(decodeData)
            return res.json(decodeData);
        console.log(chalk.blue("decoded data",decodeData));

        return res.send('please pass the required token');
    }
})
app.listen(3001);