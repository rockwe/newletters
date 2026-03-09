const mailRoutes = require('./mail');
const contactRoutes = require('./contact');


module.exports = (app) => {
    app.use('/api/v1/user', mailRoutes);
    // app use "Anderson"
// app.use "Maryam"
    app.use('/api/v1/contact', contactRoutes);
    //app.Use("Idrissa")
    

    // app.use("Audrey")
};
