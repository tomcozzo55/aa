const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
  guildId: String,
  userId: String,
  inventory: Array,
  wallet: Number,
  bank: Number,
  createdAt: Date,
  beggedAt: Date,
  dailyAt: Date,
  monthlyAt: Date,
  reputation: Number,
  thanks: Number
});

module.exports = model('profile', profileSchema, 'Profiles');
