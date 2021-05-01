import mongoose from "mongoose";

import { Password } from "../utils/password";

import { EventType } from "./Event";

//Interface for User
interface UserAttrs {
  email: string;
  nick_name: string;
  first_name?: string;
  last_name?: string;
  password: string;
  is_public?: boolean;
}

//Interface for UserModel
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
  addFriend(nick_name: string): Promise<UserModel>;
  getFriends(): Promise<UserModel>;
  getRequests(): Promise<any[]>;
}

//Interface for the properties of User Document
export interface UserDoc extends mongoose.Document {
  email: string;
  nick_name: string;
  first_name?: string;
  last_name?: string;
  password: string;
  friends?: [{ type: mongoose.Types.ObjectId; ref: "user" }];
  rooms?: [
    {
      type: mongoose.Types.ObjectId;
      ref: "room";
    }
  ];
  dues?: [any];
  is_public: boolean;
  addFriend(nick_name: string): Promise<UserModel>;
  getFriends(): Promise<{ friends: { nick_name: string }[] }>;
  getRequests(): Promise<{
    events: [
      {
        pubId: string;
        type: EventType;
        owner: mongoose.Types.ObjectId;
        from: mongoose.Types.ObjectId;
      }
    ];
  }>;
  visit(): Promise<
    | {
        nick_name: string;
        email: string;
        first_name?: string;
        last_name?: string;
      }
    | { nick_name: string; isPublic: boolean }
  >;
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
    rooms: [
      {
        type: mongoose.Types.ObjectId,
        ref: "room",
      },
    ],
    dues: [],
    is_public: {
      type: Boolean,
      default: true,
      require: true,
    },
  },

  {
    //Creating JSON from a User instance excludes sensible data
    toJSON: {
      transform: function (doc, ret) {
        //ret.id = ret._id;
        delete ret._id;

        delete ret.password;
        delete ret.__v;
      },
    },
    //Creating an Object from a User instance excludes sensible data
    toObject: {
      transform: function (doc, ret) {
        //ret.id = ret._id;
        delete ret._id;

        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.index({ email: 1, nick_name: 1 }, { name: "index" });

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

userSchema.methods.visit = async function () {
  if (this.get("is_public")) {
    return {
      nick_name: this.get("nick_name"),
      email: this.get("email"),
      first_name: this.get("first_name"),
      last_name: this.get("last_name"),
    };
  } else {
    return {
      nick_name: this.get("nick_name"),
      isPublic: false,
    };
  }
};

userSchema.methods.addFriend = async function (uid: string) {
  await User.findByIdAndUpdate(uid, {
    $push: { friends: this.id },
  }).exec();

  return this.updateOne({
    $push: { friends: uid },
  }).exec();
};

userSchema.methods.getFriends = function () {
  return User.findOne({ _id: this.id }, { friends: 1 }).populate("friends", "nick_name").exec();
};

userSchema.methods.getRequests = async function () {
  return User.findById(this.id, "events")
    .populate({
      path: "events",
      select: ["pubId", "owner", "from", "type"],
      populate: {
        path: "from",
        model: "user",
        select: "nick_name",
      },
    })
    .exec();
};

const User = mongoose.model<UserDoc, UserModel>("user", userSchema);

export { User };
