import mongoose from "mongoose";


const journalSchema = new mongoose.Schema({

  title: String,

  desc: String,

  content: String,

  isFavorite: {
    type: Boolean,
    default: false,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
},

  { timestamps: true }

);

const journals = mongoose.model('journals', journalSchema);




export default journals;
