import express from 'express';
import { addFoodData, getFoodData } from '../controller/fooddata.controller.js';

const router =  express.Router();

router.get('/getfood',getFoodData)
router.post('/addfood',addFoodData)

export default router;