
import { prisma } from '../Lib/prisma.js';

async function createComment(req, res) {
    // if (!content) {
    //     return res.status(400).json({ error: 'Konten komentar diperlukan' });
    // }

    try {
        await prisma.comment.create({ 
            data: req.body,
        });
        res.status(201).send({ message: 'Comment post created successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Gagal menyimpan komentar' });
    }
}

async function getComments(req, res) {
    try {
        const comments = await prisma.comment.findMany();
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Gagal mengambil komentar' });
    }
}

async function updateComment(req, res) {
    const id = parseInt(req.params.id);

    try {
        await prisma.comment.update({
            data: req.body,
            where: { id }
        });
        res.status(201).send({ message: 'Comment updated successfully'});

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Gagal memperbarui komentar' });
    }
}

async function deleteComment(req, res) {
    const id = parseInt(req.params.id);

    try {
        await prisma.comment.delete({ where: { id } });
        res.status(204).send({message: "Deleted comment successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Gagal menghapus komentar' });
    }
}

export {
    createComment,
    getComments,
    updateComment,
    deleteComment,
};
