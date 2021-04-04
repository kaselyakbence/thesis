import mongoose from "mongoose";

import { nanoid } from "nanoid";

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
  pubId: string;
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
      type: String,
      require: true,
    },
    payload: {
      type: String,
    },
    to: {
      type: String,
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
    switch (this.get("type")) {
      case "FRIEND_REQUEST":
        await User.findOneAndUpdate(
          { nick_name: this.get("to") },
          {
            $push: { events: this.id },
          }
        );
    }
  }
  done();
});

eventSchema.pre("remove", async function (done) {
  await User.findOneAndUpdate(
    { nick_name: this.get("owner") },
    {
      $pull: { events: this.id },
    }
  );
  await User.findOneAndUpdate(
    { nick_name: this.get("to") },
    {
      $pull: { events: this.id },
    }
  );
  done();
});

eventSchema.statics.build = (attrs: EventAttrs) => {
  return new Event({ pubId: nanoid(), ...attrs });
};

eventSchema.statics.buildFriendRequest = (owner: string, to: string) => {
  return Event.build({ type: "FRIEND_REQUEST", owner, to });
};

eventSchema.methods.accept = async function () {
  switch (this.get("type")) {
    case "FRIEND_REQUEST":
      const user = (await User.findOne({
        nick_name: this.get("owner"),
      })) as UserDoc;
      await user.addFriend(this.get("to"));
      return this.remove();
  }
};

eventSchema.methods.reject = function () {
  return this.remove();
};

const Event = mongoose.model<EventDoc, EventModel>("event", eventSchema);

export { Event };
