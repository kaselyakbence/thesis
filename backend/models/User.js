const mongoose = require("mongoose");

const { toHash, compare } = require("../utils/password");

//Creating the User schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    nick_name: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    birth_day: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
    },
    friends: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    rooms: [],
    dues: [],
  },

  {
    //Creating JSON from a User instance excludes sensible data
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;

        delete ret.password;
        delete ret.__v;
      },
    },
    //Creating an Object from a User instance excludes sensible data
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;

        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

//Before a User is saved or updated encrypts the password property
userSchema.pre("save", async function (done) {
  if (this.isDirectModified("password")) {
    const hashed = await toHash(this.get("password"));

    this.set("password", hashed);
  }
  done();
});

userSchema.methods.addFriend = function (id) {
  User.findByIdAndUpdate(id, {
    $push: { friends: this.id },
  }).exec();
  return this.updateOne({
    $push: { friends: id },
  }).exec();
};

userSchema.methods.getFriends = function () {
  return User.findOne({ _id: this.id }, { friends: 1 })
    .populate("friends", "nick_name")
    .exec();
};

const User = mongoose.model("user", userSchema);

module.exports = User;
