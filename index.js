
const button = document.querySelector('#search-button')
const inputValue = document.querySelector('#search-input')
const userCard = document.querySelector('#content')

const request = url => fetch(url, 
  {
    method: 'GET', 
    headers:{Accept: "application/vnd.github.v3+json"
  }
})
const sortRepos = repoList => repoList.sort((a,b) => 
parseInt(b.stargazers_count) - parseInt(a.stargazers_count))
  const getRepos = function(reps) {
    request(reps)
    .then(response => response.json())
    .then(response => {
      const repoInfo = sortRepos(response)
      let repoInfoCharts = ''
      Object.keys(repoInfo)
      .map(repo => {
        repoInfoCharts += `
        <div> 
          <h3>${repoInfo[repo].name}</h3>
          <p>Descrição ${repoInfo[repo].description}</p>
          <p>Estrelas: ${repoInfo[repo].stargazers_count}</p>
          <p>Linguagem: ${repoInfo[repo].language}</p>
          <p>acesse no github <a href='${repoInfo[repo].url}'></a></p>
        </div>
        `
      })
      console.log(repoInfoCharts)
      userCard.insertAdjacentHTML("beforeend", repoInfoCharts)
    })
    .catch(err => err)
  }
const userData = data => {
  
  getRepos(data.repos_url)
  let importantInfos = `<h2>${data.name}</h2>`
  importantInfos += `<img src='${data.avatar_url}'</img>`
  importantInfos += `<p>Seguidores: ${data.followers}</p>`
  importantInfos += `<p>Seguindo: ${data.following}</p>`
  importantInfos += `<p>Bio: ${data.bio}</p>`
  importantInfos += data.email ? `<p>email: ${data.email}`: `<p></p>`
  userCard.insertAdjacentHTML("afterbegin",importantInfos)
}
const getInfo = function() {
  
  const apiLink = 'https://api.github.com/'
  const user = `users/${inputValue.value}`
  request(`${apiLink}${user}`)
  .then(response => response.status === 404? document.location = 'notfound.html' : response.json())
  .then(response => {
    console.log(response)
    userData(response)
  })
  .catch(err => console.log( err))
  }
const info = button.addEventListener('click', getInfo)
const topCard = document.querySelector('.top-search')

