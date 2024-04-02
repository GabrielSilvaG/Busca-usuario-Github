const USUARIO = {
    login: String,
    name: String,
    bio: String,
    avatar_url: String,
    public_repos: Number,
    followers: Number,
    following: Number,
    repos: Array,
};
const CONSULTA = document.querySelector(".consulta");

async function obterUsuario() {
    obterRepos();
    const url = `https://api.github.com/users/${CONSULTA.value}`;
    const DADOS = await fetch(url);
    const DADOS_USUARIO = await DADOS.json();

    if (DADOS_USUARIO.message === "Not Found") {
        alert("Usuário não encontrado");
        return;
    }

    USUARIO.login = DADOS_USUARIO.login;
    USUARIO.name = DADOS_USUARIO.name;
    USUARIO.bio = DADOS_USUARIO.bio;
    USUARIO.avatar_url = `https://github.com/${DADOS_USUARIO.login}.png`;
    USUARIO.public_repos = DADOS_USUARIO.public_repos;
    USUARIO.followers = DADOS_USUARIO.followers;
    USUARIO.following = DADOS_USUARIO.following;

}

async function obterRepos() {
    const URL = `https://api.github.com/users/${CONSULTA.value}/repos`;
    const DADOS = await fetch(URL);
    const REPOS = await DADOS.json();
    USUARIO.repos = REPOS;
    getAllData();
}

function getAllData() {
    const INFO_USUARIO = document.getElementById("inf-usuario");

    INFO_USUARIO.setAttribute("style", "display: block");
    INFO_USUARIO.innerHTML = `
    <div class="inf-usuario">
       <div class="avatar-usuario">
            <h2 class="nome-do-usuario">${USUARIO.name == null ? USUARIO.name = "Sem nome de usuário" : USUARIO.name
        }</h2 >
            <h3 class="login-usuario">${USUARIO.login}</h3>
            <img class="avatar_img" src="${USUARIO.avatar_url}" alt="${USUARIO.login}">
            <p class="bio">${USUARIO.bio == null ? (USUARIO.bio = "Sem biografia") : USUARIO.bio
        }</p>
      </div>
      <div class="status-do-usuario">
       <h2>Informaçao</h2>
          <p>Repositórios: ${USUARIO.public_repos}</p>
          <p>Seguidores: ${USUARIO.followers}</p>
          <p>Seguindo: ${USUARIO.following}</p>
      </div>
    </div>
    ${USUARIO.repos.map((repo) => `
    <div class="repo">
     <h3 class="nome-repo">${repo.name}</h3>
      <p class="descricao-repo">${repo.description == null
                ? (repo.description = "Sem descrição")
                : repo.description
            }</p>
     <p class="linguagem-repo">${repo.language == null ? repo.language = "Sem linguagem encontrada" : repo.language}</p>
      <div class="status-repo">
       <span>
      ⭐${repo.stargazers_count}
       </span>
       <span>
      💬${repo.watchers_count}
       </span>
       <span>
      📦${repo.forks_count}
       </span>
       <span>
      📅${new Date(repo.updated_at).toLocaleDateString('pt-br')}
       </span>
      </div>
     <a href="${repo.html_url}" target="_blank">
     <span>
     🔗${repo.html_url}
     </span>
     </a>
    </div>`
        )
            .join("")}
  `;
}



