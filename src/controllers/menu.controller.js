import prisma from '../config/db.js';

// Get all menus
export const getMenus = async(req, res, next) => {
    try {
        const startTime = Date.now();
        const menus = await prisma.menu.findMany();
        const took = Date.now() - startTime;
        if(!menus){
            return res.status(404).json({
                took,
                status: "Not Found",
                data: null, // No data found
                message: "No menus found",
                errors: null
            });
        }

        res.status(200).json({
            took,
            status: "OK",
            data: {
                menus
            },
            message: "Menus fetched successfully",
            errors: null
        });
    } catch (error) {
        next(error);
    }
};

// Get single menu by ID
export const getMenuById = async(req, res, next) => {
    try {
        const startTime = Date.now();
        const { id } = req.params;
        const menu = await prisma.menu.findUnique({
            where: { id: parseInt(id) }
        });
        
        if (!menu) {
            return res.status(404).json({
                message: 'Menu not found'
            });
        }
        
        res.status(200).json({
            message: 'Menu fetched successfully',
            menu
        });
    } catch (error) {
        next(error);
    }
};

// Create menu
export const createMenu = async(req, res, next) => {
    try {
        // 1. Capture the start time
        const startTime = Date.now();
        
        const { name, description, price, category } = req.body;
        
        // Validation: Missing fields
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                took: Date.now() - startTime,
                status: "Bad Request",
                data: null,
                message: "Validation failed",
                errors: "name, description, price, and category are required"
            });
        }
        
        // Validation: Invalid price
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({
                took: Date.now() - startTime,
                status: "Bad Request",
                data: null,
                message: "Validation failed",
                errors: "price must be a valid positive number"
            });
        }
        
        // 2. Database operation
        const menu = await prisma.menu.create({
            data: { 
                name: name,
                description: description,
                price: parseFloat(price),
                category: category
            }
        });
        
        // 3. Send successful response
        res.status(201).json({
            took: Date.now() - startTime,
            status: "OK", // Or "Created" to match the 201 status code
            data: menu,   // The newly created menu object
            message: "Menu created successfully",
            errors: null
        });
    } catch (error) {
        next(error);
    }
};

// Update menu
export const updateMenu = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, category } = req.body;
        
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                message: 'name, description, price, and category are required'
            });
        }
        
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({
                message: 'price must be a valid positive number'
            });
        }
        
        const menu = await prisma.menu.update({
            where: { id: parseInt(id) },
            data: { 
                name,
                description,
                price: parseFloat(price),
                category
            }
        });
        
        res.status(200).json({
            message: 'Menu updated successfully',
            menu
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                message: 'Menu not found'
            });
        }
        next(error);
    }
};

// Delete menu
export const deleteMenu = async(req, res, next) => {
    try {
        const { id } = req.params;
        
        const menu = await prisma.menu.delete({
            where: { id: parseInt(id) }
        });
        
        res.status(200).json({
            message: 'Menu deleted successfully',
            menu
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                message: 'Menu not found'
            });
        }
        next(error);
    }
};