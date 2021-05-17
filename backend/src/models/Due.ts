import mongoose from "mongoose";

import { User } from "./User";

import { nanoid } from "nanoid";

//Interface for Due
interface DueAttrs {
  name: string;
  desc?: string;
  items: { name: string; value: number }[];
  owner: string;
  receiver: string;
  active?: boolean;
}

//Interface for DueModel
interface DueModel extends mongoose.Model<any> {
  build(attrs: DueAttrs): DueDoc;
  activate(): Promise<void>;
  pubId: string;
  name: string;
  desc?: string;
  items: { name: string; value: number }[];
  created: Date;
  owner: string;
  receiver: string;
  active: boolean;
}

//Interface for the properties of Due Document
export interface DueDoc extends mongoose.Document {
  activate(): Promise<void>;
  pubId: string;
  name: string;
  desc?: string;
  created: Date;
  owner: string;
  receiver: string;
  active: boolean;
  balance?: number;
}

//Creating the Due schema
const dueSchema = new mongoose.Schema(
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
    desc: {
      type: String,
    },
    items: [
      {
        name: {
          type: String,
          require: true,
        },
        value: {
          type: Number,
          require: true,
        },
      },
    ],
    created_at: {
      type: Date,
      require: true,
    },
    owner: {
      type: String,
      require: true,
    },
    receiver: {
      type: String,
      require: true,
    },
    active: { type: Boolean, require: true, default: false },
  },
  {
    //Creating JSON from a Due instance excludes sensible data
    toJSON: {
      transform: function (_, ret) {
        delete ret._id;

        delete ret.password;
        delete ret.__v;
      },
      virtuals: true,
    },
    //Creating an Object from a Due instance excludes sensible data
    toObject: {
      transform: function (_, ret) {
        delete ret._id;

        delete ret.password;
        delete ret.__v;
      },
      virtuals: true,
    },
  }
);

dueSchema.virtual("balance").get(function (this: DueModel) {
  return this.items.reduce((acc, curr) => acc + curr.value, 0);
});

dueSchema.statics.build = (attrs: DueAttrs) => {
  return new Due({ pubId: nanoid(), created_at: new Date(), ...attrs });
};

dueSchema.methods.activate = async function () {
  this.set("active", true);
  await User.findOneAndUpdate(
    { nick_name: this.get("owner") },
    {
      $push: {
        dues: {
          pubId: this.get("pubId"),
          name: this.get("name"),
          from: this.get("receiver"),
          balance: this.get("balance"),
        },
      },
    }
  ).exec();

  await User.findOneAndUpdate(
    { nick_name: this.get("receiver") },
    {
      $push: {
        dues: {
          pubId: this.get("pubId"),
          name: this.get("name"),
          from: this.get("owner"),
          balance: 0 - this.get("balance"),
        },
      },
    }
  ).exec();
};

const Due = mongoose.model<DueDoc, DueModel>("due", dueSchema);

export { Due };
