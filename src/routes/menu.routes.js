import { getMenus, getMenuById, createMenu, updateMenu, deleteMenu } from "../controllers/menu.controller.js";
import { Router } from 'express';

const menuRouter = Router();

// GET all menus
menuRouter.get('/', getMenus);

// GET single menu by ID
menuRouter.get('/:id', getMenuById);

// POST create menu
menuRouter.post('/', createMenu);

// PUT update menu
menuRouter.put('/:id', updateMenu);

// DELETE menu
menuRouter.delete('/:id', deleteMenu);

export default menuRouter;
