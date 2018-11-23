$(document).ready(function () {
    $.ajax({
        url: '/produto/pesquisa',
        dataType: 'json',
        error: function (dados) {
            alert('Erro: ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO'){
                alert('Erro: ' + dados.data);
            }
            else{
                exibeProdutos(dados.data);
            }
        }
    });
});

function exibeProdutos(produtos) {
    console.log(produtos);
    for (var i = 0; i < produtos.length; i++) {
        var produto = produtos[i];
        /*var dadosProduto = 'ID: ' + produto.id_produto +
            '<br>Nome: ' + produto.nomeProduto +
            '<br>Marca: ' + produto.marca +
            '<br>Escala: ' + produto.escala +
            '<br>Quantidade: ' + produto.quantidade +
            '<br>Preco' + produto.preco +
            '<br><a href="#" onClick = "deletaProduto(' + produto.id_produto + ');"> EXCLUIR<\a>';*/
            
            var novoProduto = document.createElement('div');
            
            novoProduto.classList.add("col-md-3");
            novoProduto.classList.add("col-12");
            novoProduto.innerHTML = '<div class="card bg-white border-secondary" ><div class="card-body fundoCard"><img class="card-img-top"><h5 class="card-title text-dark"></h5><p class="card-text text-dark">Nome: '+produto.nomeProduto+' <br> Marca: '+produto.marca+' <br> Preço: R$ '+produto.preco+' <br> Escala: '+produto.escala+' </p><a href="#" class="btn btn-danger" onClick = "deletaProduto(' + produto.id_produto + ');">Excluir<\a></div></div>'   
            produtoExlusao.appendChild(novoProduto);
       
    }
}

function deletaProduto(id) {
    $.ajax({
        url: '/produto/deleta?id=' + id,
        type: 'post',
        dataType: 'json',
        error: function (dados) {
            alert('Erro: 22 ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO'){
                alert('Erro: 11' + dados.data);
            }    
            else{
                location.reload();
                alert(dados.data);
            }                
        }
    });
}