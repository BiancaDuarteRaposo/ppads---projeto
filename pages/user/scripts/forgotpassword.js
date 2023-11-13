const apiUrl = "https://happens-here.onrender.com";

const formPassword = document.querySelector(
  'input[name="password"]'
);
const formEmail = document.querySelector(
  'input[name="email"]'
);
const salvarSenhaButton = document.querySelector(
  '#salvarSenhaButton'
);
/*Esse endpoint ainda não existe na API, então não tem como resetar a senha. */
salvarSenhaButton.addEventListener("click", function (event) {
  event.preventDefault();
  const endpoint = apiUrl + '/user/resetpassword';
  const userData = {
    email: formEmail.value,
    password: formPassword.value,
  };
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => {
      if (response.status === 201) {
        window.location.href = './login.html';
      } else if (response.status === 401) {
        alert('Qualquer erro condizente');
      } else {
        // Display a friendly error message for other HTTP statuses
        alert('Erro: ' + response.statusText);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});