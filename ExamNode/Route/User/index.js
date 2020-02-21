var express=require('express');
var router=express.Router();
var Users=require('../../Schema/users');
var Team=require('../../Schema/team');
var Player=require('../../Schema/player');
var jwt=require('../../Helper/jwtHelper');
var chalk=require('chalk');
var bcrypt=require('bcryptjs');
router.use(express.json());

router.post('/register',async function(req,res){
    if(req.headers.authorization==undefined)
        return res.status(403).send("Please provide header value");
    
    var decodeData=await jwt.verify(req.headers.authorization,"SomeSecret");
    if(decodeData.data.role==="admin")
    {
        var hashPassword=await bcrypt.hash(req.body.password,8);
        var user=new Users(req.body);
        user.password=hashPassword;
        user.save().then(item=>{
            res.send(item);
        }).catch(err=>{
            if(err)
                res.status(400).send("data not saved to the database");
        })
    }
    else 
      res.send("Permission denied");
})
router.post('/login',async function(req,res){
   try{
      var user=await Users.findOne({"username":req.body.username})
      var isMatch=await bcrypt.compare(req.body.password,user.password)
      if(isMatch){
        var obj={"id":user._id,"role":user.role}
        res.setHeader("auth_token","ID : "+obj.id+" Role :"+obj.role);
        return res.send(jwt.sign(obj,"SomeSecret"));
      }
      return res.send("Invalid password")
   }catch(err){
        if(err)
            res.status(400).send("Invalid username");
   }
})
router.get('/team/:teamid/player/:playerid',async function(req,res){
    try{
        var team=await Team.findById({_id:req.params.teamid});
        var player=await Player.findById({_id:req.params.playerid})  
        if(player.team_id==team._id)
        {
            var obj={"Team ID:":team._id,"Team":team.name,"Player":player}
            return  res.json(obj);
        }
        return res.send("Not a player of a team");
    }catch(err){
        console.log(chalk.red('error occured'));
         return res.status(400).send("Error occured while retriving");
    }
})
router.delete('/team/:teamid/player/:playerid',async function(req,res){
    try{
        var team=await Team.findById({_id:req.params.teamid});
        var player=await Player.findById({_id:req.params.playerid})  
        if(player.team_id==team._id)
        {
           await Team.deleteOne({_id:req.params.teamid});
            await Player.deleteOne({_id:req.params.playerid});
            return res.send("Record Successfully deleted");
        }
        return res.send("Not a player of a team");
    }catch(err){
        console.log(chalk.red('error occured'));
         return res.status(400).send("Error occured while retriving");
    }
})
module.exports=router;
