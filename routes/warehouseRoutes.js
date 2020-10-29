// Rutas Admin
const express = require('express');
const router = express.Router();

const warehouseController = require('../controllers/warehouseController');



// CRUD Recetas
router.post('/recipes',warehouseController.postRecipe);
router.get('/recipes',warehouseController.getRecipes);
router.put('/recipes/:recipeId',warehouseController.putRecipe);
router.delete('/recipes/:recipeId',warehouseController.deleteRecipe);

// CRUD  Ordenes de inventario

router.get('/inventoryOrders/:userId',warehouseController.getInventoryOrders);
router.get('/inventoryOrder/:orderId',warehouseController.getInventoryOrder);
router.post('/inventoryOrders',warehouseController.postInventoryOrders);


// Productos de ordenes
router.put('/order-products/update', warehouseController.putOrderProduct);
router.post('/order-products/new',warehouseController.postOrderProduct);
router.get('/order-products/:orderId',warehouseController.getOrderProducts);
router.put('/order-products/:orderId',warehouseController.putOrderStatus);
router.delete('/order-products/:orderId/:productId',warehouseController.deleteOrderProduct);
module.exports = router;