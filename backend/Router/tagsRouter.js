import express from 'express';
import { postCreate, getReadAll, getRead, putUpdate, delDelete } from '../Controllers/tags.js';

const tags = express.Router();

tags.post('/tags', postCreate);
tags.get('/tags', getReadAll);
tags.get('/tags/:id', getRead);
tags.put('/tags/:id', putUpdate);
tags.delete('/tags/:id', delDelete);

export default tags;
