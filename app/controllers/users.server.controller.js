// Load the 'User' Mongoose model
const User = require('mongoose').model('User');
const Nurse = require('mongoose').model('Nurse');


const passport = require('passport');

// 'create' controller method to create a new user    



exports.createNurse = function (req, res, next) {
    // Create a new instance of the 'User' Mongoose model
    const user = new Nurse(req.body);

    // Use the 'User' instance's 'save' method to save a new user document
    user.save((err) => {
        if (err) {
            // Call the next middleware with an error message
            console.log("object is " + req.body.firstName);
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.render('nurseLogin', { title: 'Nurse Login Page' });

            //res.json(user);

        }
    });
};



exports.create = function(req, res, next) {
	// Create a new instance of the 'User' Mongoose model
	const user = new User(req.body);

	// Use the 'User' instance's 'save' method to save a new user document
	user.save((err) => {
		if (err) {
            // Call the next middleware with an error message
            console.log("object is "+req.body.role);
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
            res.render('patientLogin', { title: 'Patient Login Page'});

            //res.json(user);
         
		}
	});
};

//add comments into comment table
exports.createComment = function (req, res, next) {

   

        let newComment = ({
            "content": req.body.comment,
            "email": req.body.email,
       
    });

        comment.create(newComment, (err, comment) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/');
        }
    });



    // Create a new instance of the 'User' Mongoose model
    const userComment = new Comment(req.body);

    // Use the 'User' instance's 'save' method to save a new user document
    user.save((err) => {
        if (err) {
            // Call the next middleware with an error message
            console.log("object is " + req.body.comment);
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(userComment);

        }
    });
};




// 'list' controller method to display all users in raw json format
exports.list = function(req, res, next) {
	// Use the 'User' static 'find' method to retrieve the list of users
	User.find({}, (err, users) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
			res.json(users);
		}
	});
};

// 'display' controller method to display all users in friendly format
exports.display = function (req, res, next) {
    // Use the 'User' static 'find' method to retrieve the list of users
    User.find({}, (err, users) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.render('listall', {
                title: 'List All Users',
                users: users
            });
        }
    });
};

//display all the comments
exports.displayComments = function (req, res, next) {
    // Use the 'User' static 'find' method to retrieve the list of users
    Comment.find({}, (err, comments) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.render('listAllComments', {
                title: 'List All Comments',
                comments: comments
            });
        }
    });
};
//
// 'display' controller method to display all users in friendly format
exports.showDeletePage = function (req, res) {
    
    // Use the 'response' object to show the delete_user page
    res.render('delete_user', {
        title: 'Delete User' });
        
};

// 'read' controller method to display a user
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.user);
};

// 'update' controller method to update a user based on id
exports.update = function (req, res, next) {
    req.user=req.body //read the user from request's body
    console.log(req.user)
	// Use the 'User' static 'findByIdAndUpdate' method to update a specific user
	User.findByIdAndUpdate(req.user.id, req.body, (err, user) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
			//res.json(user);
            res.redirect('/users') //display all users
		}
	})
};

//update a user by username
exports.updateByUsername = function (req, res, next) {
    req.user = req.body //read the user from request's body
    console.log(req.user)
    //initialize findOneAndUpdate method arguments
    var query = { "username": req.user.username };
    var update = req.body;
    var options = { new: true };

    // Use the 'User' static 'findOneAndUpdate' method to update a specific user by user name
    User.findOneAndUpdate(query, update, options, (err, user) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            //res.json(user);
            res.redirect('/users') //display all users
        }
    })
};


// 'delete' controller method to delete a user
exports.delete = function(req, res, next) {
	// Use the 'User' instance's 'remove' method to delete user document
	req.user.remove((err) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
			res.json(req.user);
		}
	})
};

//delete user by username
exports.deleteByUserName = function (req, res, next) {
    //
    console.log(req.body.username);
    User.findOneAndRemove({
        username: req.body.username
    }, function (err, user) {

        if (err) throw err;

        console.log("Success");

    });

    res.redirect('/display');


};
// 'userByID' controller method to find a user by its id or username
//  the code is using the username field instead of id
exports.userByID = function (req, res, next, username) {
	// Use the 'User' static 'findOne' method to retrieve a specific user
	User.findOne({
		username: username //using the username instead of id
	}, (err, user) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.user' property
            req.user = user;
            console.log(user);
			// Call the next middleware
			next();
		}
	});
};

// 'userByUsername' controller method to find a user by its username
// and display the result in edit.ejs file
exports.userByUsername = function (req, res, next) {

    // Create a new instance of the 'User' Mongoose model
   // const user = new User(req.body);

    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            console.log("user in if err !user " + user);
            res.status(400).send(info);
        } else {
            console.log("in else " + user);
            // Remove sensitive data before login
           // user.password = undefined;
           // user.salt = undefined;

            // Use the Passport 'login' method to login
            console.log("logging the new user in ");
            req.login(user, (err) => {
                if (err) {
                    console.log("error in login method beerey");
                    res.status(400).send(err);
                } else {
                    console.log("Successful login *********************************beerey ");
                    res.render('ThankYouProject', { title: 'Patient Logged In'});

                    //res.json(user);
                }
            });
        }
    })(req, res, next);

    /*



    // Use the 'User' static 'findOne' method to retrieve a specific user
    var username = req.body.email;
    console.log(username)
    User.findOne({
        email: username //finding a document by username
    }, (err, user) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.user' property
            req.user = user;
            //parse it to a JSON object
            var jsonUser = JSON.parse(JSON.stringify(user));
            console.log(jsonUser)
            //display edit page and pass user properties to it
            res.render('ThankYouProject', { title: 'Patient Logged In', user: jsonUser} );

            // Call the next middleware
            next();
        }
    });   */
};


// 'userByUsername' controller method to find a user by its username
// and display the result in edit.ejs file
exports.nurseByUsername = function (req, res, next) {
    // Use the 'User' static 'findOne' method to retrieve a specific user
    var username = req.body.email;
    console.log(username)
    User.findOne({
        email: username //finding a document by username
    }, (err, user) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.user' property
            req.user = user;
            //parse it to a JSON object
            var jsonUser = JSON.parse(JSON.stringify(user));
            console.log(jsonUser)
            //display edit page and pass user properties to it
            res.render('ThankYouProject', { title: 'Nurse Login', user: jsonUser });

            // Call the next middleware
            next();
        }
    });
};




// input comments per user in comment collection
exports.commentByUsername = function (req, res, next) {
    let email = req.body.email;
    let comm = req.body.comment;


    var comment1 = new Comment({
       
        content: comm
        , email:  email
    });


    comment1.save((err) => {
        if (err) {
            // Call the next middleware with an error message
            console.log("object is " + req.body.comm + " json object is " + comment1);
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            console.log("object is " + req.body.comm + " json object is " + comment1);
           // res.json(comment1);

            ////////making changes here*************************************
            Comment.find({
                email: req.body.email //finding a document by email from comments
            }, (err, user) => {
                if (err) {
                    // Call the next middleware with an error message
                    return next(err);
                } else {
                    // Set the 'req.user' property
                    req.user = user;
                    //parse it to a JSON object
                    var jsonUser = JSON.parse(JSON.stringify(user));
                    console.log(jsonUser)
                    //display edit page and pass user properties to it
                    res.render('thankYou', { title: 'Your Comments...', user: jsonUser });

                    // Call the next middleware
                    next();
                }
            });

            /////////////////////////*******************************************
          /*  res.render('thankYou', {
                title: 'Thank You Page'
            }); */

        }
    });

  
};