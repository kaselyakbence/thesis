import { app } from "./app";
import { connect } from "./db/connectToDB";

import { User } from "./models/User";
import { Room } from "./models/Room";

const port = 11111;

//Run app
app.listen(port, async () => {
  //Connect to MongoDB database
  await connect();
  /*
  //TESTING
  const user = User.build({
    email: "test@test.com",
    nick_name: "user",
    password: "password",
  });
  await user.save();

  const user2 = User.build({
    email: "test1@test.com",
    nick_name: "user1",
    password: "password",
  });
  await user2.save();

  const room = Room.build({
    owner: user.id,
    name: "Test Room",
    description: "Test description",
  });
  await room.save();

  await room.addUser(user2.id);

  console.log(await user.getRequests());*/

  console.log(`App listening at http://localhost:${port}`);
});
