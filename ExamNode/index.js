var express=require('express');
var app=express();
var chalk=require('chalk');
var mongoose=require('mongoose');
var user=require('./Route/User');
var team=require('./Route/Team');
var player=require('./Route/Player/player');

app.use('/user',user);
app.use('/team',team);
app.use('/player',player);

mongoose.connect('mongodb://localhost:27017/demosystem1',{});

mongoose.connection.on('error',function(err){
    console.log(chalk.red("An error occured while making connection"),err);
    process.exit(1);
}).once('open',function(){
    console.log(chalk.green("connection successfull"));
})

app.listen(3001,function(err){
    if(err){
        console.log(chalk.red("An error occured while connect to server"));
    }
});
