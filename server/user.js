let users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const exitingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (exitingUser) {
    return { error: "Username has been Taken" };
  }

  const user = { id, name, room };
  //   console.log("new user  ");
  //   console.log(user);is

  users.push(user);
  //   console.log(users);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id == id);
  //   users = users.filter((user) => user.id !== id);
  if (index !== -1) {
    return users.splice(index, 1);
  }
};

const getUser = (id) => {
  console.log(users, id);
  return users.find((user) => user.id === id);
};

const getUSersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUSersInRoom,
};
