import mongoose from "mongoose";

const queryDataSchema = new mongoose.Schema({
    user_id : {
        type: String,
        required: true
    },
    alias: {
      type: String,
      required: [true, "Please enter an alias for your query"]
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
});


const QueryData = mongoose.model("QueryData", queryDataSchema);
export default QueryData;