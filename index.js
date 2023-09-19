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
const formButton = document.querySelector(
  'input[type="submit"]'
);

formButton.addEventListener("click", function (event) {
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
    .then(response => response.json())
    .then(responseData => {
      console.log('API Response:', responseData);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
