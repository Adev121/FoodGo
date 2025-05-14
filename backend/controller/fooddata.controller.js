import express from 'express';
import Fooddata from '../model/fooddata.model.js';

export const getFoodData = async (req, res) => {
    try {
        const foodData = await Fooddata.find();
        res.status(200).json(foodData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addFoodData = async (req, res) => {
    try {
        const { name, CategoryName, img, options, description } = req.body;
        const foodData = await Fooddata.create({
            name: name,
            CategoryName: CategoryName,
            img: img,
            options: options,
            description: description
        });
        await foodData.save();
        res.status(200).json(foodData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
