var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var userSchema=new Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    gender:{
        type:Boolean,
        default:1
    },
    dob:{
        type:Date,
        require:true
    },
    role:{
        type:String,
        require:true,
        trim:true,
        enum:["read","write","admin"]
    }
},{
    collection:'users',
    timestamps:true
})

module.exports=mongoose.model('user',userSchema);