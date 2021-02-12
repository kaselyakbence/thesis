const mongoose = require("mongoose");

const { toHash, compare } = require("../utils/Password");

//Creating the User schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  //Creating JSON from a User instance excludes sensible data
  {
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

const User = mongoose.model("User", userSchema);

module.exports = User;
