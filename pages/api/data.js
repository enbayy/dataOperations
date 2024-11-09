import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, value } = req.body;
        try {
            const data = await prisma.data.create({
                data: {
                    name,
                    value,
                },
            });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Veri eklenirken hata oluştu' });
        }
    } else if (req.method === 'GET') {
        try {
            const data = await prisma.data.findMany();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Veri çekilirken hata oluştu' });
        }
    } else if (req.method === 'PUT') {
        const { id, name, value } = req.body;
        try {
            const updatedData = await prisma.data.update({
                where: { id },
                data: {
                    name,
                    value,
                },
            });
            res.status(200).json(updatedData);
        } catch (error) {
            res.status(500).json({ error: 'Veri güncellenirken hata oluştu' });
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.body;
        try {
            const deletedData = await prisma.data.delete({
                where: { id },
            });
            res.status(200).json(deletedData);
        } catch (error) {
            res.status(500).json({ error: 'Veri silinirken hata oluştu' });
        }
    } else {
        res.status(405).json({ message: 'Yalnızca GET, POST, PUT ve DELETE metodları destekleniyor' });
    }
}