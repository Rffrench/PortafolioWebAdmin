// Controlador Administrador

const sequelize = require('../util/database');

// Llamar procedimiento almacenado para obtener clientes
exports.getCustomers = (req, res, next) => {
    sequelize.query('CALL getCustomers()')
        .then(rows => {
            console.log(rows);
            res.status(201).json({ customers: rows });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}