const usuario = {
  nome: string,
  senha: string,
};

let nomeFormulario;
let emailFormulario;
let botaoFormulario;

nomeFormulario = document.querySelector(
  "body > div > div > div > form > input:nth-child(1)"
);
senhaFormulario = document.querySelector(
  "body > div > div > div > form > input.text.senha"
);

botaoFormulario = document.querySelector(
  "body > div > div > div > form > input[type=submit]:nth-child(4)"
);

let usuarioFormulario = {
  nome: nomeFormulario.value,
  email: emailFormulario.value,
};

botaoFormulario.addEventListener("click", function (event) {
  event.preventDefault();
  let usuarioFormulario = {
    nome: nomeFormulario.value,
    email: emailFormulario.value,
  };
  console.log(usuarioFormulario);
});
