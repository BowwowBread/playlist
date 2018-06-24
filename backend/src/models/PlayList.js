import mongoose from 'mongoose';

const { Schema } = mongoose;

const PlayList = new Schema({
  id: String,
  channelId: String,
  channelTitle: String,
  description: String,
  date: Date,
  title: String,
  thumbnail: String,
  shared: Boolean,
  category: Array,
});

PlayList.statics.findAll = function () {
  return this.find().exec();
};

PlayList.statics.findById = function (id) {
  return this
    .findOne({ id })
    .exec();
};

PlayList.statics.share = function ({
  id, channelId, channelTitle, description, date, title, thumbnail, category, shared
}) {
  return this.create({
    id, channelId, channelTitle, description, date, title, thumbnail, category, shared
  });
};

module.exports = mongoose.model('PlayList', PlayList);