const userRoot = document.getElementById('userRoot')

const requestData = async () => {
  const response = await fetch('https://happens-here.onrender.com/user', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('bearerToken')}`,
      'Content-Type': 'application/json',
    }
  })
  const data = await response.json()
  if(data.statusCode === 401) {
    alert('Você deve estar logado para ver seu perfil.')
    window.location.href = './login.html'
  }
  console.log(data)
  return data
}

const main = async () => {
  const user = await requestData()
  let tickets = '' 
  user.body.tickets.forEach((val) => {
    tickets += `
    <li>
      <h3>${val.event.title}</h3>
      <img src="${val.qrCode}">
    </li>
    `
  })
  const content = `
    <header>
      <div>
        <h2>Nome: </h2><p>${user.body.name}</p>
      </div>
      <div>
        <h2>E-mail: </h2><p>${user.body.email}</p>
      </div>
    </header>
    <section class="ticketSection">
      <h1>Meus ingressos</h1>
      ${user.body.tickets.length ? `<ul>${tickets}</ul>` : '<br/><p>Você não possui ingressos disponíveis.</p>'}
    </section>
  `
  userRoot.innerHTML = content
}

main()