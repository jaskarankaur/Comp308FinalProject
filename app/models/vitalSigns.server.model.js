// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Define a new 'UserSchema'
const UserSchema = new Schema({
    bodyTemperature: String,
    heartRate: String,
    bloodPressure:String,
    respiratoryRate: String,

    patient: String
   
   
});

mongoose.model('VitalSigns', UserSchema);