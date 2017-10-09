const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
let messageSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: 0, 
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: true
  }
});

autoIncrement.initialize(mongoose.connection);
messageSchema.plugin(autoIncrement.plugin, {
  model: 'messageSchema',
  field: 'id',
  startAt: 1,
  incrementBy: 1
});
module.exports = mongoose.model('messageSchema', messageSchema);
