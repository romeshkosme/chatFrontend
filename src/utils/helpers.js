export function getSender(userId, users) {
  return users[0]._id === userId ? users[1].username : users[0].username;
}
