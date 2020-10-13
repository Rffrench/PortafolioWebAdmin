// Rutas Admin
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

// RUD Clientes
router.get('/customers', adminController.getCustomers);
router.get('/customers/:userId', adminController.getCustomer);
router.put('/customers/:userId', adminController.putCustomer);
router.delete('/customers/:userId', adminController.deleteCustomer);

// CRUD Productos
router.get('/products', adminController.getProducts);
router.get('/products/:productId', adminController.getProduct);
router.post('/products', adminController.postProduct);
router.put('/products/:productId', adminController.putProduct);
router.delete('/products/:productId', adminController.deleteProduct);

// CRUD Mesas
router.get('/tables', adminController.getTables);
router.get('/tables/:tableId', adminController.getTable);
router.post('/tables', adminController.postTable);
router.put('/tables/:tableId', adminController.putTable);
router.delete('/tables/:tableId', adminController.deleteTable);

// CRUD Recetas
router.post('/recipes',adminController.postRecipe);
router.get('/recipes',adminController.getRecipes);
router.put('/recipes/:recipeId',adminController.putRecipe);
router.delete('/recipes/:recipeId',adminController.deleteRecipe);

// CRUD  Ordenes de inventario

router.get('/inventoryOrders',adminController.getInventoryOrders);
router.post('/inventoryOrders',adminController.postInventoryOrders);

module.exports = router;