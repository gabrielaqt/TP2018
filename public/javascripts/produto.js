$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var cat = urlParams.get('categoria');
    var mar = urlParams.get('marca');
    if (urlParams.has('categoria') && urlParams.has('marca'))  {
        $.ajax({
            url: '/produto/especifico?categoria=' + urlParams.get('categoria') + '&marca=' + urlParams.get('marca'),
            error: function (dados) {
                alert('Erro: 11' + dados.data);
            },
            success: function (dados) {
                if (dados.status === 'ERRO') {
                    alert('Erro: 33' + dados.data);
                }
                else {
                    listaProdutos(dados.data);
                }

            }
        });
    }
});
function listaProdutos(produtos){
    for (var i = 0; i < produtos.length; i++){
        var novoProduto = document.createElement('div');
        novoProduto.classList.add("col-md-4");
        novoProduto.classList.add("col-12");
        novoProduto.innerHTML = '<div class="card bg-white border-secondary mb-5" ><div class="card-body fundoCard"><img class="card-img-top" src= img/'+produtos[i].imagens_linkImagem+' alt="Imagem de capa do card"><h5 class="card-title text-dark"></h5><p class="card-text text-dark">Nome: '+produtos[i].nomeProduto+' <br> Marca: '+produtos[i].marca+' <br> Preço: R$ '+produtos[i].preco+' <br> Escala: '+produtos[i].escala+' </p><a href="#" class="btn btn-dark text-light">Visitar</a></div></div>'   
        produtosLista.appendChild(novoProduto);
    }
}
