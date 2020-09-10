// Controlador Administrador

const sequelize = require('../util/database');
const Product = require('../models/productsModel');


// CLIENTES

// Llamar procedimiento almacenado para obtener clientes
exports.getCustomers = (req, res, next) => {
    sequelize.query('CALL getCustomers()')
        .then(rows => {
            if (rows.length === 0) { // Si no encuentra un usuario la fila viene vacía
                const error = new Error('Usuarios no encontrados');
                error.statusCode = 404;
                throw error;
            }
            console.log(rows);
            res.status(200).json({ customers: rows });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

exports.getCustomer = (req, res, next) => {
    const userId = req.params.userId; // se obtiene el ID de la URL dinamica /customers/:userId
    sequelize.query('CALL getCustomer(:p_id)', { replacements: { p_id: userId } })
        .then(rows => {
            if (rows.length === 0) { // Si no encuentra un usuario la fila viene vacía
                const error = new Error('Usuario no encontrado');
                error.statusCode = 404;
                throw error;
            }
            console.log(rows);
            res.status(200).json({ customer: rows });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

exports.putCustomer = (req, res, next) => {
    const userId = req.params.userId; // se obtiene el ID de la URL dinamica /customers/:userId
    const [newEmail, newName, newLastName] = [req.body.newEmail, req.body.newName, req.body.newLastName];

    // Se busca primero el usuario llamando al procedimiento almacenado de buscar usuario
    sequelize.query('CALL getCustomer(:p_id)', { replacements: { p_id: userId } })
        .then(row => {
            if (row.length === 0) { // Si no encuentra un usuario la fila viene vacía
                const error = new Error('Usuario no encontrado');
                error.statusCode = 404;
                throw error;
            }

            // SI lo encontró el usuario se actualiza. query() devuelve una promesa por lo que se sigue anidando 
            return sequelize.query('CALL updateCustomer(:p_id, :p_email, :p_name, :p_lastName)',
                { replacements: { p_id: userId, p_email: newEmail, p_name: newName, p_lastName: newLastName } })
        })
        .then(result => {
            console.log(result);
            res.status(201).json({ resultado: 'Usuario Actualizado' }); // 201 es el codigo correcto en PUT
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

exports.deleteCustomer = (req, res, next) => {
    const userId = req.params.userId; // se obtiene el ID de la URL dinamica /customers/:userId


    // Se busca primero el usuario llamando al procedimiento almacenado de buscar usuario
    sequelize.query('CALL getCustomer(:p_id)', { replacements: { p_id: userId } })
        .then(row => {
            if (row.length === 0) { // Si no encuentra un usuario la fila viene vacía
                const error = new Error('Usuario no encontrado');
                error.statusCode = 404;
                throw error;
            }

            // SI lo encontró el usuario se actualiza. query() devuelve una promesa por lo que se sigue anidando 
            return sequelize.query('CALL deleteCustomer(:p_id)', { replacements: { p_id: userId } })
        })
        .then(result => {
            console.log(result);
            res.status(201).json({ resultado: 'Usuario Eliminado' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}






// PRODUCTOS
exports.getProducts = (req, res, next) => {
    sequelize.query('CALL getProducts()')
        .then(rows => {
            if (rows.length === 0) {
                const error = new Error('No Products Found');
                error.statusCode = 404;
                throw error;
            }
            console.log(rows);
            res.status(200).json({ products: rows });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId; // se obtiene el ID de la URL dinamica /products/:productId
    sequelize.query('CALL getProduct(:p_id)', { replacements: { p_id: productId } })
        .then(rows => {
            if (rows.length === 0) {
                const error = new Error('No Products Found');
                error.statusCode = 404;
                throw error;
            }
            console.log(rows);
            res.status(200).json({ product: rows });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

exports.postProduct = (req, res, next) => {
    const [name, quantity] = [req.body.name, req.body.quantity];

    sequelize.query('CALL addProduct(:p_name, :p_quantity)', { replacements: { p_name: name, p_quantity: quantity } })
        .then(result => {
            res.status(201).json({ result: 'Producto Insertado' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.putProduct = (req, res, next) => {
    const productId = req.params.productId; // Se obtiene el ID del producto de la URL
    const [name, quantity] = [req.body.name, req.body.quantity];


    // Se busca primero el producto llamando al procedimiento almacenado de buscar producto
    sequelize.query('CALL getProduct(:p_id)', { replacements: { p_id: productId } })
        .then(row => {
            if (row.length === 0) { // Si no encuentra un producto la fila viene vacía
                const error = new Error('Producto no encontrado');
                error.statusCode = 404;
                throw error;
            }

            return sequelize.query('CALL updateProduct(:p_id, :p_name, :p_quantity)', { replacements: { p_id: productId, p_name: name, p_quantity: quantity } })
        })
        .then(result => {
            res.status(201).json({ result: 'Producto Actualizado' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId; // se obtiene el ID de la URL dinamica /products/:productId


    // Se busca primero el Producto llamando al procedimiento almacenado de buscar Producto
    sequelize.query('CALL getProduct(:p_id)', { replacements: { p_id: productId } })
        .then(row => {
            if (row.length === 0) { // Si no encuentra un Producto la fila viene vacía
                const error = new Error('Producto no encontrado');
                error.statusCode = 404;
                throw error;
            }

            // SI lo encontró el Producto se actualiza. query() devuelve una promesa por lo que se sigue anidando 
            return sequelize.query('CALL deleteProduct(:p_id)', { replacements: { p_id: productId } })
        })
        .then(result => {
            console.log(result);
            res.status(201).json({ resultado: 'Producto Eliminado' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
