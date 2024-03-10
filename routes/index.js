import express from "express";

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Inicio')
})

router.get('/create-account', (req, res) => {
    res.send('Create account')
})

export default router