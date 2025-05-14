import express from 'express'
import { fetchOrderData, getOrder, getOrderData } from '../controller/order.controller.js'
const router = express.Router()

router.post('/Orders',getOrderData)
router.post('/fetchOrders',fetchOrderData)
router.get('/getOrder',getOrder)

export default router