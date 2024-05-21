// Criando os objetos dos elementos de texto do form
var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var resultadoSenha = document.querySelector("#inputResult");
var meter = document.querySelector("#passStrengthMeter");
var form = document.querySelector("#singleForm");
var inputResult = document.querySelector("#inputResult");

// Declarando os eventos listeners para os campos de texto do form
nome.addEventListener('focusout', validarNome);
ano.addEventListener('focusout', validarAno);
email.addEventListener('focusout', validarEmail);
senha.addEventListener('focusout', validarSenha);

// Função para validar o nome
function validarNome(e) { 
    const regexNome = /^[A-Z][a-z]+$/;
    if (e.target.value.trim().match(regexNome) == null || e.target.value.length < 6) {
        nomeHelp.textContent = "Nome inválido";
        nomeHelp.style.color = "red";
        return false;
    } else {
        nomeHelp.textContent = "";
        return true;
    }       
}

// Função para validar o ano
function validarAno() {
    const regexAno = /^[0-9]{4}$/;
    const anoTrimado = ano.value.trim();
    if (anoTrimado.match(regexAno) == null) {
        anoHelp.textContent = "Ano inválido";
        anoHelp.style.color = "red";
        return false;
    } else {
        var date = new Date();
        if (parseInt(anoTrimado) > date.getFullYear() || parseInt(anoTrimado) < date.getFullYear() - 120) {
            anoHelp.textContent = `Ano inválido`;
            anoHelp.style.color = "red";
            return false;
        } else {
            anoHelp.textContent = "";
            return true;
        }
    }
}

// Função para validar o email
function validarEmail() {
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)$/;
    const emailTrimado = email.value.trim();
    if (emailTrimado.match(regexEmail) == null) {
        emailHelp.textContent = `Formato de email inválido`;
        emailHelp.style.color = "red";
        return false;
    } else {
        emailHelp.textContent = "";
        return true;
    }
}

// Função para validar a senha
function validarSenha() {
    const senhaTrimado = senha.value.trim();
    if (!senhaValida(senhaTrimado)) {
        senhaHelp.textContent = `Senha inválida`;
        senhaHelp.style.color = "red";
        meter.value = 0;
        resultadoSenha.textContent = "";
        return false;
    } else {
        var strength = calcularForcaSenha(senhaTrimado);
        meter.value = strength;
        if (strength < 11) {
            senhaHelp.textContent = "Fraca";
        } else if (strength < 21) {
            senhaHelp.textContent = "Moderada";
        } else {
            senhaHelp.textContent = "Forte";
        }
        return true;
    }
}

// Função para verificar a validade da senha
function senhaValida(senha) {
    const regexSenha = /^[A-Za-z\d@#%&!+]{6,20}$/;
    const regexSenha2 = /^(?=.*[@#%&!+]).*$/;
    const regexSenha3 = /^(?=.*\d).*$/;
    const regexSenha4 = /^(?=.*[a-zA-Z]).*$/;
    nomeCompleto = nome.value.trim();
    const primerNome = nomeCompleto.split(' ')[0].toLowerCase();

    if (senha.match(regexSenha) == null ||
        senha.match(regexSenha2) == null ||
        senha.match(regexSenha3) == null ||
        senha.match(regexSenha4) == null ||
        senha.toLowerCase().includes(primerNome) ||
        senha.includes(ano.value.trim())) {
        return false;
    } else {
        return true;
    }
}

// Função para calcular a força da senha
function calcularForcaSenha(senha) {
    let strength = 0;
    if (senha.match(/^(?=.*[@#%&!+]).*$/)) 
        strength += 5;
    if (senha.match(/^(?=.*\d).*$/)) 
        strength += 5;
    if (senha.length > 8 && senha.match(/^(?=.*[A-Z]).*$/)) 
        strength += 5;
    if (senha.length > 12 && senha.match(/^(?=.*[@$!%*?&].*[@$!%*?&]).*$/) && senha.match(/^(?=.*\d.*\d).*$/) && senha.match(/^(?=.*[A-Z].*[A-Z]).*$/)) 
        strength += 15;
    return strength;
}

// Função para verificar todos os campos e exibir a mensagem apropriada
function verificarCampos(e) {
    e.preventDefault();
    const nomeValido = validarNome({ target: nome });
    const anoValido = validarAno();
    const emailValido = validarEmail();
    const senhaValida = validarSenha();

    let mensagem = "";
    if (nomeValido && anoValido && emailValido && senhaValida) {
        mensagem = "Seus dados foram registrados.";
        inputResult.style.color = "green";
    } else {
        mensagem = "Seus dados não foram registrados.";
        inputResult.style.color = "red";
    }
    
    // Adiciona a mensagem de registro ao final do resultado da senha
    inputResult.textContent = mensagem;
}

// Adicionando o evento listener ao formulário para verificar os campos no submit
form.addEventListener('submit', verificarCampos);
