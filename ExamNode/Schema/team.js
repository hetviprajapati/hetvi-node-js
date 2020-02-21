var mongoose=require('mongoose');
var schema=mongoose.Schema;

var teamSchema=new schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
    logo:{
        type:String,
        trim:true,
    },
    tag_line:{
        type:String,
        trim:true
    },
    created_by:{
        type:String,
        require:true
    }
},{
    collection:'team',
    timestamps:true
})

module.exports=mongoose.model('team',teamSchema);