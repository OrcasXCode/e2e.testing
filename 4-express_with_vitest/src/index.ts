import express from "express";
import {z} from "zod";
export const app=express();
app.use(express.json())

//So this will cover most of the cases like is the given input is the valis number or not so you dont need to create the test cases to handel this
const sumInput=z.object({
    a:z.number(),
    b:z.number(),
})


app.post("/sum",(req,res)=>{
    const parsedContent=sumInput.safeParse(req.body);
    if(!parsedContent.success){
        return res.status(411).json({
            statusCode:411,
            message:"Incorrect outputs"
        })
    }
    const ans=parsedContent.data.a + parsedContent.data.b;
    return res.status(200).json({
        statusCode:200,
        ans
    })
})

//What if the stupid user send the params from the headers
app.get("/sum",(req,res)=>{
    const parsedContent=sumInput.safeParse({
        a:Number(req.headers["a"]),
        b:Number(req.headers["b"]),
    })
    if(!parsedContent.success){
        return res.status(411).json({
            message:"No headers found"
        })
    }
    const ans=parsedContent.data.a + parsedContent.data.b;
    return res.status(200).json({
        statusCode:200,
        ans:ans
    })
})




