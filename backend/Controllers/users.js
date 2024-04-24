import { prisma } from "../Lib/prisma.js";
import signup from "../Auth/signup.js";
// async function uCreate(req,res) {
//     try {
//         await prisma.user.create({
//             data: req.body,
//         });
//         res.status(201).json({ message: 'user created successfully'});
//     } catch (error) {
//         console.error("error creating user:", error);
//         res.status(500).send("Error creating user");
//     }
// }

const uCreate = signup;

async function uReadAll(req,res) {
    try {
    const limit = req.query.limit
    const page = req.query.page

    const users = await prisma.user.findMany({
        take: limit && parseInt(limit),
        skip: page && parseInt(page)
    })
    res.json(users)
    } catch (error) {
        console.error("error readAll user:", error);
        res.status(500).send("Error readAll user");
    }
};

async function uRead(req,res) {
    try {
        const id = parseInt(req.params.id)
        const user = await prisma.user.findFirst({
            where:{
                id
            }
        })
        if(!user){
            res.status(404).json({
                Error:true,
                message:"user tidak ditemukan"
            })
            return
        }
        res.json(user)
    } catch (error) {
        console.error("error read user:", error);
        res.status(500).send("Error read user" + user);
    }
};

async function uUpdate(req,res) {
    try {
        const id = parseInt(req.params.id)
        await prisma.user.update({
            data:req.body,
            where:{id}
        })
    
        res.sendStatus(200)
    } catch (error) {
        console.error("error cannot update user:", error);
        res.status(500).send("Error cannot update user");
    }
};



async function uDelete(req,res) {
    try {
        const id = parseInt(req.params.id)
        await prisma.user.delete({
            where:{id}
        })
    
        res.sendStatus(200)
    } catch (error) {
        console.error("error delete user:", error);
        res.status(500).send("Error delete user");
    }
};

function uDefault(req,res) {
    console.log("user post : ", req.body)
    res.sendStatus(201)
}

export {
    uCreate,
    uRead,
    uReadAll,
    uUpdate,
    uDelete,
    uDefault,
};

// export const users = express.Router()

// users.get('/', (req, res) => {
//     res.send({users:[
//         "joko",
//         "dono"
//     ]});
// });

// //create user
// users.post('/create', async(req,res) => {
//     await prisma.user.create({
//         data: req.body
//     })
//     res.sendStatus(201);
// })

// //read All user
// users.get('/readAll', async(req,res)=>{
//     const limit = req.query.limit
//     const page = req.query.page

//     const users = await prisma.users.findMany({
//         take: limit && parseInt(limit),
//         skip: page && parseInt(page)
//     })


//     res.json(users)
// })

// //read user
// users.get('/read/:id', async(req,res) => {
//     const id = parseInt(req.params.id)
//     const user = await prisma.users.findFirst({
//         where:{
//             id
//         }
//     })
//     if(!user){
//         res.status(404).json({
//             Error:true,
//             message:"user tidak ditemukan"
//         })
//         return
//     }
//     res.json(user)
// })



// users.delete('/delete/:id', async(req,res) => {
//     const id = parseInt(req.params.id)
//     await prisma.users.delete({
//         where:{id}
//     })

//     res.sendStatus(200)
// })