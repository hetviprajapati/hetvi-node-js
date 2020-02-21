var express=require('express');
var router=express.Router();
var chalk=require('chalk');
var Team=require('../../Schema/team');
var player=require('../../Schema/player.js');
var jwt=require('../../Helper/jwtHelper');
var decodeData;
router.use(express.json());

router.use(async function(req,res,next){
   if(req.headers.authorization==undefined)
      return res.status(403).send("Please provide header value");
    
      decodeData=await jwt.verify(req.headers.authorization,"SomeSecret");
    if(req.method=='GET')
        return next()
    if(decodeData.data.role==="admin" || decodeData.data.role==="team")
       return next()

     return  res.status(403).send("Permission denied");
})
router.post('/create',function(req,res){
      var body={"name":req.body.name,"logo":req.body.logo,"tag_line":req.body.tag_line,"created_by":decodeData.data.id}
        var team=new Team(body);
        team.save().then(item=>{
            res.send(item);
        }).catch(err=>{
            if(err)
                res.status(400).send("data not saved to the database");
        })
})
router.get('/list',async function(req,res){
     try{
        var team=await Team.find({});
        res.json(team);
     }catch(err){
        console.log(chalk.red("Error Occured"));
        res.status(400).send("Error while retriving record")
     }
})
router.get('/:id',async function(req,res){
    try{
        var team=await Team.findById({_id:req.params.id});
        res.json(team);
     }catch(err){
        console.log(chalk.red("Error Occured"));
        res.status(400).send("Error while retriving record")
     }
})
router.put('/:id',async function(req,res){
    try{
        var team=await Team.findOne({_id:req.params.id});
        if(team.created_by==decodeData.data.id || decodeData.data.role=="admin")
        {
            await Team.findByIdAndUpdate({_id:req.params.id},req.body)
            res.send("Record update successfully");
        }
        else 
            res.status(403).send("Permission denied");
    }catch(err){
        console.log(chalk.red("Error Occured"));
        res.status(400).send("Error while retriving record")
    }
})
router.delete('/:id',async function(req,res){
    try{
        var team=await Team.findOne({_id:req.params.id});
        if(team.created_by==decodeData.data.id  || decodeData.data.role=="admin")
        {
            await Team.findByIdAndDelete({_id:req.params.id})
            console.log(team._id);
            await player.deleteMany({team_id:team._id});
            res.send("Record delete successfully");
        }
        else 
            res.status(403).send("Permission denied");
    }catch(err){
        console.log(chalk.red("Error Occured"));
        res.status(400).send("Error while retriving record")
    }
})
module.exports=router;