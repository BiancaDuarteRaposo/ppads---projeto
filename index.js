const apiUrl = "https://happens-here.onrender.com";

const formName = document.querySelector(
  'input[name="name"]'
);
const formPassword = document.querySelector(
  'input[name="password"]'
);
const formEmail = document.querySelector(
  'input[name="email"]'
);
const criarContaButton = document.querySelector(
  '#criarContaButton'
);

criarContaButton.addEventListener("click", function (event) {
  event.preventDefault();
  const userData = {
    name: formName.value,
    email: formEmail.value,
    password: formPassword.value,
  };
  const endpoint = apiUrl + '/user';
  console.log(userData);
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => {
      if (response.status === 201) {
        window.location.href = './pages/dashboard.html';
      } else if (response.status === 400) {
        alert('Conta já existe');
      } else {
        alert('Erro: ' + response.statusText);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
