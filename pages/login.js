const apiUrl = "https://happens-here.onrender.com";

const formPassword = document.querySelector(
  'input[name="password"]'
);
const formEmail = document.querySelector(
  'input[name="email"]'
);
const iniciarSessaoButton = document.querySelector(
  '#iniciarSessaoButton'
);

iniciarSessaoButton.addEventListener("click", function (event) {
  event.preventDefault();
  const endpoint = apiUrl + '/auth/login';
  const userData = {
    email: formEmail.value,
    password: formPassword.value,
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
      } else if (response.status === 401) {
        alert('Email ou senha incorreto');
      } else {
        alert('Erro: ' + response.statusText);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});