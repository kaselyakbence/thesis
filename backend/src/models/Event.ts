import mongoose from "mongoose";

import { nanoid } from "nanoid";

import { User, UserDoc } from "./User";
import { Room, RoomDoc } from "./Room";

export type EventType = "FRIEND_REQUEST" | "PARTICIPATION_REQUEST";

//Interface for Event
interface EventAttrs {
  type: EventType;
  owner: mongoose.Types.ObjectId;
  payload?: string;
  from?: mongoose.Types.ObjectId;
  to?: mongoose.Types.ObjectId;
}

//Interface for EventModel
interface EventModel extends mongoose.Model<any> {
  build(attrs: EventAttrs): EventDoc;
  buildFriendRequest(
    owner: mongoose.Types.ObjectId,
    friend: mongoose.Types.ObjectId
  ): EventDoc;
  buildParticipationRequest(
    roomId: mongoose.Types.ObjectId,
    from: mongoose.Types.ObjectId,
    to: mongoose.Types.ObjectId
  ): EventDoc;
  accept(): Promise<any>;
  reject(): Promise<any>;
}

//Interface for the properties of Event Document
interface EventDoc extends mongoose.Document {
  pubId: string;
  type: string;
  owner: string;
  from: string;
  to?: string;
  payload?: string;
  accept(): Promise<any>;
  reject(): Promise<any>;
}

//Creating the Event schema
const eventSchema = new mongoose.Schema(
  {
    pubId: {
      type: String,
      require: true,
      unique: true,
    },
    type: {
      type: String,
      require: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    payload: {
      type: String,
    },
    from: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    to: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
    //Creating JSON from a Event
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;

        delete ret.__v;
      },
    },
    //Creating an Object from a Event
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;

        delete ret.__v;
      },
    },
  }
);

eventSchema.pre("save", async function (done) {
  if (this.isNew) {
    await User.findByIdAndUpdate(this.get("to"), {
      $push: { events: this.id },
    }).exec();
  }
  done();
});

eventSchema.pre("remove", async function (done) {
  await User.findByIdAndUpdate(this.get("to"), {
    $pull: { events: this.id },
  }).exec();
  done();
});

eventSchema.statics.build = (attrs: EventAttrs) => {
  return new Event({ pubId: nanoid(), ...attrs });
};

eventSchema.statics.buildFriendRequest = (
  owner: mongoose.Types.ObjectId,
  to: mongoose.Types.ObjectId
) => {
  return Event.build({ type: "FRIEND_REQUEST", owner, from: owner, to });
};

eventSchema.statics.buildParticipationRequest = (
  roomId: mongoose.Types.ObjectId,
  from: mongoose.Types.ObjectId,
  to: mongoose.Types.ObjectId
) => {
  return Event.build({
    type: "PARTICIPATION_REQUEST",
    owner: roomId,
    from,
    to,
  });
};

eventSchema.methods.accept = async function () {
  switch (this.get("type")) {
    case "FRIEND_REQUEST":
      const user = (await User.findById(this.get("owner")).exec()) as UserDoc;
      user.addFriend(this.get("to"));
      return this.remove();
    case "PARTICIPATION_REQUEST":
      const room = (await Room.findById(this.get("owner")).exec()) as RoomDoc;
      room.addUser(this.get("to"));
      return this.remove();
  }
};

eventSchema.methods.reject = function () {
  return this.remove();
};

const Event = mongoose.model<EventDoc, EventModel>("event", eventSchema);

export { Event };
