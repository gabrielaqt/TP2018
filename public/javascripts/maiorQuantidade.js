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
    for (var i = 0; i < 3; i++){
        var quantidade =  '<select name="quantidades">'
        for(var k =0 ;k<produtos[i].quantidade;k++){
            quantidade = quantidade + '<option value="' + (k + 1) + '">' + (k + 1) + '</option>'
        }

        quantidade = quantidade + '</select>';
        var novoProduto = document.createElement('div');
        novoProduto.classList.add("col-md-4");
        novoProduto.classList.add("col-12");

        novoProduto.innerHTML = '<div class="tamanhoCard card bg-white border-secondary" ><div class="card-body fundoCard"><img class="card-img-top" src= img/' + produtos[i].imagens_linkImagem + ' alt="Imagem de capa do card"><h5 class="card-title text-dark"></h5><p class="card-text text-dark">Nome: ' + produtos[i].nomeProduto + ' <br> Marca: ' + produtos[i].marca + ' <br> Preço: R$ ' + produtos[i].preco + ' <br> Escala: ' + produtos[i].escala + ' <br> <form id="form' + i + '"> ' + quantidade + '</form></p><a onClick = "armazenaID (' + produtos[i].id_produto + ', ' + i + ')" class="btn btn-dark text-light">Comprar</a></div></div>'
        produtosHome.appendChild(novoProduto);
    }

}