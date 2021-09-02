const mongoose = require('mongoose');

const userDetailSchema = new mongoose.Schema({
    name:{
        type: String, required: true, minLength: 6, lowercase: true },
    phone:{
        type: String, required: true, minLength: 12, },
    address:{
        type: String, required: true, minLength: 6, lowercase: true },
    age:{
        type: Number, required: true, min: 1, },
})

const userDetails = mongoose.model('UserDetails',userDetailSchema)

const userSchema = new mongoose.Schema({
    username: {
        type: String, required: true, minLength: 5, trim: true, lowercase: true },
    password:{
        type: String, required: true, minLength: 5, trim: true, lowercase: true },
    userType: {
        type: String, required: true, enum: ['customer','admin']
    },
    details:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'      //Name of target collection
    }
});

const User = mongoose.model('Users',userSchema);

module.exports.User = User;
module.exports.userDetails = userDetails;