//criando os objetos dos elementos de texto do form

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


/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener('focusout', validarNome);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validarNome(e){ 
    //declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^[A-Z][a-z]+$/;
    
    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   

    if(e.target.value.trim().match(regexNome)==null || e.target.value.length < 6){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Formato de nome inválido"; 
        nomeHelp.style.color="red";
    }
    else{
        nomeHelp.textContent = "";
    }       
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>

ano.addEventListener('focusout', () => {
    //declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^[0-9]{4}$/;
    //tirar (trim) espaços em branco antes e depois da string
    const anoTrimado = ano.value.trim();
    console.log(ano.value);

    if(anoTrimado.match(regexAno)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color="red";
    }
    else{
        //objeto Date
        var date = new Date();
        //obtem o ano atual
        console.log(date.getFullYear()); 
        
        if( parseInt(anoTrimado) > parseInt(date.getFullYear())){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${date.getFullYear()}.`;
            anoHelp.style.color="red";
        }
        else if( parseInt(anoTrimado) < parseInt(date.getFullYear())- 120 ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${date.getFullYear()-120}.`;
            anoHelp.style.color="red";
        }
        else{
            anoHelp.textContent="";
        }        
        
    }
}
);

email.addEventListener('focusout', () =>{

    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)$/;
    const emailTrimado = email.value.trim();
    console.log(email.value);

    if(emailTrimado.match(regexEmail)==null){
        emailHelp.textContent = `Formato de email inválido.`;
        emailHelp.style.color="red"
    }
    else{
        emailHelp.textContent="";
    }
}
);

senha.addEventListener('focusout', () =>{

    const senhaTrimado = senha.value.trim();
    var strength;
    console.log(senha.value);

    if(!senhaValida(senhaTrimado)){
        senhaHelp.textContent = `Senha invalida`;
        senhaHelp.style.color="red";
        meter.value = 0;
    }else{
        senhaHelp.textContent="";
        strength = calcularForcaSenha(senhaTrimado);
        meter.value = strength;
        console.log(strength);
        if (strength < 11) {
            resultadoSenha.textContent = "Fraca";
        } else if (strength < 21) {
            resultadoSenha.textContent = "Moderada";
        } else {
            resultadoSenha.textContent = "Forte";
        }
    }
}
);

function senhaValida(senha){
    const regexSenha =/^[A-Za-z\d@#%&!+]{6,20}$/;
    const regexSenha2 = /^(?=.*[@#%&!+]).*$/;
    const regexSenha3 = /^(?=.*\d).*$/;
    const regexSenha4 = /^(?=.*[a-zA-Z]).*$/;
    nomeCompleto = nome.value.trim();
    const primerNome = nomeCompleto.split(' ')[0].toLowerCase();
    
    if(senha.match(regexSenha)==null){
        return false;
    }else{
        if(senha.match(regexSenha2)==null){
            return false;
        }else{
            if(senha.match(regexSenha3)==null){
                return false;
            }else{
                if(senha.match(regexSenha4)==null){
                    return false;
                }else{
                    if(senha.toLowerCase().includes(primerNome) || senha.includes(ano.value.trim())){
                        return false;
                    }else{
                        return true;
                    }
                }
            }
        }
    }
}

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