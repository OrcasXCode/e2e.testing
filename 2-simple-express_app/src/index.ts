import express from "express";

export const app=express();
app.use(express.json());

app.post("/sum",(req,res)=>{
    const a=req.body.a;
    const b=req.body.b;
    const ans=a+b;
    return res.status(200).json({
        statusCode:200,
        ans:ans
    })
})
