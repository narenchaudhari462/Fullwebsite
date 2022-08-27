const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/youtuberegistration",{
    useNewUrlParser:true,
    // useUnifiedToplogy:true,
    // useCreateIndex:true
}).then(()=>{
    console.log(`connection is successfull`)
}).catch((e)=>{
    console.log(e);
})

