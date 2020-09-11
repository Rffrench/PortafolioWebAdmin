// Modelo Mesas
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Table = sequelize.define('Table', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    userId: { // FK
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
})

module.exports = Table;