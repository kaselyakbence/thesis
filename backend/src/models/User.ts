import mongoose from "mongoose";

import { Password } from "../utils/password";

//Interface for User
interface UserAttrs {
  email: string;
  nick_name: string;
  first_name?: string;
  last_name?: string;
  dob?: Date;
  password: string;
  friends?: [mongoose.Types.ObjectId];
  rooms?: [any];
  dues?: [any];
}

//Interface for UserModel
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
  addFriend(id: string): UserModel;
  getFriends(): UserModel;
}

//Interface for the properties of User Document
export interface UserDoc extends mongoose.Document {
  email: string;
  nick_name: string;
  first_name?: string;
  last_name?: string;
  dob?: Date;
  password: string;
  friends?: [mongoose.Types.ObjectId];
  rooms?: [any];
  dues?: [any];
  addFriend(id: string): UserModel;
  getFriends(): UserModel;
}

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
    dob: {
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
    events: [
      {
        type: mongoose.Types.ObjectId,
        ref: "event",
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
    const hashed = await Password.toHash(this.get("password"));

    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.methods.addFriend = function (id: string) {
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

const User = mongoose.model<UserDoc, UserModel>("user", userSchema);

export { User };
