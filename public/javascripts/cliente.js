
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
        nome: form.inputName.value,
        CPF: form.inputCPF.value,
        email: form.inputEmail4.value,
        senha: form.inputPassword4.value,
        privilegio: 0   
    };
    var input1 = {
        endereço: form.inputAddress.value,

        CEP: form.inputCEP.value,
        cidade: form.inputCity.value,
        estado: form.inputEstado.value,
        endereco2: form.inputAddress2.value
    };
   /*var inputFinal = {
        input: {
            nome: form.inputName.value,
            CPF: form.inputCPF.value,
            email: form.inputEmail4.value,
            senha: form.inputPassword4.value,
            privilegio: 0   
    },
        input1: {
        endereço: form.inputAddress.value,

        CEP: form.inputCEP.value,
        cidade: form.inputCity.value,
        estado: form.inputEstado.value,
        endereco2: form.inputAddress2.value
    }
*/


        
    };
    $.ajax({
        url: '/cliente/insere',
        type: 'post',
        data: inputFinal,
        error: function (dados) {
            alert('Erro:57 ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO') {
                alert('Erro: 654' + dados.data);
            }
            else {
                alert(dados.data);
            }
        }
    });
}


