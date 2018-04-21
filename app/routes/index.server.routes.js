// Load the 'index' controller
const index = require('../controllers/index.server.controller');

// Define the routes module' method
module.exports = function(app) {
	// Mount the 'index' controller's 'render' method
    app.get('/', index.render);
    //renders add_user.ejs if a get request is made to /add_user path
   // app.get('/add_user', index.renderAddUser);
    //renders read_user.ejs if a get request is made to /read_user path
  //  app.get('/read_user', index.renderReadUser);

    app.get('/nurseSignup', index.renderNurseSignUp);

    app.get('/PatientSignup', index.renderPatientSignUp);

    app.get('/nurseLogin', index.renderNurseLogin);

    app.get('/PatientLogin', index.renderPatientLogin);

    app.route('/display/vitalsigns')
        .get(index.renderVitalSignsPage).post(index.rendertEST);//put the post method here

    app.route('/display/vitalsigns/seeVisits')
        .get(index.renderPreviousVitalSignsVisitPage).post(index.renderPreviousVitalSignsVisitPage2);
    


};