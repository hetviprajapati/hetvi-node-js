var jwt=require('jsonwebtoken');

module.exports={
    sign:function(secret){
        return jwt.sign({name:"Hetvi"},secret,{});
    },
    verify:async function(token,secret){
        try{
            var data=await jwt.verify(token,secret);
            return {data}
        }catch(err){
            console.log("An error occured while verifying "+err);
            return {err}
        }
    }
}