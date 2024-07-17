import express from 'express'
const cors = require('cors');
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(cors());
const prisma = new PrismaClient(); 
app.use(express.json());

app.post('/usuarios', async (req, res) =>{
    
    try {
        await prisma.user.create({
            data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
            },
        })

        res.status(201).json(req.body)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.get('/usuarios', async (req, res) => {
    try {
        const { email, name, age } = req.query;
        
        const users = await prisma.user.findMany({
            where: {
                email: email ? { contains: email.toLowerCase(), mode: 'insensitive' } : undefined,
                name: name ? { contains: name.toLowerCase(), mode: 'insensitive' } : undefined,
                age: age ? String(age) : undefined,
            },
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/usuarios/:id', async (req, res) =>{
    
    try {
        const putted = await prisma.user.update({
            where:{
                id: req.params.id
            },
            data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
            },
        })

        res.status(201).json(putted)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.delete('/usuarios/:id', async (req, res) =>{
    
    try {
        const deleted = await prisma.user.delete({
            where:{
                id: req.params.id
            }
        })

        res.status(201).json(deleted)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


app.listen(3000)

/*
    1) Tipo de Rota / HTTP
    2) Endereço
    antoniolcarvalho49ss
    DopIMKMuBHbX5Ilm
*/