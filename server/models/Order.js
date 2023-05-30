const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  uploads: {
    type: Schema.Types.ObjectId,
    ref: 'Upload',
    required: true
  }
    
  
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
