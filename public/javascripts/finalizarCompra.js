$(document).ready(function () {
    $.ajax({
        url: '/acesso/lista',
        dataType: 'json',
        error: function (dados) {
            alert('Erro: ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO'){
                alert('Erro: ' + dados.data);
            } 
            else{
               
                    exibeDados(dados.data);
                
            }
                
        }
    });
});

function exibeDados(cliente) {

    var dadosCliente = '<b>Nome:</b> ' + cliente.dadosFinaisPessoais.dadosP[0].nome +
        '<br><b>CPF</b>: ' + cliente.dadosFinaisPessoais.dadosP[0].CPF +
        '<br><b>Email</b>: ' + cliente.dadosFinaisPessoais.dadosP[0].email +
        '<br><b>Senha:</b> ' + cliente.dadosFinaisPessoais.dadosP[0].senha +
        '<br><b>Rua:</b> ' + cliente.dadosFinaisEndereco.dadosE[0].rua +
        '<br><b>Cidade:</b> ' + cliente.dadosFinaisEndereco.dadosE[0].cidade +
        '<br><b>Estado:</b> ' + cliente.dadosFinaisEndereco.dadosE[0].estado +
        '<br><b>CEP: </b>' + cliente.dadosFinaisEndereco.dadosE[0].cep +
        '<br><br> <a class="btn btn-warning"  href="alterarDadosCompra.html?id=' + cliente.dadosFinaisPessoais.dadosP[0].idCliente + '"> Alterar </a>' +
        '<a class="btn btn-warning ml-5" onClick = "atualizarEstoque();">Confirmar Dados</a>';
        document.getElementById('result').innerHTML += dadosCliente;
}

function atualizarEstoque(){
    var arr = new Array();
    var arr1 = new Array();
    var aux;    
    
    arr = localStorage.vetorID.split(",");
    arr1 = localStorage.vetorQTD.split(",");
   
    for(var i = 0; i < arr.length; i++){
       for(var j = 0; j < arr.length; j++){
           if(arr[i] < arr[j]){
               aux = arr[j];
               arr[j] = arr[i];
               arr[i] = aux;
               
               aux = arr1[j];
               arr1[j] = arr1[i];
               arr1[i] = aux;
           }
       }
    }
    var input = {
        id: arr.toString(),
        qtd: arr1.toString()
    };
    console.log(input.id, input.qtd);
    $.ajax({
        url: '/produto/atualizaEstoque',
        type: 'post',
        data: input,
        error: function (dados) {
            alert('Erro: 1' + dados.data);
        },
        success: function (dados) {
            
                alert(dados.data);
                
                //window.location.href = '/index.html';
            
        }
    });
}

function validaDadosAlteracao(){
 
    var retornoErroNome,retornoErroCpf, retornoErroEmail,retornoSenha, retornoErroEndereco,retornoErroCep,retornoErroCidade, retornoErroEstado;
    
    var retornoNome = document.FormularioCadastro.inputName.value;
    var retornoCpf = document.FormularioCadastro.inputCPF.value;
    var retornoEmail = document.FormularioCadastro.inputEmail4.value;
    var retornoSenha =  document.FormularioCadastro.inputPassword4.value;
    var retornoEndereco = document.FormularioCadastro.inputAddress.value;
    var retornoCep = document.FormularioCadastro.inputCEP.value;
    var retornoCidade = document.FormularioCadastro.inputCity.value;
    var retornoEstado = document.FormularioCadastro.inputEstado.value;
    var padraoLetras = /[^a-zA-Z]/gi;


//valida se só existem letras no nome
    var valida_nome = retornoNome.match(padraoLetras);

    if (retornoNome.length <= 2 || retornoNome == "" ) {

        retornoErroNome = document.getElementById("mesgErroNome");
        retornoErroNome.innerHTML = "Nome invalido, mínimo 3 caracteres e apenas letras";
        return 0;
    }
    else{
        retornoErroNome = document.getElementById("mesgErroNome");
        retornoErroNome.innerHTML= "";
    }

    if(retornoCpf == "" || isNaN(retornoCpf) ||  retornoCpf.length !== 11){
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
   if(retornoCep == "" || isNaN(retornoCep) ||  retornoCep.length !== 8){
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
    if(retornoCidade == "" ){
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
        var param = new URLSearchParams(window.location.search);
      
        var urlAcao;
        var id = param.get('id');
    if (param.has('id')) { // alteração
        urlAcao = '/acesso/altera?id=' + id;
    }
    else {
        urlAcao = '/cliente/insere';
    }
    $.ajax({
        url: urlAcao,
        type: 'post',
        data: input,
        error: function (dados) {
            alert('Erro: 1' + dados.data);
        },
        success: function (dados) {
            
                alert(dados.data);
                window.location.href = 'finalizarCompra.html';
            
        }
    });
    
    
    
})();



}
