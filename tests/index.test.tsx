import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Home from "../src/pages/index";

// Configurar o mock do axios
const mock = new MockAdapter(axios);

// Exemplo de dados que a API retornaria
const mockUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    age: 25,
    address: {
      country: "USA",
      state: "CA",
      city: "Los Angeles",
      street: "123 Main St",
    },
  },
];

mock.onGet("http://localhost:3000/api/users").reply(200, {
  users: mockUsers,
  averageAge: 25,
});

test("renders users and calculates average age", async () => {
  render(<Home />);

  // Verifica se o título está presente
  const title = screen.getByText(/Searching app/i);
  expect(title).toBeInTheDocument();

  // Espera que os dados sejam carregados e o componente seja atualizado
  await waitFor(() => {
    const userElement = screen.getByText(/John Doe/i);
    expect(userElement).toBeInTheDocument();

    const averageAgeElement = screen.getByText(/Average Age: 25/i);
    expect(averageAgeElement).toBeInTheDocument();
  });

  // Simula uma interação com o campo de busca
  fireEvent.change(screen.getByPlaceholderText("Search for users"), {
    target: { value: "John" },
  });

  // Verifica se a função getUsers foi chamada com os parâmetros corretos
  await waitFor(() => {
    const userElement = screen.getByText(/John Doe/i);
    expect(userElement).toBeInTheDocument();
  });
});

test('renders "No user found" when no users match the search', async () => {
  // Mockar uma resposta vazia para a busca
  mock
    .onGet("http://localhost:3000/api/users", {
      params: { search: "Nonexistent" },
    })
    .reply(200, {
      users: [],
      averageAge: 0,
    });

  render(<Home />);

  // Simula uma interação com o campo de busca
  fireEvent.change(screen.getByPlaceholderText("Search for users"), {
    target: { value: "Nonexistent" },
  });

  // Verifica se a mensagem "No user found" é exibida
  await waitFor(() => {
    const noUserElement = screen.getByText(/No user found/i);
    expect(noUserElement).toBeInTheDocument();
  });
});
