var express=require('express');
var router=express.Router();
var jwt=require('../../Helper/jwtHelper.js');
var chalk=require('chalk');
router.use(express.json());
var Users=require('../../Schema/user');
router.use(async function(req,res,next){
    var url=req.url.split('/');
    var id=url[2];
    if(req.headers.authorization==undefined) 
          return res.status(401).send("Please provide the header value");
    var decodedata=await jwt.verify(req.headers.authorization,'SomeSecret');
    if(decodedata)
    {
         if(decodedata.data.role==="admin")
            next()   
          else if(req.method=='GET' && id==decodedata.data._id && decodedata.data.role=="read")
            next()
          else if(req.method=='PUT' &&  id==decodedata.data._id && decodedata.data.role=="write")
            next()
         else
            res.status(403).send("Permission denined");
    }  
})
router.post('/create',function(req,res){
      var User=new Users(req.body);
      User.save().then(item=>{
          res.send(item+ " is saved to database");
      }).catch(err=>{
        if(err)
        {
          if(err.code==11000)
            return res.send("Given email id already exists")
          else
            return  res.status(400).send("Data not Saved"+err);  
        }   
      })
})
router.get('/get',async function(req,res){
  try{
       var user=await Users.find({});
     //  var user1=await Users.aggregate([{$group:{_id:"$role",num:{$sum:1}}}])
        return res.json(user);
  }catch(err){
    console.log(chalk.red("Error occured"));
    return res.status(401).send("An error ocuured while retriving person record"+err);
  }
})
router.get('/getSpecific/:id',function(req,res){
    Users.findById(req.params.id).then(data=>{ 
        return res.json(data);      
    }).catch(err=>{
      console.log(chalk.red("Error occured"));
        return res.status(401).send("An error ocuured while retriving person record");
    })
  })
router.put('/update/:id',function(request,response){
    const body=request.body;
    if(!req.body.role)
    {
      Users.findOneAndUpdate({_id:request.params.id},body,function(err,data){
        if(err)
        {
            console.log(chalk.red("Error occured"));
            return response.status(401).send("An error ocuured while retriving person record"+err);
        }
          return response.send("Record Update Successfully.");      
      })
    }   
});
router.delete('/delete/:id',async function(request,response){
        try{
            var deleteRecord=await Users.findOneAndDelete({_id:request.params.id})
            return response.json(deleteRecord);      
        }catch(err){
            console.log(chalk.red("Error occured"));
            return response.status(401).send("An error ocuured while retriving person record");
        }
})
module.exports=router;