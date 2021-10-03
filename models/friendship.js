const mongoose = require("mongoose");
const friendshipSchema = new mongoose.Schema(
  {
    from_user: {
      type: mongoose.Schema.ObjectId,
    },
    to_user: {
      type: mongoose.Schema.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);
const Friendship = mongoose.model("Friendship", friendshipSchema);
module.exports = Friendship;
