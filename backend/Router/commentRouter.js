// routers/commentRouter.js
import express from 'express';
import { createComment, getComments, updateComment, deleteComment } from '../Controllers/comment.js';

const comment = express.Router();

comment.post('/comment', createComment);
comment.get('/comment', getComments);
comment.put('/comment/:id', updateComment);
comment.delete('/comment/:id', deleteComment);

export default comment;
