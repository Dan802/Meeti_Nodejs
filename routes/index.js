import express from "express";

const router = express.Router()

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/create-account', (req, res) => {
    res.render('create-account')
})

export default router