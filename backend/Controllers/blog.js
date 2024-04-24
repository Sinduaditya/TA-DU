import { prisma } from "../Lib/prisma.js";

//HOME
async function getHomePage(req,res) {
    try {
        let htmlResponse = `<html>
        <head>
            <title>Bluemonster Blog</title>
        </head>
        <body>
            <h1>Welcome to Bluemonster Blog</h1>
        </body>
        </html>`
        ;
        res.send(htmlResponse);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal Server Error"})
    }
};

//ABOUT
async function getAbout (req,res) {
    let htmlResponse = `
    <html>
    <head>
        <title>About</title>
    </head>
    <body>
        <h1>About Bluemonster Blog</h1>
        <p>Learn more about Bluemonster Blog.</p>
    </body>
    </html>
    `;
    res.send(htmlResponse);
};

//SEARCH
async function postSearchPost(req,res) {
    try{
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

        const data = await prisma.blog.findMany({
            where:{
                OR: [
                    { tittle: {contains: searchNoSpecialChar, mode: 'insentive'}},
                    { body: {contains: searchNoSpecialChar, mode: 'insentive'}}
                ]
            }
        });

        res.send({data});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal Server Search Error"})
    }
};

async function createBlogPost(req, res) {
    try {
        await prisma.blog.create({
            data: req.body
        });
    
      res.status(201).send({ message: 'Blog post created successfully'});
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  async function getBlogsByUser(req, res) {
    const authorId = Number(req.params.authorId);
  
    try {
      const userBlogs = await prisma.user.findUnique({
        where: { id: authorId }
      }).blogs();
  
      res.status(200).send(userBlogs);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
  
  async function getReadAll(req,res) {
    try {
    const limit = req.query.limit
    const page = req.query.page

    const users = await prisma.blog.findMany({
        take: limit && parseInt(limit),
        skip: page && parseInt(page)
    })
    res.json(users)
    } catch (error) {
        console.error("error readAll user:", error);
        res.status(500).send("Error readAll user");
    }
};

async function putUpdate(req,res) {
    try {
        const id = parseInt(req.params.authorId)
        await prisma.blog.update({
            data:req.body,
            where:{id}
        })
    
        res.status(200).send({message: "blog updated successfully"})
    } catch (error) {
        console.error("error cannot update blog:", error);
        res.status(500).send("Error cannot update blog");
    }
};

async function Delete(req,res) {
    try {
        const id = parseInt(req.params.id)
        await prisma.blog.delete({
            where:{id}
        })
    
        res.status(200).send({message : "Deleted Blog Successfully"})
    } catch (error) {
        console.error("error delete user:", error);
        res.status(500).send("Error delete user");
    }
};

export {
    getHomePage,
    getAbout,
    postSearchPost,
    createBlogPost,
    getBlogsByUser,
    getReadAll,
    putUpdate,
    Delete,
}