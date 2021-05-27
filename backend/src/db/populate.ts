import faker from "faker";

import { User, UserDoc } from "../models/User";

import { Due } from "../models/Due";

import { Event } from "../models/Event";

const registerRandomUser = async () => {
  const user = User.build({
    nick_name: faker.internet.userName(),
    email: faker.internet.exampleEmail(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    password: "password",
  });

  try {
    await user.save();
    return user;
  } catch (e) {
    //console.log(e);
  }
};

const registerFriends = (val: number, originalUser: UserDoc) => {
  const users = [...Array(val)].map(() => registerRandomUser());

  Promise.all(users).then((res) => {
    res.forEach((user, i) =>
      res.forEach((user2, k) => (k > i ? user?.addFriend(user2?.id) : null))
    );
    res.forEach((user, i) =>
      i % 3 === 0 ? Event.buildFriendRequest(user?.id, originalUser.id).save() : null
    );
  });
};

export const populate = async () => {
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

  const due = Due.build({
    name: "Test due",
    owner: user.nick_name,
    receiver: user2.nick_name,
    desc: "Test description",
    items: [{ name: "Name", value: 1000 }],
  });

  await due.save();

  await due.activate();

  const user3 = User.build({
    email: "test3@test.com",
    nick_name: "user3",
    password: "password",
  });
  await user3.save();

  const due2 = Due.build({
    name: "Test due",
    owner: user.nick_name,
    receiver: user3.nick_name,
    desc: "Test description",
    items: [{ name: "Name", value: 2000 }],
  });

  await due2.save();

  await due2.activate();

  registerFriends(40, user);

  user.addFriend(user2.id);

  // const event = Event.buildFriendRequest(user2.id, user.id);
  // await event.save();

  // console.log("Dues:", await Due.find().exec());

  // console.log("User:", (await User.findById(user2.id).exec()) as UserDoc);
};
