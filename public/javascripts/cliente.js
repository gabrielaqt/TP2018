
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
        endereço: form.inputAddress.value,
        CEP: form.inputCEP.value,
        cidade: form.inputCity.value,
        estado: form.inputEstado.value,
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
        }
    }
});
}


