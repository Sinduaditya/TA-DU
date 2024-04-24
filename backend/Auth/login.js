import express from "express";
import { prisma } from "../Lib/prisma.js";
import {compare} from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const login = async(req,res) => {
    const { username, password } = req.body;
    try{
        const user = await prisma.user.findUnique({
            where: {username},
        })
        if(!user){
            return res.status(404).json({message: "User tidak ditemukan"});
        }else {
            const passwordMatch = await compare(password, user.password);
            if (passwordMatch){
                const token = jwt.sign({username}, process.env.JWT_KEY, {
                    expiresIn: "10h",
                });
                const id = user.id;

                return res.status(200).json({token, id});
            }else {
                return res.status(401).json({message: "Password Salah"});
            }
        }
    } catch (error) {
        console.log("Error compare Password: " + error);
        return res.status(500).json({message : "Login Gagal!"});
    }
}

function authenticateToken (req,res,next) {
    const token = req.header("Authorization");
    if(!token) {
        return res.status(401).json({message: "Authentifivation Failed"})
    }

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            console.error("JWT VERIFICATION ERROR", error);
            return res.status(403).json({message: "FORBIDDEN: Token Invalid!"})
        }
        req.user = user;
        next();
    })
}

export {
    login,
    authenticateToken,
};