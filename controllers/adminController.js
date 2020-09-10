// Controlador Administrador

const sequelize = require('../util/database');

// Llamar procedimiento almacenado para obtener clientes
exports.getCustomers = (req, res, next) => {
    sequelize.query('CALL getCustomers()')
        .then(rows => {
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
            res.status(201).json({ resultado: 'Usuario Eliminado' }); // 201 es el codigo correcto en PUT
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}