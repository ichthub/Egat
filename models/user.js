const mongoose = require('mongoose');

// define the schema of every record

const { Schema } = mongoose; // destruction
// the schema of a collection
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});
// users => collection + userschema => column
mongoose.model('users', userSchema);
