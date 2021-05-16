import mongoose from "mongoose";

import { User } from "./User";

import { nanoid } from "nanoid";

//Interface for Due
interface DueAttrs {
  name: string;
  desc?: string;
  owner: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
}

//Interface for DueModel
interface DueModel extends mongoose.Model<any> {
  build(attrs: DueAttrs): DueDoc;
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
      ref: "user",
      type: mongoose.Types.ObjectId,
      require: true,
    },
    receiver: {
      ref: "user",
      type: mongoose.Types.ObjectId,
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

dueSchema.pre("save", async function (done) {
  if (this.isNew) {
    await User.findByIdAndUpdate(this.get("owner"), {
      $push: {
        dues: this.get("id"),
      },
    }).exec();

    await User.findByIdAndUpdate(this.get("receiver"), {
      $push: {
        dues: this.get("id"),
      },
    }).exec();
  }
  done();
});

dueSchema.virtual("balance").get(function (this: DueModel) {
  return this.items.reduce((acc, curr) => acc + curr.value, 0);
});

dueSchema.statics.build = (attrs: DueAttrs) => {
  return new Due({ pubId: nanoid(), created_at: new Date(), ...attrs });
};

const Due = mongoose.model<DueDoc, DueModel>("due", dueSchema);

export { Due };
