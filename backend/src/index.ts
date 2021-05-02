import { app } from "./app";
import { connect } from "./db/connectToDB";

import { User /*UserDoc*/ } from "./models/User";

/*
import { Room } from "./models/Room";*/
import { Event } from "./models/Event";

const port = 11111;

//Run app
app.listen(port, async () => {
  //Connect to MongoDB database
  await connect();

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
  /*
  console.log("Users:");

  console.log((await User.findOne({ nick_name: user.nick_name }).exec()) as UserDoc);
  console.log("Events:");

  console.log(await Event.find().exec());*/

  console.log(`App listening at http://localhost:${port}`);
});
