var express=require('express');
var router=express.Router();
var chalk=require('chalk');
var Player=require('../../Schema/player');
var jwt=require('../../Helper/jwtHelper');
var decodeData;
router.use(express.json());

router.use(async function(req,res,next){
   if(req.headers.authorization==undefined)
      return res.status(403).send("Please provide header value");
     
      decodeData=await jwt.verify(req.headers.authorization,"SomeSecret"); 
    next();
})
router.post('/create',function(req,res){
      var body={"name":req.body.name,"team_id":req.body.team_id,"skill":req.body.skill,"created_by":decodeData.data.id}
        var player=new Player(body);
        player.save().then(item=>{
            res.send(item);
        }).catch(err=>{
            if(err)
                res.status(400).send("data not saved to the database");
        })
})
router.get('/list',async function(req,res){
     try{
        var player=await Player.find({});
        res.json(player);
     }catch(err){
        console.log(chalk.red("Error Occured"));
        res.status(400).send("Error while retriving record")
     }
})
router.get('/:id',async function(req,res){
    try{
        var player=await Player.findById({_id:req.params.id});
        res.json(player);
     }catch(err){
        console.log(chalk.red("Error Occured"));
        res.status(400).send("Error while retriving record")
     }
})
router.put('/:id',async function(req,res){

    try{
        var player=await Player.findOne({_id:req.params.id});
        if(player.created_by==decodeData.data.id || decodeData.data.role=="admin")
        {
            var t=await Player.findByIdAndUpdate({_id:req.params.id},req.body)
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
        var player=await Player.findOne({_id:req.params.id});
        if(player.created_by==decodeData.data.id || decodeData.data.role=="admin")
        {
            console.log(req.params.id);
            await Player.findOneAndDelete({_id:req.params.id});
            res.send("Record delete successfully");
        }
        else
           res.send("Permission denied");
    }catch(err){
        console.log(chalk.red("Error Occured"));
        res.status(400).send("Error while retriving record")
    }
})
module.exports=router;