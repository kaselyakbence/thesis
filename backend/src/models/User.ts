import mongoose from "mongoose";

import { Password } from "../utils/password";

import { EventType } from "./Event";

export interface UserDue {
  name: string;
  balance: number;
  from: string;
  payload: string;
}

interface UserEvent {
  pubId: string;
  type: string;
  from: string;
  payload?: string;
}

//Interface for User
interface UserAttrs {
  email: string;
  nick_name: string;
  first_name?: string;
  last_name?: string;
  password: string;
}

//Interface for UserModel
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
  addFriend(nick_name: string): Promise<UserModel>;
  getFriends(): Promise<UserModel>;
  getRequests(): Promise<{
    events: UserEvent[];
  }>;
  getDues(): UserDue[];
  getDues(): UserDue[];
  setPublic(is_public: boolean): void;
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
  events: UserEvent[];
  dues?: any[];
  is_public: boolean;
  addFriend(nick_name: string): Promise<UserModel>;
  getFriends(): Promise<{ friends: { nick_name: string }[] }>;
  getRequests(): Promise<{
    events: [
      {
        pubId: string;
        type: EventType;
        from: mongoose.Types.ObjectId;
        payload?: string;
      }
    ];
  }>;
  getDues(): UserDue[];
  visit(): Promise<
    | {
        nick_name: string;
        email: string;
        first_name?: string;
        last_name?: string;
      }
    | { nick_name: string; isPublic: boolean }
  >;
  setPublic(is_public: boolean): void;
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
        pubId: {
          type: String,
          require: true,
        },
        type: {
          type: String,
          require: true,
        },
        from: {
          type: String,
          require: true,
        },
        balance: {
          type: Number,
        },
        payload: {
          type: String,
        },
      },
    ],
    rooms: [
      {
        type: mongoose.Types.ObjectId,
        ref: "room",
      },
    ],
    dues: [
      {
        _id: false,
        pubId: { type: String, require: true },
        name: {
          type: String,
          require: true,
        },
        balance: {
          type: Number,
        },
        from: {
          type: String,
        },
      },
    ],
    is_public: {
      type: Boolean,
      require: true,
    },
  },

  {
    //Creating JSON from a User instance excludes sensible data
    toJSON: {
      transform: function (_, ret) {
        delete ret._id;

        delete ret.password;
        delete ret.__v;
      },
    },
    //Creating an Object from a User instance excludes sensible data
    toObject: {
      transform: function (_, ret) {
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
  return new User({ ...attrs, is_public: true });
};

userSchema.methods.visit = async function () {
  if (this.get("is_public")) {
    return User.findById(this.get("id"))
      .select("nick_name email first_name last_name friends is_public")
      .populate("friends", "nick_name")
      .exec();
  } else {
    return {
      nick_name: this.get("nick_name"),
      is_public: false,
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
  return User.findById(this.id, "events").exec();
};

userSchema.methods.getDues = async function () {
  return User.findById(this.id, "dues").exec();
};

userSchema.methods.setPublic = async function (is_public: boolean) {
  this.set("is_public", is_public);
  await this.save();
};

const User = mongoose.model<UserDoc, UserModel>("user", userSchema);

export { User };
