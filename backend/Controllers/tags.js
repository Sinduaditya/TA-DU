import { prisma } from '../Lib/prisma.js';

async function postCreate(req, res) {
    try {
        await prisma.tag.create({
            data: req.body
        });
        res.status(201).send({ message: 'tag created successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to create tag' });
    }
}

async function getReadAll(req, res) {
    try {
        const tags = await prisma.tag.findMany();
        res.json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to read tags' });
    }
}

async function getRead(req, res) {
    const id = parseInt(req.params.id);
    try {
        const tag = await prisma.tag.findUnique({ where: { id } });
        if (!tag) {
            res.status(404).send({ error: 'Tag not found' });
            return;
        }
        res.json(tag);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to read tag' });
    }
}

async function putUpdate(req, res) {
    const id = parseInt(req.params.id);
    try {
        await prisma.tag.update({ 
            data: req.body,
            where: { id }
        });
        res.status(201).send({message : "tags updated successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to update tag' });
    }
}

async function delDelete(req, res) {
    const id = parseInt(req.params.id);
    try {
        await prisma.tag.delete({ where: { id } });
        res.status(204).send({message: "Deleted tag successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to delete tag' });
    }
}

export {
    postCreate,
    getReadAll,
    getRead,
    putUpdate,
    delDelete,
};
