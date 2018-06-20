import mongoose from 'mongoose';

const { Schema } = mongoose;

const User = new Schema({
  userInfo: {
    name: String,
    email: String,
    thumbnail: String,
    accessToken: String,
  }
});

User.statics.findByEmail = function (email) {
  return this.findOne({ email }).exec();
};

User.statics.findByName = function (name) {
  return this.findOne({ name }).exec();
};

User.statics.signUp = async function ({
  name, email, thumbnail, accessToken
}) {
  const user = new this({
    name,
    email,
    thumbnail,
    accessToken,
  });

  return user.save();
};

module.exports = mongoose.model('User', User);