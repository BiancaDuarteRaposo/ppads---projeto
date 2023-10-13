const specificEventRoot = document.getElementById('specificEventRoot')
const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const requestData = async (id) => {
  try {
    const response = await fetch('https://happens-here.onrender.com/event/'+id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    // Se der esse erro é pq a api ta offline 
    if (data.statusCode === 404) {
      throw new Error('Esse evento não existe no banco de dados.')
    }
    return data
  } catch (error) {
    console.error(error)
  }
}

const main = async (id) => {
  const val = await requestData(id)
  console.log(val.body.body)
  const content = `
  <header class="eventHeader">
    <h1>${val.body.title}</h1>
    <span>autor do evento: ${val.body.author.name}</span>
    <img src=${val.body.poster} />
    <button class="buyTicket" onclick="createQRCode()">ADQUIRIR INGRESSO</button>
  </header>
  <section class="eventDescription">
    <h2>Descrição do evento</h2>
    <p>${val.body.description}</p>
  </section>
  <section class="eventInformations">

    <div class="eventData">
      <div>
        <h3>Início do evento: </h3><p>${new Date(val.body.eventStartsAt).toLocaleDateString('pt-BR', {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
      </div>
      <div>
        <h3>Fim do evento: </h3><p>${new Date(val.body.eventFinishAt).toLocaleDateString('pt-BR', {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
      </div>
    </div>

    <div class="eventTicket">
      <div>
        <h3>Ingressos restantes: </h3><p> ${val.body.remainingTickets}</p>
      </div>
      <div>
        <h3>Preço: </h3><p>${val.body.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
      </div>
    </div>

    <div class="eventAddress">
      <div>
        <h3>Rua:</h3><p>${val.body.address.cep}</p>
      </div>
      <div>
        <h3>Numero:</h3><p>${val.body.address.houseNumber}</p>
      </div>
      ${val.body.address.complement ? `<div>
        <h3>Complemento:</h3><p>${val.body.address.complement}</p>
      </div>` : ''}
      <div>
        <h3>Cidade:</h3><p>${val.body.address.city.name}</p>
      </div>
      <div>
        <h3>Estado:</h3><p>${val.body.address.city.state.name}</p>
      </div>
      <div>
        <h3>UF:</h3><p>${val.body.address.city.state.uf}</p>
      </div>
    </div>

  </section>
  `
  specificEventRoot.innerHTML = content
}

const createQRCode = async () => {
  
  const response = await fetch('https://happens-here.onrender.com/ticket/generate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('bearerToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({eventId: id})
  })
  const data = await response.json()
  if(data.statusCode===201){
    alert('Seu QRCode de acesso ao evento foi criado, confira o seu perfil para visualiza-lo.')
  }
  if(data.statusCode===400){
    alert('body inválido')
  }
  if(data.statusCode===401){
    alert('Você precisa estar logado para adquirir um ingresso.')
  }
  if(data.statusCode===404){
    alert('Evento não encontrado')
  }
}


main(id)