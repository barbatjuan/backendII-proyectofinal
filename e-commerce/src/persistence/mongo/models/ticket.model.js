import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ticketCollection = "ticket";

const ticketSchema = new mongoose.Schema({
  // id: autogenerado por MongoDB
  code: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String,
    required: true
  }
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
