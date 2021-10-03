const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/user/avatars");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    firendships: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friendship",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
//statics methods
userSchema.statics.updloadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
userSchema.statics.avatarPath = AVATAR_PATH;
const User = mongoose.model("User", userSchema);
module.exports = User;
