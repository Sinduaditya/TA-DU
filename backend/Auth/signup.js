import express from "express";
import { prisma } from "../Lib/prisma.js";
import {hash} from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const signup = async(req,res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = await hash(password, 10);
        await prisma.user.create({
            data: {
            username,
            email,
            password: hashedPassword}
        })
        res.status(200).send({message: "Registrasi Berhasil"});

        // check jika email sudah tersedia sebelumnya
        const existingUserByEmail = await prisma.user.findUnique({
            where: {email:email}
        });
        if(existingUserByEmail) {
            return res.status(409).json({ user: null, message: "Pengguna dengan email tersebut sudah tersedia sebelumnya" });
        }
        // check jika email sudah tersedia sebelumnya
        const existingUserByUsername = await prisma.user.findUnique({
            where: {username:username}
        });
        if(existingUserByUsername) {
            return res.status(409).json({ user: null, message: "Pengguna dengan username tersebut sudah tersedia sebelumnya" });
        }
    } catch (error) {
        console.log("Error Hashing Password: " + error);
        res.status(500).json({message : "Registrasi Gagal!"});        
    }
}

export default signup;