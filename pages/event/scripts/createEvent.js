const apiUrl = 'https://happens-here.onrender.com';

const eventForm = document.getElementById('eventForm')
const submitEventForm = document.getElementById('submitEventForm')
const cityDatalist = document.getElementById('cityDatalist')
const stateSelect = document.getElementById('eventState')

const fillStateSelect = async () => {
  try {
    const response = await fetch(apiUrl+'/state')
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    data.body.forEach((val) => {
      const stateOption = document.createElement('option')
      stateOption.value = val.id
      stateOption.text = val.name
      stateSelect.appendChild(stateOption)
    })
  } catch (error) {
    console.error(error)
  }
}

const fillCitySelect = async (stateId) => {
  try {
    const response = await fetch(apiUrl+'/city/'+stateId)
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    cityDatalist.innerHTML = ''
    data.body.forEach((val) => {
      const cityOption = document.createElement('option')
      cityOption['data-value'] = val.id
      cityOption.value = val.name
      cityDatalist.appendChild(cityOption)
    })
  } catch (error) {
    console.error(error)
  }
}

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

submitEventForm.addEventListener('click', async (event) => {
  event.preventDefault();
  const endpoint = apiUrl + '/event';

  const inputValue = eventForm.elements['eventCity'].value
  const cityDatalist = document.getElementById('cityDatalist')
  const cityDatalistOptions = cityDatalist.querySelectorAll('option')
  const thisInput = [...cityDatalistOptions].find(val => val.value === inputValue)
  // posso usar o erro retornado da api
  if(!thisInput) {
    alert('Estado e/ou cidade inválido')
    return
  }
  console.log(thisInput['data-value'])
  const eventData = {
    title: eventForm.elements['eventTitle'].value,
    remainingTickets: +eventForm.elements['eventTicket'].value,
    price: +eventForm.elements['eventPrice'].value,
    description: eventForm.elements['eventDescription'].value,
    eventStartsAt: new Date(eventForm.elements['eventStartsAt'].value).getTime(),
    eventFinishAt: new Date(eventForm.elements['eventFinishAt'].value).getTime(),
    poster: await toBase64(eventForm.elements['eventFile'].files[0]),
    address: {
      cep: eventForm.elements['eventCep'].value,
      houseNumber: eventForm.elements['eventHouseNumber'].value,
      complement: eventForm.elements['eventComplement'].value,
      cityId: thisInput['data-value']
    }
    
  };
  console.log('API Request:', eventData);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('bearerToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    })
    const data = await response.json()
    if (data.statusCode === 201) {
      alert('Evento criado')
    }
  } catch (error) {
    console.error(error)
  }
});

fillStateSelect()
stateSelect.addEventListener('change', (event) => {
  fillCitySelect(event.target.value)
})