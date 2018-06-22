import mongoose from 'mongoose';

const { Schema } = mongoose;

const User = new Schema({
  name: String,
  email: String,
  thumbnail: String,
  accessToken: String,
  refreshToken: String,
  myPlayList: Array,
});

User.statics.findByEmail = function (email) {
  return this
    .findOne({ email })
    .exec();
};

User.statics.findByName = function (name) {
  return this
    .findOne({ name })
    .exec();
};

User.statics.updateUser = function ({
  name, email, thumbnail, accessToken,
}) {
  console.log('update');
  return this.findOneAndUpdate({ email }, {
    $set: {
      name,
      thumbnail,
      accessToken,
    }
  }).exec();
};

User.statics.signUp = async function ({
  name, email, thumbnail, accessToken, refreshToken,
}) {
  console.log('sign up');
  return this.create({
    name, email, thumbnail, accessToken, refreshToken
  });
};

module.exports = mongoose.model('User', User);