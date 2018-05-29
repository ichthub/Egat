const mongoose = require('mongoose');

const { Schema } = mongoose;
// the schema of a collection
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});
mongoose.model('users', userSchema);
