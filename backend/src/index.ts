import { app } from "./app";
import { connect } from "./db/connectToDB";

import { User } from "./models/User";
import { Event } from "./models/Event";

const port = 11111;

//Run app
app.listen(port, async () => {
  //Connect to MongoDB database
  await connect();

  const user = await User.build({
    email: "test@test.com",
    nick_name: "test",
    password: "abcd",
  });

  const user2 = await User.build({
    email: "test2@test.com",
    nick_name: "test2",
    password: "abcd",
  });

  await user.save();
  await user2.save();

  const friend_req = await Event.buildFriendRequest(
    user.nick_name,
    user2.nick_name
  );
  await friend_req.save();

  //await friend_req.accept();
  console.log(await user2.getFriendRequests());

  console.log(`App listening at http://localhost:${port}`);
});
