const mailRoutes = require('./mail');
const contactRoutes = require('./contact');


module.exports = (app) => {
    app.use('/api/v1/user', mailRoutes);
    // app use "Anderson"
    app.use('/api/v1/contact', contactRoutes);
<<<<<<< HEAD
    //app.Use("Idrissa")
    
=======
    //app.Use("Souleymane")
>>>>>>> 734dac3 (modification index.js)

    // app.use("Audrey")
};

