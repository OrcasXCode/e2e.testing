import {describe,test,it,expect} from 'vitest'
import request from "supertest"
import {app} from "../index"


describe("POST /sum",()=>{
    it("it should add 1 and 2 to get 3",async()=>{
        const res=await request(app).post("/sum").send({
            a:1,
            b:2
        })
        expect(res.statusCode).toBe(200);
        expect(res.body.ans).toBe(3);
    })
    it("should return error for wrong/empty outputs",async()=>{
        const res=await request(app).post("/sum").send({})
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Incorrect outputs");
    })
})

describe("GET /sum",()=>{
    it("it should return 1 and 2 as 3",async()=>{
        const res=await request(app).get("/sum").set({a:"1",b:"2"}).send();
        expect(res.statusCode).toBe(200);
        expect(res.body.ans).toBe(3);
    })
    it("it should return 411 for wrong/empty outputs",async()=>{
        const res=await request(app).get("/sum").set({}).send();
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("No headers found"); 
    })
})