const Food = require('../models/Food');

// Fetch all food items
exports.getFoodItems = async (req, res) => {
    try {
        const foodItems = await Food.find();
        res.status(200).json(foodItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching food items', error });
    }
};

// Add food item to cart
exports.addToCart = (req, res) => {
    const { itemId } = req.body;
    // Logic to add item to cart (this will depend on your cart implementation)
    res.status(200).json({ message: 'Item added to cart', itemId });
};