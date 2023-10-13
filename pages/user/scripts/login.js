const apiUrl = 'https://happens-here.onrender.com';

const userEmail = document.getElementById('userEmail')
const userPass = document.getElementById('userPass')
const loginButton = document.getElementById('loginButton')

loginButton.addEventListener('click', function (event) {
  event.preventDefault();
  const endpoint = apiUrl + '/auth/login';
  const userData = {
    email: userEmail.value,
    password: userPass.value,
  };
  console.log('API Request:', userData);
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(async response => {
      const data = await response.json()
      if (data.statusCode === 200) {
        alert('Login realizado.')
        console.log(data)
        localStorage.setItem('bearerToken',data.body.token)
        window.location.href = '../../../index.html';
      } else {
        let writeInAlert = ''
        data.message.forEach((val) => {
          writeInAlert += val+'\n'
        })
        /* for (let c = 0; c < data.message.length; c++) {
          writeInAlert+=data.message[c]+'\n'
        } */
        alert(writeInAlert)
      }
    })
    .catch(err => {
      console.error(err);
    });
});