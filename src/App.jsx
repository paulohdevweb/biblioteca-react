import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [livros, setLivros] = useState([]);

  async function loadData() {
    const resposta = await fetch("http://localhost:3000/livros");
    const dados = await resposta.json();
    setLivros(dados);
  }

  async function excluirLivro(id) {
    await fetch(`http://localhost:3000/livros/${id}`, {
      method: "DELETE",
    });

    loadData();
  }

  async function editarLivro(id) {
    const titulo = window.prompt("Digite um novo titulo:");
    await fetch(`http://localhost:3000/livros/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo }),
    });
    loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1>Livros</h1>

      <table>
        <tbody>
          {livros.map((livro) => (
            <tr key={livro.id}>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.paginas}</td>
              <td>{livro.categoria}</td>
              <td>
                <button onClick={() => editarLivro(livro.id)}>Editar</button>
              </td>
              <td>
                <button onClick={() => excluirLivro(livro.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
