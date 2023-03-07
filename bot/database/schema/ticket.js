const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
  guildId: String,
  userId: String,
  ticketCount: { type: Number, default: 0 }
});

module.exports = model('ticket', ticketSchema, 'TicketData');
