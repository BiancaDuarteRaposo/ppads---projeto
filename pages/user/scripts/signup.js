const apiUrl = 'https://happens-here.onrender.com';

const userName = document.getElementById('userName')
const userEmail = document.getElementById('userEmail')
const userPass = document.getElementById('userPass')
const userRepeatPass = document.getElementById('userRepeatPass')
const criarContaButton = document.getElementById('criarContaButton')

criarContaButton.addEventListener('click', function (event) {
  event.preventDefault();
  if(userPass.value !== userRepeatPass.value){
    alert('Senhas não coincidem')
    return
  }
  const userData = {
    name: userName.value,
    email: userEmail.value,
    password: userPass.value,
  };
  const endpoint = apiUrl + '/user';
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(async response => {
      const data = await response.json()
      if (data.statusCode === 201) {
        alert(data.body.name+', seu cadastro foi realizado, agora é só fazer login!')
        window.location.href = './login.html';
      } else {
        let writeInAlert = ''
        if(data.message.length === 19) {
          alert(`${data.message}`)
          return
        }
        for (let c = 0; c < data.message.length; c++) {
          writeInAlert+=data.message[c]+'\n'
        }
        alert(writeInAlert)
      }
    })
    .catch(err => {
      console.error(err);
    });
});
