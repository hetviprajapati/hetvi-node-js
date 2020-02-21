var mongoose=require('mongoose');
var Schema=mongoose.Schema();
var DemoSchema=new Schema({
     username:{
         type:String,
         trim:true,
         require:true
     },
     password:{
        type:String,
        trim:true,
        require:true
    }
},{
    collection:'Demo',
    timestamps:true
})

module.exports=mongoose.model('Demo',DemoSchema);