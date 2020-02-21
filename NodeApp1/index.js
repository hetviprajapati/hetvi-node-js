var mongoose=require('mongoose');

var express=require('express');
var app=express()
var chalk=require('chalk');

var jwt=require('./Helper/jwtHelper.js');
var Users=require('./Schema/user');
var user=require('./Routes/Users');
app.use('/user',user);

mongoose.connect('mongodb://localhost:27017/demosystem1',{});
mongoose.connection.on('error',function(err){
    console.log(chalk.red("An error occured while making an connection"));
}).once('open',function(){
    console.log(chalk.green("Connction successfully established"));
})

app.get('/login/:email',async function(req,res){
    try{
         var userData=await Users.findOne({"email":req.params.email});
         var obj={"_id":userData._id,"role":userData.role,"name":userData.name}
         res.send(jwt.sign("SomeSecret",obj))
    }catch(err){
          console.log(chalk.red("Error occured"));
          return res.status(401).send("An error ocuured while retriving person record"+err);
    }
 })
//app.use(router)
app.listen(3001);

