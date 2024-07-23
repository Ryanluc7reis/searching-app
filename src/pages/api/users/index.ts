import { getUsers } from "../../data/users"

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const users = await getUsers()

  if (req.query.search) {
    // TODO
  }

  return res.status(400).json({ users, averageAge: 0 })
}
