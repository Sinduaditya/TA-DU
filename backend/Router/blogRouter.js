import express from "express";
import { getBlogsByUser, createBlogPost, getAbout, getHomePage, postSearchPost, getReadAll, putUpdate, Delete} from "../Controllers/blog.js";
const blogs = express.Router();

blogs.get('/', getHomePage);
blogs.get('/about', getAbout);
blogs.post('/search', postSearchPost);
blogs.post('/create', createBlogPost);
blogs.get('/users/:id/blogs', getBlogsByUser);
blogs.get('/readAll', getReadAll);
blogs.put('/update/:authorId', putUpdate);
blogs.delete('/delete/:id', Delete);

export default blogs;
