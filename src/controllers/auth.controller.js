import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

export const signIn = async(req,res,next)=>{
    try{
        const startTime = Date.now();
        const {email,password} = req.body
        const user = await prisma.user.findUnique({where:email})

        if(!user){
            const error = new Error("User is not found");
            return res.status(404).json({
                took: Date.now()-startTime,
                status: "Not Found",
                message: "email is not found",
                errors: error
            });
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            const error = new Error("Password is incorrect");
            return res.status(404).json({
                took: Date.now()-startTime,
                status: "Wrong passport :3",
                message: "password wrong:3",
                errors: error
            });
        }
        const token = jwt.sign(
            {userId:user.userId, email:user.email},
            process.env.JWT_SECRET,
            { expiresIn:process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            took: Date.now()-startTime,
            message:'login successful',
            user: { id: user.id, email: user.email, name: user.name },
            status: "yeyy",
            message: "alrigthttt",
            token,
            errors: null
        });
    }catch(error){
        next(error)
    }
}