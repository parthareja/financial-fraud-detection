import mongoose from "mongoose";

const queryDataSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    // unique:true,
    required: [true, "Alias is a compulsary unique identifier"],
  },
  step: {
    type: Number,
    required: [true, "Please enter time step"],
  },
  amount: {
    type: Number,
    required: [true, "Please enter amt"],
  },
  oldbalanceOrg: {
    type: Number,
    required: [true, "Please enter Old Origin Balance"],
  },
  oldbalanceDest: {
    type: Number,
    required: [true, "Please enter Old Destination Balance"],
  },
  newbalanceOrg: {
    type: Number,
    required: [true, "Please enter New Origin Balance"],
  },
  newbalanceDest: {
    type: Number,
    required: [true, "Please enter New Destination Balance"],
  },
  origBalance_inacc: {
    type: Number,
    required: [true, "Origin Balance Innaccuracy not calculated"],
  },
  destBalance_inacc: {
    type: Number,
    required: [true, "Destination Balance Inaccuracy not calculated"],
  },
  type_CASH_OUT: {
    type: Number,
    required: [true, "Please enter transaction type"],
  },
  type_TRANSFER: {
    type: Number,
    required: [true, "Please enter transaction type"],
  },
  ml_classification: {
    type: Boolean,
    required: [true, "Please enter classification result"],
  },
});

const QueryData = mongoose.model("QueryData", queryDataSchema);
export default QueryData;
