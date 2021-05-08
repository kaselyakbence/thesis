import { User, UserDoc } from "../models/User";

import { Event } from "../models/Event";

export const migrate = async () => {
  //TESTING
  const user = User.build({
    email: "test@test.com",
    nick_name: "user",
    password: "password",
  });
  await user.save();

  const user2 = User.build({
    email: "test2@test.com",
    nick_name: "user2",
    password: "password",
  });
  await user2.save();

  const event = Event.buildFriendRequest(user2.id, user.id);
  await event.save();

  console.log("Users:");

  console.log((await User.findOne({ nick_name: user.nick_name }).exec()) as UserDoc);
  console.log("Events:");

  console.log(await Event.find().exec());
};
