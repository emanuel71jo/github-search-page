import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

class TableRepositories extends React.Component {
  render() {
    return (
      <table>
        <caption>Lista de Repositórios</caption>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Fork</th>
            <th>Data de Criação</th>
            <th>Última Atualização</th>
            <th>Issues Abertas</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {this.props.repositories.map((repository, index) => (
            <tr key={index}>
              <td>{repository.name}</td>
              <td>{repository.description || "------"}</td>
              <td>{!!repository.fork ? "Sim" : "Não"}</td>
              <td>
                {format(new Date(repository.created_at), "dd-MM-yyyy", {
                  locale: ptBR,
                })}
              </td>
              <td>
                {format(new Date(repository.updated_at), "dd-MM-yyyy", {
                  locale: ptBR,
                })}
              </td>
              <td>{Number(repository.open_issues)}</td>
              <td>
                <a href={repository.html_url}>Ir</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default TableRepositories;
