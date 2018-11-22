$(document).ready(function(){
    $.ajax({
        url: '/produto/lista',
        dataType: 'json',
        error: function (dados) {
            alert('Erro: 333 ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO')
                alert('Erro 111: ' + dados.data);
            else{
                exibeProdutos(dados.data);
            }
        }
    });
});

function exibeProdutos(produtos){
    
    var j = 2;
    for (var i = 0; i < 3; i++){
        var novoProduto = document.createElement('div');
        novoProduto.classList.add("col-md-4");
        novoProduto.classList.add("col-12");
        novoProduto.innerHTML = '<div class="card bg-white border-secondary" ><div class="card-body fundoCard"><img class="card-img-top" src= img/'+produtos.dadosImagem.imagem[i].imagens_linkImagem+' alt="Imagem de capa do card"><h5 class="card-title text-dark"></h5><p class="card-text text-dark">Nome: '+produtos.dadosProdutos.produtos[j].nomeProduto+' <br> Marca: '+produtos.dadosProdutos.produtos[j].marca+' <br> Preço: R$ '+produtos.dadosProdutos.produtos[j].preco+' <br> Escala: '+produtos.dadosProdutos.produtos[j].escala+' </p><a href="#" class="btn btn-dark text-light">Visitar</a></div></div>'   
        produtosHome.appendChild(novoProduto);
        j--;
    }

}

$(document).ready(function () {
    $.ajax({
        url: '/acesso/logado',
        dataType: 'json',
        error: function (dados) {
            alert('Erro: ' + dados.data);
        },
        success: function (dados) {
            if (dados.data.statusCliente === 'LogadoCliente' || dados.data.statusAdmin === 'LogadoAdmin') {
                var botaoNavBar = document.getElementById("bottonNavBar");
                var botaoConta = document.getElementById("bottonNavBarMinhaConta");
                var botaoCarrinho = document.getElementById("bottonNavBarMinhaCompra");
                var linkLogin = document.getElementById("linkLogin");
                var nomeLogado = document.getElementById("welcome");
                nomeLogado.innerHTML = '<h6> Bem vindo ao Race Motors '+dados.data.nomeCliente+'</h6>'
                linkLogin.innerHTML = '<a class="links" href="#" onClick="deslogado();">Logout</a>'
                botaoNavBar.innerHTML = '<a class="nav-link text-white" onClick="deslogado();" href="#" >Logout </a>'
                botaoConta.innerHTML = '<a class="nav-link text-white" href="dadosCliente.html" >Minha Conta </a>'
                botaoCarrinho.innerHTML = '<a class="nav-link text-white" href="#" >Minha Compra </a>'
                //CLIENTE --> insere opções no Dropdown
                if(dados.data.statusCliente === 'LogadoCliente' ){
                var minhaContaDrop = document.getElementById("MinhaContaDropdown");
                var minhaCompraDrop = document.getElementById("MinhaCompraDropdown");
                
                minhaContaDrop.innerHTML = '<a class="dropdown-item" href="dadosCliente.html">Meus Dados</a>'
                minhaCompraDrop.innerHTML = '<a class="dropdown-item" href="#">Historico compras</a>'
                }
                //ADMIN -> retira botões cliente e adiciona outros
                else{
                    var botaoComprar = document.getElementById("botaoCompra");                   
                    var botaoConta = document.getElementById("botaoConta");
                    var adicionaProdutos = document.getElementById("botaoAdicionaProd");


                    botaoComprar.innerHTML = "";
                    botaoConta.innerHTML = "";
                    adicionaProdutos.innerHTML = ' <a  class="btn btn-warning float-right ml-1 d-none d-sm-block" href="cadastrarProduto.html"><div class="float-left"><img src="img/add.png" width="25px"> Adicionar Produtos</div></a>'

                }

                

            }
            else {
                var botaoNavBar = document.getElementById("bottonNavBar");
                var linkLogin = document.getElementById("linkLogin");
                var nomeLogado = document.getElementById("welcome");
                nomeLogado.innerHTML = '<h6> Bem vindo ao Race Motors </h6>'
                linkLogin.innerHTML = '<a class="links" href="login.html">Login </a><a class="links" href="cadastrar.html"> Cadastrar</a>'
                botaoNavBar.innerHTML = '<a class="nav-link text-white" href="login.html" >Login</a><a class="nav-link text-white" href="cadastrar.html" >Cadastrar</a>'
            }
        }
    });
});

function deslogado(){
    $.ajax({
        url: '/acesso/logout',
        type: 'post',
        error: function (dados)
        {
            alert('Erro: 12 ' + dados.data);
        },
        success: function (dados){
            if(dados.status === 'ERRO')
            {
                alert('Impossível fazer logout');
            }
            else{
                window.location.href = '/login.html';
            }
            
        }
    });
}

