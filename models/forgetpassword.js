const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    accsesToken: {
      type: String,
      require: true,
    },
    isValid: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const ForgetPassword = mongoose.model("ForgetPassword", passwordSchema);
module.exports = ForgetPassword;
