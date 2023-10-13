const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const eventForm = document.getElementById('eventForm')
const submitEventForm = document.getElementById('submitEventForm')

const requestData = async (id = '') => {
  try {
    const response = await fetch('https://happens-here.onrender.com/event/'+id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const main = async (id) => {
  const data = await requestData(id)
  eventForm.elements['eventTitle'].value = data.body.title
  //eventForm.elements['eventStartsAt'].value = data.body.eventStartsAt.replace(/Z/g, '')
  //eventForm.elements['eventFinishAt'].value = data.body.eventFinishAt.replace(/Z/g, '')
  eventForm.elements['eventDescription'].value = data.body.description
}

submitEventForm.addEventListener('click', async (e) => {
  e.preventDefault()
  const eventData = {
    title: eventForm.elements['eventTitle'].value,
    description: eventForm.elements['eventDescription'].value,
  }
  try {
    const response = await fetch('https://happens-here.onrender.com/event/'+id, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('bearerToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    })
    const data = await response.json()
    if(data.statusCode===200) {
      alert('Evento atualizado com sucesso')
      window.location.href='./toView.html?id='+id
    }
  } catch (error) {
    console.error(error)
  }
})

main(id)
