function validaDados() {

    var retornoMsgErroEmail;
    var retornoMsgErroSenha;


    if (document.formLogin.login.value == "") {

        retornoMsgErroEmail = document.getElementById("mesgErroEmail");
        retornoMsgErroEmail.innerHTML = "Email invalido";
        return 0;
    }

    if (document.formLogin.senha.value == "") {


        retornoMsgErroSenha = document.getElementById("mesgErroSenha");
        retornoMsgErroSenha.innerHTML = "Senha invalido";
        return 0;
    }


    (function () {
        var form = document.formLogin;
        var input = {
            login: form.login.value,
            senha: form.senha.value
        };
        $.ajax({
            url: '/acesso/login',
            type: 'post',
            data: input,
            error: function (dados) {
                alert('Erro: ' + dados.data);
            },
            success: function (dados) {
                if (dados.status === 'ERRO') {
                    alert('Erro: ' + dados.data);
                }
                else {
                    alert(dados.data);
                    window.location.href = '/index.html';
                }
            }
        });
    }
    )();





}






function logoutUsuario() {
    $.ajax({
        url: '/acesso/logout',
        type: 'post',
        error: function (dados) {
            alert('Erro: ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO')
                alert('Erro: ' + dados.data);
            else {
                alert(dados.data);
                window.location.href = '/login.html';
            }
        }
    });
}
