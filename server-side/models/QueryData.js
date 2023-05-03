import mongoose from "mongoose";


const queryDataSchema = new mongoose.Schema({
    step: {
        type: Int16Array,
        required: [true, "Please enter time step"],
      },
      amount: {
        type: Number,
        required: [true, "Please enter amt"],
      },
      oldbalanceOrg: {
        type: Number,
        required: [true, "Please enter amt"],
      },
      oldbalanceDest: {
        type: Number,
        required: [true, "Please enter amt"],
      },
      origBalance_inacc: {
        type: Number,
        required: [true, "Please enter amt"],
      },
      destBalance_inacc: {
        type: Number,
        required: [true, "Please enter amt"],
      },
      type_CASH_OUT: {
        type: Int16Array,
        required: [true, "Please enter transaction type"],
        min: [0, "bw 0 and 1"],
        max: [1, "bw 0 and 1"],
      },      
      type_TRANSFER: {
        type: Int16Array,
        required: [true, "Please enter transaction type"],
        min: [0, "bw 0 and 1"],
        max: [1, "bw 0 and 1"]
      },
});


const QueryData = mongoose.model("QueryData", queryDataSchema);
export default QueryData;