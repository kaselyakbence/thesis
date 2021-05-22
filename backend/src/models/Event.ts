import mongoose from "mongoose";

import { nanoid } from "nanoid";

import { User, UserDoc } from "./User";
import { Room, RoomDoc } from "./Room";
import { Due, DueDoc } from "./Due";

export type EventType = "FRIEND_REQUEST" | "PARTICIPATION_REQUEST" | "LENT_REQUEST";

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
  buildFriendRequest(owner: mongoose.Types.ObjectId, friend: mongoose.Types.ObjectId): EventDoc;
  buildParticipationRequest(
    roomId: mongoose.Types.ObjectId,
    from: mongoose.Types.ObjectId,
    to: mongoose.Types.ObjectId,
    roomPubId: string
  ): EventDoc;
  buildLendRequest(
    dueId: mongoose.Types.ObjectId,
    from: mongoose.Types.ObjectId,
    to: mongoose.Types.ObjectId,
    duePubId: string
  ): EventDoc;
  accept(): Promise<any>;
  reject(): Promise<any>;
}

//Interface for the properties of Event Document
export interface EventDoc extends mongoose.Document {
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
    //The etity that produced the event
    owner: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    payload: {
      type: String,
    },
    //The user the event was produced by
    from: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    //The user targeted accept or decline required
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
      $push: {
        events: {
          pubId: this.get("pubId"),
          type: this.get("type"),
          from: (await User.findById(this.get("from")).select("nick_name").exec()).nick_name,
          payload: this.get("payload"),
        },
      },
    }).exec();
  }
  done();
});

eventSchema.pre("remove", async function (done) {
  await User.findByIdAndUpdate(this.get("to"), {
    $pull: {
      events: {
        pubId: this.get("pubId"),
        type: this.get("type"),
        from: (await User.findById(this.get("from")).select("nick_name").exec()).nick_name,
      },
    },
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
  to: mongoose.Types.ObjectId,
  roomPubId: string
) => {
  return Event.build({
    type: "PARTICIPATION_REQUEST",
    owner: roomId,
    from,
    to,
    payload: roomPubId,
  });
};

eventSchema.statics.buildLendRequest = (
  dueId: mongoose.Types.ObjectId,
  from: mongoose.Types.ObjectId,
  to: mongoose.Types.ObjectId,
  duePubId: string
) => {
  return Event.build({
    type: "LENT_REQUEST",
    owner: dueId,
    from,
    to,
    payload: duePubId,
  });
};

eventSchema.methods.accept = async function () {
  switch (this.get("type")) {
    case "FRIEND_REQUEST":
      {
        const user = (await User.findById(this.get("owner")).exec()) as UserDoc;
        user.addFriend(this.get("to"));
      }
      return this.remove();
    case "PARTICIPATION_REQUEST": {
      const room = (await Room.findById(this.get("owner")).exec()) as RoomDoc;
      room.addUser(this.get("to"));
      return this.remove();
    }
    case "LENT_REQUEST": {
      const due = (await Due.findById(this.get("owner")).exec()) as DueDoc;
      due.activate();
      return this.remove();
    }
  }
};

eventSchema.methods.reject = function () {
  return this.remove();
};

const Event = mongoose.model<EventDoc, EventModel>("event", eventSchema);

export { Event };
