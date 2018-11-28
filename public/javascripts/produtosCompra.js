$(document).ready(function(){
    var id = localStorage.vetorID;
    console.log("console na pagina certa",id);
    $.ajax({
        url: '/produto/listaCompra?ids=' +id ,
        dataType: 'json',
        error: function (dados) {
            alert('Erro: 333 ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO')
                alert('Erro 111: ' + dados.data);
            else{
                exibeProdutosCompra(dados.data);
            }
        }
    });
});

function exibeProdutosCompra(produtos){
    for (var i = 0; i < produtos.length; i++){
        var novoProduto = document.createElement('div');
        novoProduto.classList.add("col-md-4");
        novoProduto.classList.add("col-12");
        novoProduto.innerHTML = '<div class="card bg-white border-secondary" ><div class="card-body fundoCard"><img class="card-img-top" src= img/'+produtos[i].imagens_linkImagem+' alt="Imagem de capa do card"><h5 class="card-title text-dark"></h5><p class="card-text text-dark">Nome: '+produtos[i].nomeProduto+' <br> Marca: '+produtos[i].marca+' <br><b> Preço: R$ '+produtos[i].preco+'</b> </p><a class="btn btn-dark text-light">Excluir</a></div></div>'   
        produtosCompra.appendChild(novoProduto);
    }



}
