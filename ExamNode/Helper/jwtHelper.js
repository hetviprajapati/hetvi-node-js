var jwt=require('jsonwebtoken')
var chalk=require('chalk')

module.exports={
    sign:function(body,secret){
        return jwt.sign(body,secret,{});
    },
    verify:async function(token,secret){
        try{
            var data= await jwt.verify(token,secret);
            return {data}
        }catch(err){
            if(err)
            {
                console.log(chalk.red("error while veryfying"));
                return {err}
            }
        }
    }
}