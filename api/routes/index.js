const mailRoutes = require('./mail');



module.exports = (app) => {
    app.use('/api/v1/user', mailRoutes);


};
