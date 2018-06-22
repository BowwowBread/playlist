import mongoose from 'mongoose';

const { Schema } = mongoose;

const PlayList = new Schema({
  id: String,
  channelId: String,
  channelTitle: String,
  description: String,
  date: Date,
  title: String,
  thumbnail: String
});

PlayList.statics.findAll = function () {
  return this.find().exec();
};

PlayList.statics.findById = function (id) {
  return this
    .findOne({ id })
    .exec();
};

PlayList.statics.upload = async function ({
  id, channelId, channelTitle, description, date, title, thumbnail
}) {
  console.log('upload playlist');
  return this.create({
    id, channelId, channelTitle, description, date, title, thumbnail
  });
};

module.exports = mongoose.model('PlayList', PlayList);