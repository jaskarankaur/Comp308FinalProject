const User = require('mongoose').model('User');
const Nurse = require('mongoose').model('Nurse');
const VitalSigns = require('mongoose').model('VitalSigns');
const bodyParser = require('body-parser');


exports.rendertEST = function (req, res) {

    var patientName = req.body.patient;
    console.log('patient name is', patientName);
    const signs = new VitalSigns(req.body);

    signs.save((err) => {
        if (err) {
            // Call the next middleware with an error message
            console.log("object is in errorr************ " + req.body.patient);
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            console.log('sign obj***** is');

            /* res.render('index', {
                title: 'SEE THE LOGS'
            }); */

            res.json(signs);

        }
    });
   
}

exports.renderPreviousVitalSignsVisitPage2 = function (req, res) {

    // Use the 'response' object to render the 'add_user' view with a 'title' property

    var patientName = req.body.patient;
    console.log('patient name is', patientName);

    ////////making changes here*************************************
    VitalSigns.find({
        patient: req.body.patient //finding a document by email from comments
    }, (err, user) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.user' property
            req.user = user;
            //parse it to a JSON object
            var jsonUser = JSON.parse(JSON.stringify(user));
            console.log(jsonUser);
            console.log("rendering to page visit2");
            //display edit page and pass user properties to it
            console.log(jsonUser);
            res.render('previousClinicalVisit2', { title: 'Previous visit data', "user":jsonUser });
           // res.json(jsonUser);
            // Call the next middleware
           // next();
        }
    });

    


    /*   res.render('previousClinicalVisit', {
           title: 'Select Patient Name to check records!!!!'
       }); */
    //you may also render an html form
    //res.render('add_user.html');
};



exports.renderPreviousVitalSignsVisitPage = function (req, res) {

    // Use the 'response' object to render the 'add_user' view with a 'title' property

    User.find({}).exec(function (err, users) {
        if (err) throw err;
        res.render('previousClinicalVisit', { title: 'Select Patient Name to check records', "users": users });
    });


 /*   res.render('previousClinicalVisit', {
        title: 'Select Patient Name to check records!!!!'
    }); */
    //you may also render an html form
    //res.render('add_user.html');
};

// Create a new 'render' controller method
exports.render = function(req, res) {
	// If the session's 'lastVisit' property is set, print it out in the console 
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}

	// Set the session's 'lastVisit' property
	req.session.lastVisit = new Date();

	// Use the 'response' object to render the 'index' view with a 'title' property
	res.render('index', {
		title: 'CRUD Operations using Mongoose'
	});
};




exports.renderVitalSignsPage = function (req, res) {


    // Use the 'response' object to render the 'index' view with a 'title' property


    User.find({}).exec(function (err, users) {
        if (err) throw err;
        res.render('vitalSigns', { title: 'Vital Signs Page', "users": users });
    });

   /* res.render('vitalSigns', {
        title: 'Vital Signs Page'
    });  */
};


exports.renderAddUser = function (req, res) {
    
    // Use the 'response' object to render the 'add_user' view with a 'title' property
    res.render('signup', {
        title: 'Sign Up Page!!!!'
    });
    //you may also render an html form
    //res.render('add_user.html');
};

exports.renderReadUser = function (req, res) {

    // Use the 'response' object to render the 'read_user' view with a 'title' property
    res.render('login', {
        title: 'login user by username'
    });
};

exports.renderNurseSignUp = function (req, res) {

    // Use the 'response' object to render the 'read_user' view with a 'title' property
    res.render('nurseSignup', {
        title: 'Sign Up Nurse!!'
    });
};
exports.renderPatientSignUp = function (req, res) {

    // Use the 'response' object to render the 'read_user' view with a 'title' property
    res.render('patientSignup', {
        title: 'Sign Up Patient!!'
    });
};
exports.renderPatientLogin = function (req, res) {

    // Use the 'response' object to render the 'read_user' view with a 'title' property
    res.render('patientLogin', {
        title: 'Login Patient!!'
    });
};
exports.renderNurseLogin = function (req, res) {

    // Use the 'response' object to render the 'read_user' view with a 'title' property
    res.render('nurseLogin', {
        title: 'Login Nurse!!'
    });
};


                