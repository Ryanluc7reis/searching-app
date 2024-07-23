import { useState, useEffect } from 'react'
import axios from 'axios'
import { User } from './types/users'

export default function Home() {

  const [users, setUsers] = useState<User[]>([])
  const [averageAge, setAverageAge] = useState<number>(0)

  const getUsers = async (params?): Promise<void> => {
    const response = await axios.post('http://localhost:3000/api/users', { params })
    setUsers(response.data.users)
    setAverageAge(response.data.averageAge)
  }

  useEffect(() => {
    getUsers()
  }, [])


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    getUsers({ search: value })
  }

  return (
    <div>
      <input type="text" placeholder='Search for users' style={{ padding: '3px', minWidth: '200px'}} onChange={onChange} />

      <br />

      <h3>Average Age: {averageAge}</h3>

      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>age</th>
            <th>address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user['address'].country} {user['address'].state} {user['address'].city} {user['adress'].street}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
