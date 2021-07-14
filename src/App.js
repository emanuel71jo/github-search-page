import React from "react";
import avatar from "./assets/avatar.png";
import { api } from "./services/api";
import "./App.css";
import TableRepositories from "./components/TableRepositories";
class App extends React.Component {
  state = {
    data: {},
    loading: false,
    username: "",
    dataChanged: false,
    repositories: [],
  };

  handleTextChange(event) {
    this.setState({
      ...this.state,
      username: event.target.value,
    });
  }

  handleSearch() {
    this.setState({
      ...this.state,
      loading: true,
    });

    api.get(`/${this.state.username}`).then((response) =>
      this.setState({
        ...this.state,
        username: "",
        dataChanged: true,
        data: response.data,
      })
    );

    api.get(`/${this.state.username}/repos`).then((response) =>
      this.setState({
        ...this.state,
        username: "",
        loading: false,
        repositories: response.data,
      })
    );
  }

  cleanSearch() {
    this.setState({
      data: {},
      loading: false,
      username: "",
      dataChanged: false,
      repositories: [],
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="drawer">
          <img
            src={!this.state.dataChanged ? avatar : this.state.data.avatar_url}
            alt={!this.state.dataChanged ? "Avatar" : this.state.data.name}
          />
          {!this.state.dataChanged ? (
            <>
              <input
                type="text"
                placeholder="Digite um nome de usuário"
                onChange={this.handleTextChange.bind(this)}
              />
              <button
                disabled={this.state.username === ""}
                onClick={this.handleSearch.bind(this)}
              >
                Pesquisar
              </button>
            </>
          ) : (
            <>
              <div>
                <strong>Login: </strong>
                <p>{this.state.data.login}</p>
              </div>
              <div>
                <strong>Nome: </strong>
                <p>{this.state.data.name}</p>
              </div>
              <div>
                <strong>Bio: </strong>
                <p>{this.state.data.bio}</p>
              </div>
              <div>
                <strong>Repositórios públicos: </strong>
                <p>{this.state.data.public_repos}</p>
              </div>
              <div>
                <strong>Seguidores: </strong>
                <p>{this.state.data.followers}</p>
              </div>
              <div>
                <strong>Seguindo: </strong>
                <p>{this.state.data.following}</p>
              </div>
              <button onClick={this.cleanSearch.bind(this)}>
                Limpar dados
              </button>
            </>
          )}
        </div>
        <div className="content">
          {!this.state.dataChanged && !this.state.loading ? (
            <span>Nenhum dado a ser exibido</span>
          ) : this.state.loading ? (
            <p>Carregando...</p>
          ) : (
            <TableRepositories repositories={this.state.repositories} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
