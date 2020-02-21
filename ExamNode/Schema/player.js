var mongoose=require('mongoose');
var schema=mongoose.Schema;

var playerSchema=new schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
    team_id:{
        type:String,
        require:true,
        trim:true,
    },
    skill:{
        type:String,
        require:true,
        trim:true,
        enum: ["Bowler", "Batsman", "WicketKeeper", "AllRounder"]
    },
    created_by:{
        type:String,
        require:true
    }
},{
    collection:'player',
    timestamps:true
})

module.exports=mongoose.model('player',playerSchema);