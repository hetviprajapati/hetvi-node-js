var mongoose=require('mongoose');
var schema=mongoose.Schema;

var userSchema=new schema({
    username:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        trim:true,
    },
    role:{
        type:String,
        require:true,
        enum:["player", "team", "admin"]
    }
},{
    collection:'user',
    timestamps:true
})

module.exports=mongoose.model('user',userSchema);