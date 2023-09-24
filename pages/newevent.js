const apiUrl = "https://happens-here.onrender.com";

const eventName = document.querySelector('#nome');
const eventDate = document.querySelector('#data');
const eventHour = document.querySelector('#horario');
const eventBanner = document.querySelector('#banner');
const eventPrice = document.querySelector('#preco');
const eventAddress = document.querySelector('#local');
const eventDetails = document.querySelector('#detalhes');

const criarEventoButton = document.querySelector(
  'input[type="submit"]'
);

iniciarSessaoButton.addEventListener("click", function (event) {
  event.preventDefault();
  const endpoint = apiUrl + '/event';
  const userData = {
    // inserir aqui JSON de acordo com API
  };
  console.log('API Request:', userData);
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => {
      if (response.status === 201) {
        window.location.href = './dashboard.html';
      } else {
        alert('Erro: ' + response.statusText);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});