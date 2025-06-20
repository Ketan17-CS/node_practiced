const express = require('express');
const router = express();

const MenuItem = require('../schema/Menu'); // Import the MenuItem model

router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the menu item data.
        // Create a new menu item document using the mongoose model
        const newMenuItem = new MenuItem(data);
        // Save the new menu item to the database
        const response = await newMenuItem.save();
        console.log('Menu item saved.');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
})

//Get method to fetch menu items from the database
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find(); // Fetch all menu items from the database
        console.log('Menu items fetched.');
        res.status(200).json(menuItems); // Send the menu items as a JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

router.get('/:categories', async (req, res) => {
    const categories = req.params.categories;
    if (categories == 'Starter' || categories == 'Main_Course' || categories == 'Dessert' || categories == 'Beverage') {
        const response = await MenuItem.find({ category: categories });
        console.log('response fetched.');
        res.status(200).json(response); // Send the response as a JSON
    } else {
        res.status(404).json({ error: 'Invalid work type.' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const menuItemId = req.params.id;
        const updatedMenuItemData = req.body; // Get the updated data from the request body
        const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedMenuItemData, {
            new: true,
            runValidators: true
        }); // Update the menu item with the given ID
        if (!response) {
            return res.status(404).json({ error: 'Menu item not found.' });
        }
        console.log('Menu item updated.');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const menuItemId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuItemId); // Delete the menu item with the given ID
        if (!response) {
            return res.status(404).json({ error: 'Menu item not found.' });
        }
        console.log('Menu item deleted.');
        res.status(200).json({ message: 'Menu item deleted successfully.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
})
module.exports = router
