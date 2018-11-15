
function funcaoLimpa() {

    var resultBotaoLimpar;
    var opcao = confirm("Deseja Limpar a tela?");
    if (opcao === true) {
        document.FormularioCadastro.reset();
    }
    else {
        //Nao Faz nada
    }
}


function validaDadosCadastro(){
    var retornoErroNome,retornoErroCpf, retornoErroEmail,retornoSenha, retornoErroEndereco,retornoErroCep,retornoErroCidade, retornoErroEstado;
    
    var retornoNome = document.FormularioCadastro.inputName.value;
    var retornoCpf = document.FormularioCadastro.inputCPF.value;
    var retornoEmail = document.FormularioCadastro.inputEmail4.value;
    var retornoSenha =  document.FormularioCadastro.inputPassword4.value;
    var retornoEndereco = document.FormularioCadastro.inputAddress.value;
    var retornoCep = document.FormularioCadastro.inputCEP.value;
    var retornoCidade = document.FormularioCadastro.inputCity.value;
    var retornoEstado = document.FormularioCadastro.inputEstado.value;
    var retornoCpf = document.FormularioCadastro.inputCPF.value;
    var padraoLetras = /[^a-zA-Z]/gi;


//valida se só existem letras no nome
    var valida_nome = retornoNome.match(padraoLetras);

    if (retornoNome.length <= 2 || retornoNome == "" || valida_nome) {

        retornoErroNome = document.getElementById("mesgErroNome");
        retornoErroNome.innerHTML = "Nome invalido, mínimo 3 caracteres e apenas letras";
        return 0;
    }
    else{
        retornoErroNome = document.getElementById("mesgErroNome");
        retornoErroNome.innerHTML= "";
    }
    if(retornoCpf.length <11 || isNaN( retornoCpf)){
        retornoErroCpf = document.getElementById("mesgErroCpf");
        retornoErroCpf.innerHTML = "Campo só aceita números e 11 caracteres";
        return 0;
    }
    else{
        retornoErroCpf = document.getElementById("mesgErroCpf");
        retornoErroCpf.innerHTML = "";
    }
    if(retornoEmail == ""){
        retornoErroEmail = document.getElementById("mesgErroEmail");
        retornoErroEmail.innerHTML = "Email invalido";
        return 0;
      
    }
    else{
        retornoErroEmail = document.getElementById("mesgErroEmail");
        retornoErroEmail.innerHTML = "";
    }
    if(retornoSenha == ""){
        retornoErroSenha = document.getElementById("mesgErroSenha");
        retornoErroSenha.innerHTML = "Campo senha vazio";
        return 0;
    }
    else{
        retornoErroSenha = document.getElementById("mesgErroSenha");
        retornoErroSenha.innerHTML = "";     
    }
       //verificar endereco numero??
    if(retornoEndereco == ""){
        retornoErroEndereco = document.getElementById("mesgErroEndereco");
        retornoErroEndereco.innerHTML = "Campo endereco vazio";
        return 0;
    }
    else{
        retornoErroEndereco = document.getElementById("mesgErroEndereco");
        retornoErroEndereco.innerHTML = "";
    }
   if(retornoCep == "" || isNaN(retornoCep) ||  retornoCep.length < 8){
        retornoErroCep = document.getElementById("mesgErroCep");
        retornoErroCep.innerHTML = "Campo só aceita números e 8 caracteres";
        return 0;
    }
    else{
        retornoErroCep = document.getElementById("mesgErroCep");
        retornoErroCep.innerHTML = "";
    }


//verifica se existe só letras em Cidade
   var valida_nome = retornoCidade.match(padraoLetras);
    if(retornoCidade == "" || valida_nome){
        retornoErroCidade = document.getElementById("mesgErroCidade");
        retornoErroCidade.innerHTML = "Campo Cidade invalido";
        return 0;

    }
    else{
        retornoErroCidade = document.getElementById("mesgErroCidade");
        retornoErroCidade.innerHTML = "";

    }
    if(retornoEstado == "Escolher..."){
       
            retornoErroEstado = document.getElementById("mesgErroEstado");
            retornoErroEstado.innerHTML = "Selecione um Estado";
            return 0;
    }
    else{
        retornoErroEstado = document.getElementById("mesgErroEstado");
            retornoErroEstado.innerHTML = "";
    }






    (function () {
        var form = document.FormularioCadastro;
        var input = {
            //| |   |   |   | UTIL PARA TABELA CLIENTE  |   |   |   |
            nome: form.inputName.value,
            CPF: form.inputCPF.value,
            email: form.inputEmail4.value,
            senha: form.inputPassword4.value,
            privilegio: 0,
            //| |   |   |   | UTIL PARA TABELA ENDEREÇO  |   |   |   |
            rua: form.inputAddress.value,
            cidade: form.inputCity.value,
            estado: form.inputEstado.value,
            cep: form.inputCEP.value
          
            
        };  
        
    $.ajax({
        url: '/cliente/insere',
        type: 'post',
        data: input,
        error: function (dados) {
            alert('Erro: 1' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO') {
                alert('Erro: 2' + dados.data);
            }
            else {
                alert(dados.data);
                window.location.href = '/index.html';
            }
        }
    });
    
    
    
    })();



}
function salvaCliente() {
    var form = document.FormularioCadastro;
    var input = {
        //| |   |   |   | UTIL PARA TABELA CLIENTE  |   |   |   |
        nome: form.inputName.value,
        CPF: form.inputCPF.value,
        email: form.inputEmail4.value,
        senha: form.inputPassword4.value,
        privilegio: 0,
        //| |   |   |   | UTIL PARA TABELA ENDEREÇO  |   |   |   |
        rua: form.inputAddress.value,
        cidade: form.inputCity.value,
        estado: form.inputEstado.value,
        cep: form.inputCEP.value
      
        
    };  
    
$.ajax({
    url: '/cliente/insere',
    type: 'post',
    data: input,
    error: function (dados) {
        alert('Erro: 1' + dados.data);
    },
    success: function (dados) {
        if (dados.status === 'ERRO') {
            alert('Erro: 2' + dados.data);
        }
        else {
            alert(dados.data);
            window.location.href = '/index.html';
        }
    }
});
}


