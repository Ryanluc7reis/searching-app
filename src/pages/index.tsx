import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "./types/users";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Table = styled.table`
  border-radius: 10px;
  width: 100%;
  height: 600px;
  text-align: center;
`;
export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [averageAge, setAverageAge] = useState<number>(0);

  const getUsers = async (params?): Promise<void> => {
    const response = await axios.get(`http://localhost:3000/api/users`, {
      params,
    });
    setUsers(response.data.users);
    setAverageAge(response.data.averageAge);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    getUsers({ search: value });
  };

  return (
    <Container>
      <h2>Searching app</h2>
      <input
        type="text"
        placeholder="Search for users"
        style={{ padding: "3px", minWidth: "200px" }}
        onChange={onChange}
      />

      <br />

      <h3>Average Age: {averageAge}</h3>

      {users.length === 0 ? (
        <Table>
          <h4>No user found</h4>
        </Table>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>age</th>
              <th>address</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  {user["address"].country} {user["address"].state}{" "}
                  {user["address"].city} {user["address"].street}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
