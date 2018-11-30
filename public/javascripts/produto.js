$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var paginas = urlParams.get('paginas');
if( !urlParams.has('paginas') ){
    paginas = 1;
}
    if (urlParams.has('categoria') && urlParams.has('marca')) {
        $.ajax({
            url: '/produto/especifico?categoria=' + urlParams.get('categoria') + '&marca=' + urlParams.get('marca') + '&paginas=' + paginas,
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
    else if (urlParams.has('pesquisa')) {
        console.log("entrou na pesquisa");
        $.ajax({
            url: '/produto/pesquisarProdutos?pesquisa=' + urlParams.get('pesquisa'),
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

function listaProdutos(produtos) {

    for (var i = 0; i < produtos.length; i++) {
        if (produtos[i].quantidade != 0) {
            var quantidade = '<select name="quantidades">'
            for (var j = 0; j < produtos[i].quantidade; j++) {
                quantidade = quantidade + '<option value="' + (j + 1) + '">' + (j + 1) + '</option>'
            }
            quantidade = quantidade + '</select>';
            var novoProduto = document.createElement('div');
            novoProduto.classList.add("col-md-4");
            novoProduto.classList.add("col-12");
            novoProduto.innerHTML = '<div class="card bg-white border-secondary mb-5" ><div class="card-body fundoCard"><img class="card-img-top" src= img/' + produtos[i].imagens_linkImagem + ' alt="Imagem de capa do card"><h5 class="card-title text-dark"></h5><p class="card-text text-dark">Nome: ' + produtos[i].nomeProduto + ' <br> Marca: ' + produtos[i].marca + ' <br> Preço: R$ ' + produtos[i].preco + ' <br> Escala: ' + produtos[i].escala + ' <br> <form id="form' + i + '"> ' + quantidade + '</form></p><a onClick = "armazenaID (' + produtos[i].id_produto + ', ' + i + ')" class="btn btn-dark text-light">Comprar</a></div></div>'
            produtoHome.appendChild(novoProduto);
        }
    }
}


function armazenaID(id, indice) {
    if (window.localStorage) {
        var aux = document.getElementById("form" + indice);
        if (localStorage.vetorID === undefined && localStorage.vetorQTD === undefined) {
            localStorage.vetorID = id.toString();
            localStorage.vetorQTD = aux.quantidades.value.toString();
        }
        else {
            localStorage.vetorID = localStorage.vetorID + ',';
            localStorage.vetorID = localStorage.vetorID + id;
            localStorage.vetorQTD = localStorage.vetorQTD + ',';
            localStorage.vetorQTD = localStorage.vetorQTD + aux.quantidades.value.toString();
        }
    }

    else {
        alert("Seu browser não suporta web storage...");
    }
}

$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var cat = urlParams.get('categoria');
    var mar = urlParams.get('marca');
    if (urlParams.has('categoria') && urlParams.has('marca')) {
        $.ajax({
            url: '/produto/contador?categoria=' + urlParams.get('categoria') + '&marca=' + urlParams.get('marca'),
            error: function (dados) {
                alert('Erro: 11' + dados.data);
            },
            success: function (dados) {
                if (dados.status === 'ERRO') {
                    alert('Erro: 33' + dados.data);
                }
                else {
                    console.log(dados.data[0].qtd);
                   var numPag = Math.ceil(parseInt(dados.data[0].qtd) / 6);
                   console.log(numPag);
                   var retornoPag = document.getElementById("paginas");
                   var conteudo = '<ul class="pagination justify-content-center">'
                   for(var i =0; i<numPag;i++){
                    conteudo = conteudo +  '<li class="page-item"><a class="page-link" href="?categoria=' + urlParams.get('categoria') + '&marca=' + urlParams.get('marca') + '&paginas='+ (i+1) +'">'+ (i+1) +'</a></li>'
                   }
                   conteudo = conteudo + ' </ul>'
                   retornoPag.innerHTML = conteudo;
                }

            }
        });
    }
});