const eventRoot = document.getElementById('eventRoot')

const requestData = async () => {
  try {
    const response = await fetch('https://happens-here.onrender.com/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('bearerToken')}`,
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    if(data.statusCode === 401) {
      alert('Você deve estar logado para ver seus eventos.')
      window.location.href = '../user/login.html'
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return data
  } catch (error) {
    console.error(error)
  }
}

const main = async () => {
  const user = await requestData()
  let events = ''
  user.body.events.forEach(val => {
    events += `
    <li>
      <h1>${val.title}</h1>
      <img src="${val.poster}"></img>
      <a href="./editEvent.html?id=${val.id}"><button>Editar evento</button></a>
    </li>
    <li>
      <h1>${val.title}</h1>
      <img src="${val.poster}"></img>
      <a href="./editEvent.html?id=${val.id}"><button>Editar evento</button></a>
    </li>
    <li>
      <h1>${val.title}</h1>
      <img src="${val.poster}"></img>
      <a href="./editEvent.html?id=${val.id}"><button>Editar evento</button></a>
    </li>
    `
  })
  const content = `
  <header>
    <h1>Meus eventos</h1>
    <a href="./createEvent.html"><button>Criar novo evento</button></a>
  </header>
  <section>
    ${user.body.events.length? `<ul>${events}</ul>` : '<h2>Você não possui eventos ativos.</h2>'}
  </section>
  `

  eventRoot.innerHTML = content
}

main()