const sequelize = require('../util/database');

// Obtiene los meses en los que se registraron pagos
exports.getIncomeDates = (req, res, next) => {    

    sequelize.query('CALL getIncomeDates()')
        .then(rows => {

            console.log(rows);
            res.status(200).json({ incomeDates: rows });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

exports.getDailyIncome = (req, res, next) => { 
    const month=req.params.month;   
    const year=req.params.year;

    sequelize.query('CALL getDailyIncome(:p_month,:p_year)', { replacements: { p_month: month,p_year:year} })
        .then(result => {
            res.status(200).json({ dailyIncome: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}