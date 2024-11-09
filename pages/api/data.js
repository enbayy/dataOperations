import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, value } = req.body;
        try {
            const data = await prisma.data.create({ data: { name, value } });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Error adding data' });
        }
    } else if (req.method === 'GET') {
        try {
            const data = await prisma.data.findMany();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching data' });
        }
    } else if (req.method === 'PUT') {
        const { id, name, value } = req.body;
        try {
            const updatedData = await prisma.data.update({
                where: { id },
                data: { name, value },
            });
            res.status(200).json(updatedData);
        } catch (error) {
            res.status(500).json({ error: 'Error updating data' });
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.body;
        try {
            await prisma.data.delete({ where: { id } });
            res.status(200).json({ message: 'Data deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting data' });
        }
    } else {
        res.status(405).json({ message: 'Only GET, POST, PUT, DELETE are supported' });
    }
}