import express from "express";
import users from "./Router/userRouter.js";
import blogs from "./Router/blogRouter.js";
import parser from "body-parser";
import isActiveRoute from "./Helpers/routeHelpers.js";
import session from "express-session";
import { login, authenticateToken} from "./Auth/login.js";
import signup from './Auth/signup.js';
import tags from "./Router/tagsRouter.js";
import comment from "./Router/commentRouter.js";

const port = 3000;
const app = express();

app.use(parser.json());
app.use(express.json());

// USER
app.use('/users', users);

// BLOG
app.use('/blogs', blogs);

// TAGS
app.use('/tags', tags);

//COMMENT 
app.use('/comment', comment);

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "d283hej1io2kmsxni32r239uejsan",
}))

app.post('/signup', signup)
app.post('/login', login);
app.get('/protected', authenticateToken, (req,res) => {
    res.json({message: "Authenticated", user: req.user});
});
app.post('/logout', authenticateToken, (req,res)=> {
    res.json({message: "Logout successfull"});
})
app.locals.isActiveRoute = isActiveRoute;

app.listen(port,()=>{
    console.log('listening on port : ' + port);
})