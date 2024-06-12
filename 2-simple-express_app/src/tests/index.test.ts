import {describe,it,expect,test} from "@jest/globals"
import  request from "supertest"
import {app} from "../index"

describe("POST /sum",()=>{
    it("it should add 1 and 2",async()=>{
        const res=await request(app).post("/sum").send({
            a:1,
            b:2
        })
        expect(res.statusCode).toBe(200);
        expect(res.body.ans).toBe(3);
    })
    it("it should return sum of two negative numbers",async()=>{
        const res=await request(app).post("/sum").send({
            a:-1,
            b:-2
        })
        expect(res.body.statusCode).toBe(200);
        expect(res.body.ans).toBe(-3);
    })
    it("it should return sum of two zero numbers",async()=>{
        const res=await request(app).post("/sum").send({
            a:0,
            b:0
        })
        expect(res.body.statusCode).toBe(200);
        expect(res.body.ans).toBe(0);
    })
})
