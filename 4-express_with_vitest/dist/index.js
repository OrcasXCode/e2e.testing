"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
//So this will cover most of the cases like is the given input is the valis number or not so you dont need to create the test cases to handel this
const sumInput = zod_1.z.object({
    a: zod_1.z.number(),
    b: zod_1.z.number(),
});
exports.app.post("/sum", (req, res) => {
    const parsedContent = sumInput.safeParse(req.body);
    if (!parsedContent.success) {
        return res.status(411).json({
            statusCode: 411,
            message: "Incorrect outputs"
        });
    }
    const ans = parsedContent.data.a + parsedContent.data.b;
    return res.status(200).json({
        statusCode: 200,
        ans
    });
});
//What if the stupid user send the params from the headers
exports.app.get("/sum", (req, res) => {
    const parsedContent = sumInput.safeParse({
        a: Number(req.headers["a"]),
        b: Number(req.headers["b"]),
    });
    if (!parsedContent.success) {
        return res.status(411).json({
            message: "No headers found"
        });
    }
    const ans = parsedContent.data.a + parsedContent.data.b;
    return res.status(200).json({
        statusCode: 200,
        ans: ans
    });
});
