import { app } from "./app";
import { connect } from "./db/connectToDB";

import { User } from "./models/User";
import { Room } from "./models/Room";
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

  const friendRequest = Event.buildFriendRequest(user.id, user2.id);

  const requestToRoom = Event.buildParticipationRequest(
    room.id,
    user.id,
    user2.id
  );

  await requestToRoom.save();
  await friendRequest.save();

  await requestToRoom.accept();
  //await friendRequest.accept();

  console.log(await user2.visit());

  console.log(`App listening at http://localhost:${port}`);
});
