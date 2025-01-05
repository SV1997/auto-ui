import {Request, Response} from 'express';
import { user,workshop,components, PrismaClient  } from '@prisma/client';
const jwt = require('jsonwebtoken');
import express from 'express';
declare module 'express-session' {
    interface SessionData {
      userId: Number;
    }
  }
  
const prisma= new PrismaClient();
const createUser:express.RequestHandler=async (req:Request, res:Response)=>{
try
    {const userData=req.body;
        console.log(userData);
        const email= userData.email;
const isPresent=await prisma.user.findFirst({
    where: {
        email: userData.email as string
    }
})
if(isPresent){
    res.json({message: 'User already exists'});
    return;
}
const response = await prisma.user.create({
    data: {
        name: userData.name,
        email: userData.email,
    }
})
console.log(response);
req.session.userId=Number(response.id);
const token= jwt.sign({email}, 'svautoui')
res.cookie('token', token,{httpOnly:true,secure:true, sameSite:'none'});
res.json({message: 'User created successfully'});
}
catch(err){
    console.log(err);
    res.json({message: 'Error in creating user'});
}
}

const sendWorkshopsData:express.RequestHandler=async (req:Request, res:Response)=>{
   try{ console.log("workshop data");
    console.log(req.session, req.cookies);
    const user=req.session.userId;
    console.log(user);
    
    const response = await prisma.user.findFirst({
        where: {
            id: Number(user)
        },   
        include: {
            workshops: true
        }
    })
    console.log(response);
    res.json(response?.workshops);}
    catch(err){
        console.log(err);
        res.json({message: 'Error in fetching workshops'});
    }
}


const createWorkshop:express.RequestHandler=async (req:Request, res:Response)=>{
try
{const workshopData=req.body;
    const name=workshopData.name;
console.log(req.session, req.cookies);
const userId=String(req.session.userId);
const response =await  prisma.workshop.create({
    data: {
        name: name,
        userId: Number(userId)
    }
})
res.json(response);}
catch(err){
    console.log(err);
    res.json({message: 'Error in creating workshop'});
}
}

type elementInterface={
    id: number;
	elementId: number;
	name: string;
	text: string;
	content: string;
	icon: string;
	column?: string;
	props:string;
	x:number;
	y:number;
	width?:number;
	height?:number;
}
const saveCode:express.RequestHandler=async (req:Request, res:Response)=>{
try
    {const codeData=req.body.elements;
        const workshopId=req.body.workShopId;
        const workshopName=req.body.name
    console.log(codeData);
    const codeDataRefined=codeData.map((element:elementInterface)=>{
        return{
            name: element.name,
            width: element.width,
            height: element.height,
            x: element.x,
            y: element.y
        }
    })
    const  response=await prisma.workshop.upsert({
        where: {
            id: Number(workshopId)
        },
        update: {
            component: {
                create: codeDataRefined
            }
        },
        create: {
            id: Number(workshopId),
            name: workshopName,
            userId: Number(req.session.userId),
            component: {
                create: codeDataRefined
            }
        }
    })
console.log(response);
res.json({message: 'Code saved successfully'});
}
catch(err){
    console.log(err);
    res.json({message: 'Error in saving code'});
}
}

const getUserData:express.RequestHandler=async (req:Request, res:Response)=>{
    try {const userMail= req.body.email;
        const rememberMe=req.body.rememberMe;
    console.log(userMail);
    
    const response = await prisma.user.findFirst({
        where: {
            email: userMail
        }
    })
    const userId=response?.id;
    console.log(userId);
    req.session.userId=Number(userId);
    req.session.save()
    const token= jwt.sign({userMail}, 'svautoui', {expiresIn: rememberMe? '7d': '1d'})
    res.cookie('token', token,{httpOnly:true,secure:true, sameSite:'none'});
    res.json({msg: "user found", userId: userId});}
    catch(err){
        console.log(err);
        res.json({message: 'Error in fetching user'});
    }
}

const sendCodesData:express.RequestHandler=async (req:Request, res:Response)=>{
try{    const workshopId:String=req.body.workshopId;
    const userId:Number|undefined=req.session.userId;
    if(userId!==req.session.userId){
        res.json({message: 'User not authenticated'});
        return;
    }
    console.log(workshopId);
    const elements= await prisma.workshop.findFirst({
        where:{
            id: Number(workshopId)
        },
        include:{
            component: true
        }
    })
    console.log(elements);
    
    res.json(elements?.component);}

    catch(err){
        console.log(err);
        res.json({message: 'Error in fetching user'});
    }
}
const logout:express.RequestHandler=async (req:Request, res:Response)=>{
    try{
        console.log("logout")
        
        res.clearCookie('token');
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
                res.json({message: 'Error in logging out'});
                return;
        }
    })
        res.json({message: 'Logged out successfully'});
    }
    catch(err){
        console.log(err);
        res.json({message: 'Error in logging out'});
    }
}

const deleteElement:express.RequestHandler=async (req:Request, res:Response)=>{
    try {
        const workshopId=req.body.workshopId;
        const elementId=req.body.elementId;
        console.log(workshopId, elementId);
        
        const response=await prisma.components.delete({
            where:{
                workshopId: Number(workshopId),
                id: Number(elementId)
            }
        })
        console.log(response);
        res.json({message: 'Element deleted successfully'});
        
    } catch (error) {
        console.log(error);
        
    }
}
const userFunctions={saveCode, createUser, createWorkshop, getUserData, sendWorkshopsData, sendCodesData, logout, deleteElement};

export default userFunctions;