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

function exibeProdutosCompra(produtos) {

    var arr = new Array();
    var arr1 = new Array();
    var aux;    
    
    arr = localStorage.vetorID.split(",");
    arr1 = localStorage.vetorQTD.split(",");
   
    for(var i = 0; i < arr.length; i++){
       for(var j = 0; j < arr.length; j++){
           if(arr[i] < arr[j]){
               aux = arr[j];
               arr[j] = arr[i];
               arr[i] = aux;
               
               aux = arr1[j];
               arr1[j] = arr1[i];
               arr1[i] = aux;
           }
       }
    }
    var header_tabela = document.createElement('tr');
    header_tabela.innerHTML = '<thead><tr><th>PRODUTO</th><th>NOME</th><th>ESCALA</th><th>QUANTIDADE</th><th>PREÇO</th></tr></thead>'
    tabela.appendChild(header_tabela);
    var valorTotal = 0;
    for (var i = 0; i < produtos.length; i++) {
        var linha = document.createElement('tr');     
        linha.innerHTML = '<tr><td><img class="red " src="img/'+produtos[i].imagens_linkImagem+'"></td><td>'+produtos[i].nomeProduto+'</td><td>'+produtos[i].escala+'</td><td>'+arr1[i]+'</td><td>R$ '+(produtos[i].preco*arr1[i])+',00</td></tr>'        
        tabela.appendChild(linha); 
        valorTotal = valorTotal + produtos[i].preco*arr1[i];          
    }
    var footer_tabela = document.createElement('tr');
    footer_tabela.innerHTML = '<tfoot><tr><th colspan="4">Total a pagar</th>R$ '+valorTotal+',00<th></th></tr></tfoot>'
    tabela.appendChild(footer_tabela); 
}
