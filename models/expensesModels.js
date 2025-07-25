import mongoose from 'mongoose';

// Define the schema
const itemSchema = new mongoose.Schema({
  food: {
    type: String,
    required: true,
  },
  general: {
    type: String,
    required: true,
  },
  dairy: {
    type: String,
    required: true,
  },
  spoon: {
    type: String,
    required: true,
  },
  plates: {
    type: String,
    required: true,
  },
  glass: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  
},
{ timestamps: true });

// Create a model using the schema
const Item = mongoose.model('Item', itemSchema);

export default Item;
