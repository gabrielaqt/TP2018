

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
                var botaoPedidos = document.getElementById("bottonNavBarMeusPedidos");
                var botaoCarrinho = document.getElementById("bottonNavBarMinhaCompra");
                var linkLogin = document.getElementById("linkLogin");
                var nomeLogado = document.getElementById("welcome");
                nomeLogado.innerHTML = '<h6> Bem vindo ao Race Motors '+dados.data.nomeCliente+'</h6>'
                linkLogin.innerHTML = '<a class="links text-warning" href="#" onClick="deslogado();">Logout</a>'
                botaoNavBar.innerHTML = '<a class="nav-link text-white" onClick="deslogado();" href="#" >Logout </a>'
                botaoConta.innerHTML = '<a class="nav-link text-white" href="dadosCliente.html" >Minha Conta </a>'
                botaoPedidos.innerHTML = '<a class="nav-link text-white" href="historico.html" >M </a>'
                botaoCarrinho.innerHTML = '<a class="nav-link text-white" href="carrinhoCompra.html" onClick = "listaCarrinhoCompra();" >Minha Compra </a>'
                //CLIENTE --> insere opções no Dropdown
                if(dados.data.statusCliente === 'LogadoCliente' ){
                var minhaContaDrop = document.getElementById("MinhaContaDropdown");
                var minhaCompraDrop = document.getElementById("MinhaCompraDropdown");
                
                minhaContaDrop.innerHTML = '<a class="dropdown-item"   href="dadosCliente.html" >Meus Dados</a><a class="dropdown-item" href="historico.html" >Meus Pedidos</a>'
                minhaCompraDrop.innerHTML = '<a class="dropdown-item" href="carrinhoCompra.html " onClick = "listaCarrinhoCompra();">Carrinho Compra</a>'
                }
                //ADMIN -> retira botões cliente e adiciona outros
                else{
                    var botaoComprar = document.getElementById("botaoCompra");                   
                    var botaoConta = document.getElementById("botaoConta");
                    var adicionaProdutos = document.getElementById("botaoAdicionaProd");
                    var excluiProdutos = document.getElementById("botaoExcluiProd");


                    botaoComprar.innerHTML = "";
                    botaoConta.innerHTML = "";
                    adicionaProdutos.innerHTML = ' <a  class="btn btn-warning float-right ml-1 d-none d-sm-block" href="cadastrarProduto.html"><div class="float-left"><img src="img/add.png" width="25px"> Adicionar Produtos</div></a>'
                    excluiProdutos.innerHTML = ' <a  class="btn btn-warning float-right ml-1 d-none d-sm-block" href="gerenciamento.html"><div class="float-left"><img src="img/lixo.png" width="25"> Gerenciar Produtos</div></a>'
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

function pesquisar2() {
    var valorPesquisa = document.pesquisar.inputPesquisar.value;
    console.log(valorPesquisa);
   window.location.href = '/produtos.html?pesquisa='+ valorPesquisa;


}
function pesquisarAdmin() {
    var valorPesquisa = document.pesquisar.inputPesquisar.value;
    console.log(valorPesquisa);

   $.ajax({
    url: '/produto/pesquisarProdutos?pesquisa='+valorPesquisa,
    dataType: 'json',
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
            var idProduto = document.getElementById("produtoExclusao");
            idProduto.innerHTML = "";
            exibeProdutos(dados.data);
        }
        
    }
});

}
