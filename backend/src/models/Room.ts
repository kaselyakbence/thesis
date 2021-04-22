import mongoose from "mongoose";

import { nanoid } from "nanoid";

import { User } from "./User";

//Interface for Room
interface RoomAttrs {
  owner: string;
  name: string;
  description?: string;
}

//Interface for RoomModel
interface RoomModel extends mongoose.Model<any> {
  build(attrs: RoomAttrs): RoomDoc;
  visit(): {
    participants: { nick_name: string }[];
    owner: { nick_name: string };
    name: string;
    description: string;
  };
  addUser(uid: string): Promise<any>;
}

//Interface for the properties of Room Document
export interface RoomDoc extends mongoose.Document {
  name: string;
  description: string;
  owner: string;
  admins: string[];
  visit(): {
    participants: { nick_name: string }[];
    owner: { nick_name: string };
    name: string;
    description: string;
  };
  addUser(uid: string): Promise<any>;
}

//Creating the Room schema
const roomSchema = new mongoose.Schema(
  {
    pubId: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    description: { type: String },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: true,
    },
    admins: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    participants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    dues: [
      {
        type: mongoose.Types.ObjectId,
        ref: "due",
      },
    ],
  },
  {
    //Creating JSON from a Room instance excludes sensible data
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;

        delete ret.__v;
      },
    },
    //Creating an Object from a Room instance excludes sensible data
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;

        delete ret.__v;
      },
    },
  }
);

roomSchema.pre("save", async function (done) {
  if (this.isNew) {
    await User.findByIdAndUpdate(this.get("owner"), {
      $push: { rooms: this.get("_id") },
    }).exec();
  }
  done();
});

roomSchema.statics.build = (attrs: RoomAttrs) => {
  return new Room({
    pubId: nanoid(),
    admins: [attrs.owner],
    participants: [attrs.owner],
    ...attrs,
  });
};

roomSchema.methods.visit = async function () {
  return Room.findOne({ _id: this.id }, { name: 1, description: 1 })
    .populate("participants", "nick_name")
    .populate("owner", "nick_name")
    .exec();
};

roomSchema.methods.addUser = async function (uid: string) {
  await User.findByIdAndUpdate(uid, {
    $push: { rooms: this.get("id") },
  }).exec();

  return this.updateOne({
    $push: { participants: uid },
  }).exec();
};

const Room = mongoose.model<RoomDoc, RoomModel>("room", roomSchema);

export { Room };
