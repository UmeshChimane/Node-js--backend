const express=require("express");
const app=express();

app.use(express.json());  // ALLOWS EXPRESS TO UNDERSTAND THE JSON REQUEST BODIES

const noteRoutes=require("./routes/noteRoutes");

app.use("/notes",noteRoutes)  //every route in notedROutes will starts with /notes

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message: "Notes api is running"
    })
})

module.exports=app;