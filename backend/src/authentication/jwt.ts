const jwt= require('jsonwebtoken');
import { error } from "console";
import { Request, Response, NextFunction } from "express";

const verifyToken=(req:Request, res:Response, next:NextFunction)=>{
const token= req.cookies.token;
if(!token){
    res.status(401).json({message: 'Unauthorized'});
    return;
}
jwt.verify(token, 'svautoui',(error:any, decoded:any)=>{
    if(error){
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    next();
})
}
export default verifyToken;