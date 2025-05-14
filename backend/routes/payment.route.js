import express from 'express'
import { createOrder } from '../controller/payment.controller.js'

const router = express.Router()

router.post('/checkout',createOrder)

export default router