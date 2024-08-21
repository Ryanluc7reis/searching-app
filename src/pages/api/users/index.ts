import { getUsers } from "../../../../utils/data/users";

export default async function handler(req, res) {
  const users = await getUsers();

  let search = req.query.search;
  let filteredUsers = users;

  if (search) {
    filteredUsers = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase())
    );
  }

  const totalAge = filteredUsers.reduce((sum, user) => sum + user.age, 0);
  const averageAge =
    filteredUsers.length > 0 ? Math.round(totalAge / filteredUsers.length) : 0;

  if (filteredUsers) {
    return res.status(200).json({ users: filteredUsers, averageAge });
  }

  return res.status(400).json({ users: [], averageAge: 0 });
}
