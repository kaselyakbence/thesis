import mongoose from "mongoose";
import { User, UserDoc } from "./User";

type EventType = "FRIEND_REQUEST";

//Interface for Event
interface EventAttrs {
  type: EventType;
  owner: string;
  payload?: string;
  to: string;
}

//Interface for EventModel
interface EventModel extends mongoose.Model<any> {
  build(attrs: EventAttrs): EventDoc;
  buildFriendRequest(owner: string, friend: string): EventDoc;
  accept(): Promise<any>;
  reject(): Promise<any>;
}

//Interface for the properties of Event Document
interface EventDoc extends mongoose.Document {
  type: string;
  owner: string;
  to?: string;
  payload?: string;
  accept(): Promise<any>;
  reject(): Promise<any>;
}

//Creating the Event schema
const eventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      require: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    payload: {
      type: String,
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
        ret.id = ret._id;
        delete ret._id;

        delete ret.__v;
      },
    },
    //Creating an Object from a Event
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;

        delete ret.__v;
      },
    },
  }
);

eventSchema.pre("save", async function (done) {
  if (this.isNew) {
    switch (this.get("type")) {
      case "FRIEND_REQUEST":
        await User.findByIdAndUpdate(this.get("to"), {
          $push: { events: this.id },
        });
    }
  }
  done();
});

eventSchema.pre("remove", async function (done) {
  await User.findByIdAndUpdate(this.get("owner"), {
    $pull: { events: this.id },
  });
  await User.findByIdAndUpdate(this.get("to"), {
    $pull: { events: this.id },
  });
  done();
});

eventSchema.statics.build = (attrs: EventAttrs) => {
  return new Event(attrs);
};

eventSchema.statics.buildFriendRequest = (owner: string, to: string) => {
  return Event.build({ type: "FRIEND_REQUEST", owner, to });
};

eventSchema.methods.accept = async function () {
  switch (this.get("type")) {
    case "FRIEND_REQUEST":
      const user = (await User.findById(this.get("owner"))) as UserDoc;
      await user.addFriend(this.get("to"));
      return this.remove();
  }
};

eventSchema.methods.reject = function () {
  return this.remove();
};

const Event = mongoose.model<EventDoc, EventModel>("event", eventSchema);

export { Event };
