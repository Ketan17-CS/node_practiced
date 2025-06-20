const mongoose = require('mongoose');

// Define the schema for a hotel menu item
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Starter', 'Main_Course', 'Dessert', 'Beverage'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
});

// export the model
const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;

